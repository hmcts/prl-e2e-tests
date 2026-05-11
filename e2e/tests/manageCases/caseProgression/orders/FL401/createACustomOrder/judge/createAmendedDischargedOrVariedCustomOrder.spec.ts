import { test } from "../../../../../../fixtures.ts";
import config from "../../../../../../../utils/config.utils.ts";
import { CreateAmendedDischargedOrVariedCustomOrderScenarios } from "../../../../../../../testData/draftOrders.ts";
import { CustomOrderParams } from "../../../C100/createACustomOrder/judge/createParentalResponsibilityCustomOrder.spec.ts";

test.describe("Manage Orders - Create custom amended, discharged or varied custom order tests", () => {
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

  CreateAmendedDischargedOrVariedCustomOrderScenarios.forEach(
    (customOrderParams: CustomOrderParams) => {
      test(`Create a an Amended, discharged or varied custom order @regression @nightly @visual`, async ({
        judge,
      }): Promise<void> => {
        const { manageOrders, summaryPage, draftedOrders } = judge;

        await summaryPage.chooseEventFromDropdown("Manage orders");
        await manageOrders.manageOrder1Page.assertPageContents();
        await manageOrders.manageOrder1Page.verifyAccessibility();
        await manageOrders.manageOrder1Page.selectOrderOption(
          customOrderParams.orderOption,
        );
        await manageOrders.manageOrder1Page.clickContinue();

        await manageOrders.manageOrder102Page.assertPageContents();
        await manageOrders.manageOrder102Page.verifyAccessibility();
        await manageOrders.manageOrder102Page.selectWasTheOrderApprovedAtAHearing(
          customOrderParams.isApprovedAtAHearing,
        );
        await manageOrders.manageOrder102Page.clickContinue();

        await manageOrders.customOrderManageOrder5Page.assertPageContents(
          "FL401",
        );
        await manageOrders.customOrderManageOrder5Page.verifyAccessibility();
        await manageOrders.customOrderManageOrder5Page.fillInFields(
          customOrderParams.page5Params,
        );
        await manageOrders.customOrderManageOrder5Page.clickContinue();

        await manageOrders.manageOrder19Page.assertPageContents(
          customOrderParams.orderType,
          true,
        );
        await manageOrders.manageOrder19Page.verifyAccessibility();
        await manageOrders.manageOrder19Page.fillHearingDetails(
          customOrderParams.page19Params,
        );
        await manageOrders.manageOrder19Page.clickContinue();

        await manageOrders.customOrderManageOrder20Page.assertPageContents(
          caseNumber,
          customOrderParams.snapshotsPath,
          customOrderParams.orderType,
        );
        await manageOrders.customOrderManageOrder20Page.verifyAccessibility();
        await manageOrders.customOrderManageOrder20Page.clickContinue();

        await manageOrders.manageOrder30Page.assertPageContents();
        await manageOrders.manageOrder30Page.verifyAccessibility();
        await manageOrders.manageOrder30Page.fillAdminDirectionDetails(true);
        await manageOrders.manageOrder30Page.clickContinue();

        await manageOrders.manageOrderSubmitPage.assertPageContents(
          customOrderParams.snapshotsPath,
          customOrderParams.cyaSnapshotName,
        );
        await manageOrders.manageOrderSubmitPage.verifyAccessibility();
        await manageOrders.manageOrderSubmitPage.clickSubmit();

        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Manage orders",
        );

        // check draft order
        await draftedOrders.draftOrdersPage.goToPage();
        await draftedOrders.draftOrdersPage.assertDraftOrders([
          {
            typeOfOrder: customOrderParams.orderType,
            englishDocument: `${customOrderParams.orderType.replace(/[(),]/g, "")}_${caseNumber}.docx`,
            otherDetails: {
              orderMadeBy: "Elizabeth Williams",
              orderCreatedBy: "Elizabeth Williams",
              status: "Created by Judge",
            },
            isOrderAboutChildren:
              customOrderParams.page5Params.isOrderAboutChildren,
          },
        ]);
        await draftedOrders.draftOrdersPage.assertDraftOrderDocument(
          customOrderParams.snapshotsPath,
          caseNumber,
          `${customOrderParams.orderType.replace(/[(),]/g, "")}_${caseNumber}.docx`,
          customOrderParams.orderSnapshotName,
        );
      });
    },
  );
});
