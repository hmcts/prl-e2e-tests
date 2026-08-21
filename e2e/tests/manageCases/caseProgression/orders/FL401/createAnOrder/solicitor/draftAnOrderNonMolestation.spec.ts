import { test } from "../../../../../../fixtures.ts";
import Config from "../../../../../../../utils/config.utils.ts";
import { NonMolestationDraftOrderScenarios } from "../../../../../../../testData/ui/draftOrders.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../../common/types.ts";
import { DraftAnOrder6Params } from "../../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder6.po.ts";
import { OrderInformation } from "../../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.ts";
import { DraftAnOrder17Params } from "../../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder17.po.ts";

import config from "../../../../../../../utils/config.utils.ts";
import { DraftAnOrder5Params } from "../../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder5.po.ts";

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
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
        .caseRef;
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseRef,
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
        draftOrderParams.isDraftAnOrder,
        draftOrderParams.caseType,
        draftOrderParams.orderType,
      );
      await draftOrders.draftAnOrder5Page.verifyAccessibility();
      await draftOrders.draftAnOrder5Page.fillInFields(
        draftOrderParams.isDraftAnOrder,
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
        caseRef,
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
        caseRef,
        "Create/upload draft order",
      );

      // check the draft orders tab as court admin
      await navigationUtils.goToCase(
        caseWorker.page,
        Config.manageCasesBaseURLCase,
        caseRef,
      );

      const { draftedOrders } = caseWorker;
      await draftedOrders.draftOrdersPage.goToPage();
      await draftedOrders.draftOrdersPage.assertDraftOrders(
        draftOrderParams.orderInformation,
      );
    });
  });
});
