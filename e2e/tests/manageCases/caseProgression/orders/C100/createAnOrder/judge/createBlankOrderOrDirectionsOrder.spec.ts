import {
  manageOrdersOptions,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../../common/types.ts";
import { ManageOrder5Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder5.po.ts";
import { OrderInformation } from "../../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.ts";
import { test } from "../../../../../../fixtures.ts";
import config from "../../../../../../../utils/config.utils.ts";
import { C21CreateOrderScenarios } from "../../../../../../../testData/ui/manageOrders.ts";
import { ManageOrder4Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder4.po.ts";
import { ManageOrder30Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder30.po.ts";

export interface C21CreateOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  orderOption: manageOrdersOptions;
  isUploadAnOrder: boolean;
  manageOrder4Params: ManageOrder4Params;
  manageOrder5Params: ManageOrder5Params;
  manageOrder30Params: ManageOrder30Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("Manage Orders - Create a Blank order or Directions order (C21) tests", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ judge, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await navigationUtils.goToCase(
      judge.page,
      config.manageCasesBaseURLCase,
      caseRef,
    );
  });

  C21CreateOrderScenarios.forEach((manageOrderParams: C21CreateOrderParams) => {
    test(`Create child a blank order C21 as case worker with the following options:${manageOrderParams.name} @regression @nightly @visual`, async ({
      judge,
      caseWorker,
      navigationUtils,
    }): Promise<void> => {
      const { manageOrders, summaryPage } = judge;

      await summaryPage.chooseEventFromDropdown("Manage orders");
      await manageOrders.manageOrder1Page.assertPageContents();
      await manageOrders.manageOrder1Page.verifyAccessibility();
      await manageOrders.manageOrder1Page.selectOrderOption(
        manageOrderParams.orderOption,
      );
      await manageOrders.manageOrder1Page.clickContinue();

      await manageOrders.manageOrder2Page.assertPageContents();
      await manageOrders.manageOrder2Page.verifyAccessibility();
      await manageOrders.manageOrder2Page.selectOrderType(
        manageOrderParams.orderType,
      );
      await manageOrders.manageOrder2Page.clickContinue();

      await manageOrders.manageOrder4Page.assertPageContents();
      await manageOrders.manageOrder4Page.verifyAccessibility();
      await manageOrders.manageOrder4Page.selectC21OrderDetails(
        manageOrderParams.manageOrder4Params,
      );
      await manageOrders.manageOrder4Page.clickContinue();

      await manageOrders.manageOrder5Page.assertPageContents(
        manageOrderParams.isUploadAnOrder,
        manageOrderParams.caseType,
        manageOrderParams.orderType,
      );
      await manageOrders.manageOrder5Page.verifyAccessibility();
      await manageOrders.manageOrder5Page.fillInFields(
        manageOrderParams.isUploadAnOrder,
        manageOrderParams.caseType,
        manageOrderParams.manageOrder5Params,
      );
      await manageOrders.manageOrder5Page.clickContinue();

      await manageOrders.manageOrder20Page.assertPageContents(
        manageOrderParams.orderType,
        caseRef,
        manageOrderParams.snapshotName,
        manageOrderParams.snapshotsPath,
      );
      await manageOrders.manageOrder20Page.verifyAccessibility();
      await manageOrders.manageOrder20Page.clickContinue();

      await manageOrders.manageOrder30Page.assertPageContents();
      await manageOrders.manageOrder30Page.verifyAccessibility();
      await manageOrders.manageOrder30Page.fillAdminDirectionDetails(
        manageOrderParams.manageOrder30Params.serveApplication,
      );
      await manageOrders.manageOrder30Page.clickContinue();

      await manageOrders.manageOrderUrgentPage.assertPageContents();
      await manageOrders.manageOrderUrgentPage.verifyAccessibility();
      await manageOrders.manageOrderUrgentPage.selectIsUrgent(false);
      await manageOrders.manageOrderUrgentPage.clickContinue();

      await manageOrders.manageOrderSubmitPage.assertPageContents(
        manageOrderParams.snapshotsPath,
        manageOrderParams.snapshotName,
      );
      await manageOrders.manageOrderSubmitPage.verifyAccessibility();
      await manageOrders.manageOrderSubmitPage.clickSubmit();
      await summaryPage.alertBanner.assertEventAlert(caseRef, "Manage orders");

      // check the draft orders tab as court admin
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );

      const { draftedOrders } = caseWorker;
      await draftedOrders.draftOrdersPage.goToPage();
      await draftedOrders.draftOrdersPage.assertDraftOrders(
        manageOrderParams.orderInformation,
      );
    });
  });
});
