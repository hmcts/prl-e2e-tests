import { test } from "../../../../../../fixtures.ts";
import Config from "../../../../../../../utils/config.utils.ts";
import { NonMolestationDraftOrderScenarios } from "../../../../../../../testData/draftOrders.js";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../../common/types.js";
import { DraftAnOrder6Params } from "../../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder6.po.js";
import { OrderInformation } from "../../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { DraftAnOrder17Params } from "../../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder17.po.js";

import config from "../../../../../../../utils/config.utils.js";
import { DraftAnOrder5Params } from "../../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder5.po.js";

export interface NonMolestationDraftOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  isDraftAnOrder: boolean;
  draftAnOrder5Params: DraftAnOrder5Params;
  draftAnOrder6Params: DraftAnOrder6Params;
  draftAnOrder17Params: DraftAnOrder17Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("Draft a non molestation order tests", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ solicitor, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "tasks",
      );
    },
  );

  NonMolestationDraftOrderScenarios.forEach((draftOrderParams) => {
    test(`Complete drafting Non-Molestation order as solicitor with the following options: ${draftOrderParams.name} @accessibility @regression @nightly @visual`, async ({
      solicitor,
      caseWorker,
      navigationUtils,
    }): Promise<void> => {
      const { draftOrders, summaryPage } = solicitor;

      await summaryPage.chooseEventFromDropdown("Create/upload draft order");

      await draftOrders.draftAnOrder1Page.assertPageContents();
      await draftOrders.draftAnOrder1Page.verifyAccessibility();
      await draftOrders.draftAnOrder1Page.selectWhatYouWantToDo(
        draftOrderParams.isDraftAnOrder,
      );
      await draftOrders.draftAnOrder1Page.clickContinue();

      await draftOrders.draftAnOrder2Page.assertPageContents();
      await draftOrders.draftAnOrder2Page.verifyAccessibility();
      await draftOrders.draftAnOrder2Page.selectOrderType(
        draftOrderParams.orderType,
      );
      await draftOrders.draftAnOrder2Page.clickContinue();

      await draftOrders.draftAnOrder5Page.assertPageContents(
        draftOrderParams.caseType,
        draftOrderParams.orderType,
      );
      await draftOrders.draftAnOrder5Page.verifyAccessibility();
      await draftOrders.draftAnOrder5Page.fillInFields(
        draftOrderParams.caseType,
        draftOrderParams.draftAnOrder5Params,
      );
      await draftOrders.draftAnOrder5Page.clickContinue();

      await draftOrders.draftAnOrder6Page.assertPageContents(
        draftOrderParams.orderType,
      );
      await draftOrders.draftAnOrder6Page.verifyAccessibility();
      await draftOrders.draftAnOrder6Page.fillInFields(
        draftOrderParams.draftAnOrder6Params,
      );
      await draftOrders.draftAnOrder6Page.clickContinue();

      await draftOrders.draftAnOrder17Page.assertPageContents(
        draftOrderParams.orderType,
      );
      await draftOrders.draftAnOrder17Page.verifyAccessibility();
      await draftOrders.draftAnOrder17Page.fillInFields(
        draftOrderParams.draftAnOrder17Params,
      );
      await draftOrders.draftAnOrder17Page.clickContinue();

      await draftOrders.draftAnOrder20Page.assertPageContents(
        draftOrderParams.orderType,
        caseNumber,
        draftOrderParams.snapshotName,
        draftOrderParams.snapshotsPath,
      );
      await draftOrders.draftAnOrder20Page.verifyAccessibility();
      await draftOrders.draftAnOrder20Page.clickContinue();

      await draftOrders.draftAnOrderSubmitPage.assertPageContents(
        draftOrderParams.snapshotsPath,
        draftOrderParams.snapshotName,
      );
      await draftOrders.draftAnOrderSubmitPage.verifyAccessibility();
      await draftOrders.draftAnOrderSubmitPage.clickSubmit();
      await summaryPage.alertBanner.assertEventAlert(
        caseNumber,
        "Create/upload draft order",
      );

      // check the draft orders tab as court admin
      await navigationUtils.goToCase(
        caseWorker.page,
        Config.manageCasesBaseURLCase,
        caseNumber,
      );

      const { removeDraftOrders } = caseWorker;
      await removeDraftOrders.draftOrdersPage.goToPage();
      await removeDraftOrders.draftOrdersPage.assertDraftOrders(
        draftOrderParams.orderInformation,
      );
    });
  });
});
