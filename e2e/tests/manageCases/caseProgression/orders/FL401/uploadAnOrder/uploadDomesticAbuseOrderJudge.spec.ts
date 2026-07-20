import { test } from "../../../../../fixtures.ts";
import config from "../../../../../../utils/config.utils.ts";
import {
  manageOrdersOptions,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../common/types.ts";
import { OrderInformation } from "../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.ts";
import { ManageOrder5Params } from "../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder5.po.ts";
import { FL404B2UploadOrderScenarios } from "../../../../../../testData/manageOrders.ts";
import { ManageOrder30Params } from "../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder30.po.ts";

export interface FL404B2UploadOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  orderOption: manageOrdersOptions;
  isUploadAnOrder: boolean;
  isOrderByConsent: boolean;
  manageOrder5Params: ManageOrder5Params;
  manageOrder30Params: ManageOrder30Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("'Upload an order' by Judge via the 'Manage order' event tests", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ judge, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.addFamilyManNumber(caseRef);
    await navigationUtils.goToCase(
      judge.page,
      config.manageCasesBaseURLCase,
      caseRef,
    );
  });

  //FL404B blank upload order
  FL404B2UploadOrderScenarios.forEach(
    (uploadOrderParams: FL404B2UploadOrderParams) => {
      test(`DA 'Upload an  order - ' : ${uploadOrderParams.orderType} as a Judge with the following options:${uploadOrderParams.name} @regression @nightly @visual`, async ({
        judge,
      }): Promise<void> => {
        const { manageOrders, summaryPage, draftedOrders } = judge;

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
          caseRef,
          "Manage orders",
        );

        // check the draft orders tab as judge
        await draftedOrders.draftOrdersPage.goToPage();
        await draftedOrders.draftOrdersPage.assertDraftOrders(
          uploadOrderParams.orderInformation,
        );
      });
    },
  );
});
