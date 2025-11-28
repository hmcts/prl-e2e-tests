import Config from "../../../../../utils/config.utils.ts";
import { test } from "../../../../fixtures.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../common/types.js";
import { OrderInformation } from "../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { DraftAnOrder4Params } from "../../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder4.po.js";
import { ParentalResponsibilityOrderScenarios as scenarios } from "../../../../../testData/draftOrders.ts";
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
    ({
      name,
      caseType,
      orderType,
      isDraftAnOrder,
      draftAnOrder4Params,
      responsibleParentFullName,
      snapshotName,
      snapshotsPath,
      orderInformation,
    }: ParentalResponsibilityDraftOrderParams) => {
      test(`Complete drafting Parental Responsibility order as solicitor with the following options: ${name} @accessibility @regression @nightly @visual`, async ({
        browser,
        summaryPage,
        draftAnOrder1Page,
        draftAnOrder2Page,
        draftAnOrder4Page,
        draftAnOrder8Page,
        draftAnOrder20Page,
        draftAnOrderSubmitPage,
        axeUtils,
        navigationUtils,
      }): Promise<void> => {
        const draftAnOrderJourney: DraftAnOrderJourney =
          new DraftAnOrderJourney();
        await draftAnOrderJourney.draftAnOrder(
          browser,
          caseNumber,
          {
            summaryPage,
            draftAnOrder1Page,
            draftAnOrder2Page,
            draftAnOrder4Page,
            draftAnOrder8Page,
            draftAnOrder20Page,
            draftAnOrderSubmitPage,
            axeUtils,
            navigationUtils,
          },
          {
            name,
            caseType,
            orderType,
            isDraftAnOrder,
            draftAnOrder4Params,
            responsibleParentFullName,
            snapshotName,
            snapshotsPath,
            orderInformation,
          },
        );
      });
    },
  );
});
