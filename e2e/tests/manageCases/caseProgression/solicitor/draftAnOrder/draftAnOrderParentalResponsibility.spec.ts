import Config from "../../../../../utils/config.utils";
import { test } from "../../../../fixtures";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../common/types.js";
import { OrderInformation } from "../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { DraftAnOrder4Params } from "../../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder4.po.js";
import { ParentalResponsibilityOrderScenarios as scenarios } from "../../../../../testData/draftOrders";
import { DraftAnOrderJourney } from "../../../../../journeys/manageCases/caseProgression/solicitor/draftAnOrderJourney.js";

export interface ParentalResponsibilityDraftOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  isDraftAnOrder: boolean;
  draftAnOrder4Params: DraftAnOrder4Params;
  responsibleParentFullName: string;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Draft a parental responsibility order tests", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        page,
        Config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  scenarios.forEach(
    (draftOrderParams: ParentalResponsibilityDraftOrderParams) => {
      test(`Complete drafting Parental Responsibility order as solicitor with the following options: ${draftOrderParams.name} @accessibility @regression @nightly @visual`, async ({
        page,
        browser,
      }): Promise<void> => {
        const draftAnOrderJourney: DraftAnOrderJourney =
          new DraftAnOrderJourney();
        await draftAnOrderJourney.draftAnOrder(
          page,
          browser,
          caseNumber,
          draftOrderParams,
        );
      });
    },
  );
});
