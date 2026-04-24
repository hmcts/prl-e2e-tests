import { test } from "../../../../../fixtures.ts";
import config from "../../../../../../utils/config.utils.js";
import { C43UploadOrderScenarios } from "../../../../../../testData/manageOrders.js";
import {
  manageOrdersOptions,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../common/types.js";
import { OrderInformation } from "../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { ManageOrder5Params } from "../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder5.po.js";
import { ManageOrder10Params } from "../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder10.po.js";
import { ManageOrder30Params } from "../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder30.po.js";

export interface C43UploadOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  orderOption: manageOrdersOptions;
  isUploadAnOrder: boolean;
  isOrderByConsent: boolean;
  manageOrder5Params: ManageOrder5Params;
  manageOrder10Params: ManageOrder10Params;
  manageOrder30Params: ManageOrder30Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("'Upload an C100 order' by Judge via the 'Manage order' event tests", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ judge, browser, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        judge.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  //C43 upload order
  C43UploadOrderScenarios.forEach((uploadOrderParams: C43UploadOrderParams) => {
    test(`CA 'Upload an order - ' : ${uploadOrderParams.orderType} as a Judge with the following options:${uploadOrderParams.name} @regression @nightly @visual`, async ({
      judge,
      caseWorker,
      navigationUtils,
    }): Promise<void> => {
      const { manageOrders, summaryPage } = judge;

      await summaryPage.chooseEventFromDropdown("Manage orders");
      await manageOrders.manageOrder1Page.assertPageContents();
      await manageOrders.manageOrder1Page.verifyAccessibility();
      await manageOrders.manageOrder1Page.selectOrderOption(
        uploadOrderParams.orderOption,
      );
      await manageOrders.manageOrder1Page.clickContinue();
      await manageOrders.manageOrder3Page.assertPageContents();
      await manageOrders.manageOrder3Page.verifyAccessibility();
      await manageOrders.manageOrder3Page.selectOrderTypeAndConsent(
        uploadOrderParams.orderType,
        uploadOrderParams.isOrderByConsent,
      );
      await manageOrders.manageOrder3Page.clickContinue();
      await manageOrders.manageOrder5Page.assertPageContents(
        uploadOrderParams.isUploadAnOrder,
        uploadOrderParams.caseType,
        uploadOrderParams.orderType,
      );
      await manageOrders.manageOrder5Page.verifyAccessibility();
      await manageOrders.manageOrder5Page.fillInFields(
        uploadOrderParams.isUploadAnOrder,
        uploadOrderParams.caseType,
        uploadOrderParams.manageOrder5Params,
      );
      await manageOrders.manageOrder5Page.clickContinue();

      await manageOrders.manageOrder10Page.assertPageContents(
        uploadOrderParams.isUploadAnOrder,
        uploadOrderParams.orderType,
      );
      await manageOrders.manageOrder10Page.verifyAccessibility();
      await manageOrders.manageOrder10Page.selectC43OrderDetails(
        uploadOrderParams.manageOrder10Params,
      );
      await manageOrders.manageOrder10Page.clickContinue();

      await manageOrders.manageOrder30Page.assertPageContents();
      await manageOrders.manageOrder30Page.verifyAccessibility();
      await manageOrders.manageOrder30Page.fillAdminDirectionDetails(
        uploadOrderParams.manageOrder30Params.serveApplication,
      );
      await manageOrders.manageOrder30Page.clickContinue();

      await manageOrders.manageOrderSubmitPage.assertPageContents(
        uploadOrderParams.snapshotsPath,
        uploadOrderParams.snapshotName,
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
        uploadOrderParams.orderInformation,
      );
    });
  });
});
