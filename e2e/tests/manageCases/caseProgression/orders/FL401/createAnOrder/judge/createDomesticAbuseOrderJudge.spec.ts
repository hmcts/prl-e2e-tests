import {
  manageOrdersOptions,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../../common/types.js";
import { ManageOrder5Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder5.po.js";
import { ManageOrder19Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder19.po.js";
import { OrderInformation } from "../../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.ts";
import { test } from "../../../../../../fixtures.js";
import config from "../../../../../../../utils/config.utils.js";
import { FL404B2Fl406OrderScenarios } from "../../../../../../../testData/manageOrders.js";
import { ManageOrder30Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder30.po.js";
import { ManageOrder12Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/powerOfArrestOrderManageOrder12.po.js";

export interface FL404B2FL406CreateOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  orderOption: manageOrdersOptions;
  isUploadAnOrder: boolean;
  manageOrder5Params: ManageOrder5Params;
  manageOrder12Params?: ManageOrder12Params;
  manageOrder19Params?: ManageOrder19Params;
  manageOrder30Params: ManageOrder30Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

export interface FL404B2CreateOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  orderOption: manageOrdersOptions;
  isUploadAnOrder: boolean;
  manageOrder5Params: ManageOrder5Params;
  manageOrder12Params?: ManageOrder12Params;
  manageOrder19Params: ManageOrder19Params;
  manageOrder30Params: ManageOrder30Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}
export interface FL406CreateOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  orderOption: manageOrdersOptions;
  isUploadAnOrder: boolean;
  manageOrder5Params: ManageOrder5Params;
  manageOrder12Params: ManageOrder12Params;
  manageOrder19Params?: ManageOrder19Params;
  manageOrder30Params: ManageOrder30Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("Manage Orders - Create a Blank order (FL404B) and Power of arrest (FL406) order tests", () => {
  let caseNumber: string = "";

  test.beforeEach(
    async ({ judge, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACaseSendToGatekeeper(browser);
      await navigationUtils.goToCase(
        judge.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  FL404B2Fl406OrderScenarios.forEach((manageOrderParams) => {
    test(`DA 'Create an order - ' : ${manageOrderParams.orderType} as a Judge with the following options:${manageOrderParams.name} @regression @nightly @visual`, async ({
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

      if (manageOrderParams.orderType.includes("FL404B")) {
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
      } else {
        await manageOrders.powerOfArrestManageOrder12Page.assertPageContents(
          manageOrderParams.orderType,
        );
        await manageOrders.powerOfArrestManageOrder12Page.verifyAccessibility();
        await manageOrders.powerOfArrestManageOrder12Page.fillOrderDetails(
          manageOrderParams.manageOrder12Params,
        );
        await manageOrders.powerOfArrestManageOrder12Page.clickContinue();
      }

      await manageOrders.manageOrder20Page.assertPageContents(
        manageOrderParams.orderType,
        caseNumber,
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

      // check the draft orders tab as court admin
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );

      const { draftedOrders } = caseWorker;
      await draftedOrders.draftOrdersPage.goToPage();
      await draftedOrders.draftOrdersPage.assertDraftOrders(
        manageOrderParams.orderInformation,
      );
    });
  });
});
