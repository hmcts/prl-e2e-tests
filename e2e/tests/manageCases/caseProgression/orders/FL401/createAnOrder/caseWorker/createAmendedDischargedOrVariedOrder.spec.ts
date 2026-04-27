import { test } from "../../../../../../fixtures.js";
import config from "../../../../../../../utils/config.utils.js";
import {
  manageOrdersOptions,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../../common/types.js";
import { ManageOrder5Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder5.po.js";
import { ManageOrder19Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder19.po.js";
import { ManageOrder24Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder24.po.js";
import { OrderInformation } from "../../../../../../../pageObjects/pages/exui/caseView/Orders.po.js";
import { AmendedDischargedVariedOrderScenarios } from "../../../../../../../testData/manageOrders.js";
import { ManageOrder26Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder26.po.js";
import { ManageOrder28Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder28.po.js";

export interface AmendedDischargedVariedOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  orderOption: manageOrdersOptions;
  isUploadAnOrder: boolean;
  manageOrder5Params: ManageOrder5Params;
  manageOrder19Params: ManageOrder19Params;
  manageOrder24Params: ManageOrder24Params;
  manageOrder26Params: ManageOrder26Params;
  manageOrder28Params: ManageOrder28Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("Manage Orders - Create a Amended, Discharged Or varied order (FL404B) order tests", () => {
  let caseNumber: string = "";

  test.beforeEach(
    async ({ caseWorker, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACaseSendToGatekeeper(browser);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  AmendedDischargedVariedOrderScenarios.forEach(
    (manageOrderParams: AmendedDischargedVariedOrderParams) => {
      test(`Create Amended, Discharged Or varied order (FL404B) as case worker with the following options:${manageOrderParams.name} @regression @nightly @visual`, async ({
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

        await manageOrders.manageOrder12Page.assertPageContents(
          manageOrderParams.orderType,
        );
        await manageOrders.manageOrder12Page.verifyAccessibility();
        await manageOrders.manageOrder12Page.fillHearingOutcomeDetail();
        await manageOrders.manageOrder12Page.clickContinue();

        await manageOrders.manageOrder19Page.assertPageContents(
          manageOrderParams.orderType,
        );
        //await manageOrders.manageOrder19Page.verifyAccessibility();
        await manageOrders.manageOrder19Page.fillHearingDetails(
          manageOrderParams.manageOrder19Params,
        );
        await manageOrders.manageOrder19Page.clickContinue();

        await manageOrders.manageOrder20Page.assertPageContents(
          manageOrderParams.orderType,
          caseNumber,
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
        await manageOrders.manageOrder26Page.assertPageContents("FL401");
        await manageOrders.manageOrder26Page.verifyAccessibility();
        await manageOrders.manageOrder26Page.selectServeOrderOptions(
          "FL401",
          manageOrderParams.manageOrder26Params,
        );
        await manageOrders.manageOrder26Page.clickContinue();

        await manageOrders.manageOrder27Page.assertPageContents(
          manageOrderParams.orderType,
        );
        await manageOrders.manageOrder27Page.verifyAccessibility();
        await manageOrders.manageOrder27Page.clickContinue();

        await manageOrders.manageOrder28Page.assertPageContents("FL401");
        await manageOrders.manageOrder28Page.verifyAccessibility();
        await manageOrders.manageOrder28Page.serveOrderDetails(
          "FL401",
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
          caseNumber,
          "Manage orders",
        );

        // check the orders tab as court admin

        await Orders.OrdersPage.goToPage();
        await Orders.OrdersPage.assertOrders(
          manageOrderParams.orderInformation,
        );
      });
    },
  );
});
