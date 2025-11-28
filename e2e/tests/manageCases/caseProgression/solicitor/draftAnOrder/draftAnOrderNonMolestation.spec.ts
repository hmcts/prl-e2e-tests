import { test } from "../../../../fixtures.ts";
import Config from "../../../../../utils/config.utils.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../common/types.js";
import { DraftAnOrder5Params } from "../../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder5.po.js";
import { OrderInformation } from "../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { DraftAnOrder4Params } from "../../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder4.po.js";
import { DraftAnOrder16Params } from "../../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder16.po.js";
import { NonMolestationDraftOrderScenarios as scenarios } from "../../../../../testData/draftOrders.js";
import { DraftAnOrderJourney } from "../../../../../journeys/manageCases/caseProgression/solicitor/draftAnOrderJourney.js";

export interface NonMolestationDraftOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  isDraftAnOrder: boolean;
  draftAnOrder4Params: DraftAnOrder4Params;
  draftAnOrder5Params: DraftAnOrder5Params;
  draftAnOrder16Params: DraftAnOrder16Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Draft a non molestation order tests", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACase(browser);
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
      draftAnOrder5Params,
      draftAnOrder16Params,
      snapshotName,
      snapshotsPath,
      orderInformation,
    }: NonMolestationDraftOrderParams) => {
      test(`Complete drafting Non-Molestation order as solicitor with the following options: ${name} @accessibility @regression @nightly @visual`, async ({
        browser,
        summaryPage,
        draftAnOrder1Page,
        draftAnOrder2Page,
        draftAnOrder4Page,
        draftAnOrder5Page,
        draftAnOrder16Page,
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
            draftAnOrder5Page,
            draftAnOrder16Page,
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
            draftAnOrder5Params,
            draftAnOrder16Params,
            snapshotName,
            snapshotsPath,
            orderInformation,
          },
        );
      });
    },
  );
});
