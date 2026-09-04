import { test } from "../../../../../../fixtures.ts";
import config from "../../../../../../../utils/config.utils.ts";
import {
  manageOrdersOptions,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../../common/types.ts";
import { ManageOrder5Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder5.po.ts";
import { ManageOrder12Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/occupationOrderManageOrder12.po.ts";
import { ManageOrder19Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder19.po.ts";
import { ManageOrder24Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder24.po.ts";
import { OrderInformation } from "../../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.ts";
import { OccupationOrderScenarios } from "../../../../../../../testData/ui/manageOrders.ts";

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
  let caseRef: string = "";

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
        .caseRef;
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  OccupationOrderScenarios.forEach(
    (manageOrderParams: OccupationOrderParams) => {
      test(`Create Occupation order (FL404) as case worker with the following options:${manageOrderParams.name} @regression @nightly @visual`, async ({
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
        await summaryPage.alertBanner.assertEventAlert(
          caseRef,
          "Manage orders",
        );

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
    },
  );
});
