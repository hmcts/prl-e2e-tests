import { test } from "../../../../../../fixtures.js";
import config from "../../../../../../../utils/config.utils.js";
import {
  manageOrdersOptions,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../../common/types.js";
import { ManageOrder5Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder5.po.js";
import { ManageOrder12Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/occupationOrderManageOrder12.po.js";
import { ManageOrder19Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder19.po.js";
import { ManageOrder24Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder24.po.js";
import { OrderInformation } from "../../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { OccupationOrderScenarios } from "../../../../../../../testData/manageOrders.js";

export interface OccupationOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  orderOption: manageOrdersOptions;
  isUploadAnOrder: boolean;
  manageOrder5Params: ManageOrder5Params;
  manageOrder12Params: ManageOrder12Params;
  manageOrder19Params: ManageOrder19Params;
  manageOrder24Params: ManageOrder24Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("Manage Orders - Create Occupation Order (FL404) order tests", () => {
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

  OccupationOrderScenarios.forEach(
    (manageOrderParams: OccupationOrderParams) => {
      test(`Create Occupation order (FL404) as case worker with the following options:${manageOrderParams.name} @regression @nightly @visual @customRun`, async ({
        caseWorker,
        navigationUtils,
      }): Promise<void> => {
        const { manageOrders, summaryPage } = caseWorker;

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

        await manageOrders.occupationOrderManageOrders12Page.assertPageContents(
          manageOrderParams.orderType,
        );
        await manageOrders.occupationOrderManageOrders12Page.verifyAccessibility();
        await manageOrders.occupationOrderManageOrders12Page.fillOrderDetails(
          manageOrderParams.manageOrder12Params,
        );
        await manageOrders.occupationOrderManageOrders12Page.clickContinue();

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
    },
  );
});
