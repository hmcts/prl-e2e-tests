import { test } from "../../../../../fixtures.js";
import config from "../../../../../../utils/config.utils.js";
import {
  manageOrdersOptions,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../common/types.js";
import { OrderInformation } from "../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { ManageOrder5Params } from "../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder5.po.js";
import { ManageOrder24Params } from "../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder24.po.js";
import { FL404AFL406UploadOrderScenarios } from "../../../../../../testData/manageOrders.js";
import { ManageOrder26Params } from "../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder26.po.js";

export interface DomesticAbuseUploadOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  orderOption: manageOrdersOptions;
  isUploadAnOrder: boolean;
  isOrderByConsent: boolean;
  manageOrder5Params: ManageOrder5Params;
  manageOrder24Params: ManageOrder24Params;
  manageOrder26Params: ManageOrder26Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("'Upload an order' by Case Worker via the 'Create/upload draft order' event tests", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ caseWorker, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACaseAddCaseNumber(browser);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  //FL404A+FL406 upload order
  FL404AFL406UploadOrderScenarios.forEach(
    (uploadOrderParams: DomesticAbuseUploadOrderParams) => {
      test(`DA 'Upload an  order - ' : ${uploadOrderParams.orderType} as a Case Worker with the following options:${uploadOrderParams.name} @regression @nightly @visual`, async ({
        caseWorker,
      }): Promise<void> => {
        const { manageOrders, summaryPage, draftedOrders } = caseWorker;

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

        await manageOrders.manageOrder24Page.assertPageContents();
        await manageOrders.manageOrder24Page.verifyAccessibility();
        await manageOrders.manageOrder24Page.selectCheckOrder(
          uploadOrderParams.manageOrder24Params,
        );
        await manageOrders.manageOrder24Page.clickContinue();

        if (uploadOrderParams.manageOrder24Params.checkOption === "noCheck") {
          await manageOrders.manageOrder26Page.assertPageContents();
          await manageOrders.manageOrder26Page.verifyAccessibility();
          await manageOrders.manageOrder26Page.selectServeOrderOptions(
            uploadOrderParams.manageOrder26Params,
          );
          await manageOrders.manageOrder26Page.clickContinue();
        }
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
        await draftedOrders.draftOrdersPage.goToPage();
        await draftedOrders.draftOrdersPage.assertDraftOrders(
          uploadOrderParams.orderInformation,
        );
      });
    },
  );
});
