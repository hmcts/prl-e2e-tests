import { test } from "../../../../../../fixtures.ts";
import config from "../../../../../../../utils/config.utils.ts";
import { SpecialGuardianshipCreateOrderScenarios } from "../../../../../../../testData/ui/manageOrders.ts";
import {
  manageOrdersOptions,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../../common/types.ts";

import { OrderInformation } from "../../../../../../../pageObjects/pages/exui/caseView/Orders.po.ts";
import { ManageOrder5Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder5.po.ts";
import { ManageOrder24Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder24.po.ts";
import { ManageOrder26Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder26.po.ts";
import { ManageOrder28Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder28.po.ts";

export interface SpecialGuardianshipCreateOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  orderOption: manageOrdersOptions;
  isUploadAnOrder: boolean;
  manageOrder5Params: ManageOrder5Params;
  manageOrder24Params: ManageOrder24Params;
  manageOrder26Params: ManageOrder26Params;
  manageOrder28Params: ManageOrder28Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("Manage Orders - Create a Special Guardianship order tests", () => {
  let caseRef: string = "";

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  SpecialGuardianshipCreateOrderScenarios.forEach(
    (manageOrderParams: SpecialGuardianshipCreateOrderParams) => {
      test(`Create Special Guardianship C43A as case worker with the following options:${manageOrderParams.name} @regression @nightly @visual`, async ({
        caseWorker,
      }): Promise<void> => {
        const { manageOrders, summaryPage, Orders } = caseWorker;

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

        await manageOrders.manageOrder11Page.assertPageContents(
          manageOrderParams.orderType,
        );
        await manageOrders.manageOrder11Page.verifyAccessibility();
        await manageOrders.manageOrder11Page.fillOrderDetails();
        await manageOrders.manageOrder11Page.clickContinue();

        await manageOrders.manageOrder20Page.assertPageContents(
          manageOrderParams.orderType,
          caseRef,
          manageOrderParams.snapshotName,
          manageOrderParams.snapshotsPath,
        );
        await manageOrders.manageOrder20Page.verifyAccessibility();
        await manageOrders.manageOrder20Page.clickContinue();

        await manageOrders.manageOrder24Page.assertPageContents();
        await manageOrders.manageOrder24Page.verifyAccessibility();
        await manageOrders.manageOrder24Page.selectCheckOrder(
          manageOrderParams.manageOrder24Params,
        );
        await manageOrders.manageOrder24Page.clickContinue();

        await manageOrders.manageOrder26Page.assertPageContents("C100");
        await manageOrders.manageOrder26Page.verifyAccessibility();
        await manageOrders.manageOrder26Page.selectServeOrderOptions(
          "C100",
          manageOrderParams.manageOrder26Params,
        );
        await manageOrders.manageOrder26Page.clickContinue();

        await manageOrders.manageOrder27Page.assertPageContents(
          manageOrderParams.orderType,
        );
        await manageOrders.manageOrder27Page.verifyAccessibility();
        await manageOrders.manageOrder27Page.clickContinue();

        await manageOrders.manageOrder28Page.assertPageContents("C100");
        await manageOrders.manageOrder28Page.verifyAccessibility();
        await manageOrders.manageOrder28Page.serveOrderDetails(
          "C100",
          manageOrderParams.manageOrder28Params,
        );
        await manageOrders.manageOrder28Page.clickContinue();

        await manageOrders.manageOrderSubmitPage.assertPageContents(
          manageOrderParams.snapshotsPath,
          manageOrderParams.snapshotName,
        );
        await manageOrders.manageOrderSubmitPage.verifyAccessibility();
        await manageOrders.manageOrderSubmitPage.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseRef,
          "Manage orders",
        );

        // check the served orders tab as court admin
        await Orders.OrdersPage.goToPage();
        await Orders.OrdersPage.assertOrders(
          manageOrderParams.orderInformation,
        );
      });
    },
  );
});
