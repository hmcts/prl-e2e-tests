import { test } from "../../../../../../fixtures.ts";
import config from "../../../../../../../utils/config.utils.ts";
import {
  manageOrdersOptions,
  OrderTypes,
} from "../../../../../../../common/types.ts";
import { ManageOrder19Params } from "../../../../../../../pageObjects/pages/exui/orders/manageOrders/manageOrder19.po.ts";

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

  [
    {
      orderOption: "create custom order" as manageOrdersOptions,
      isApprovedAtAHearing: false,
      orderType: "Amended, discharged or varied order (FL404B)" as OrderTypes,
      page5Params: {
        isOrderByConsent: true,
        legalAdviserName: "Test Legal Adviser Name",
        isOrderAboutChildren: false,
      },
      page19Params: {
        isDateReservedWithListAssist: false,
      } as ManageOrder19Params,
      snapshotsPath: ["caseProgression", "orders", "customOrders"],
      cyaSnapshotName: "amended-discharged-or-varied-custom-order-cya",
      orderSnapshotName:
        "amended-discharged-or-varied-custom-order-draft-order",
    },
  ].forEach(
    ({
      orderOption,
      isApprovedAtAHearing,
      orderType,
      page5Params,
      page19Params,
      snapshotsPath,
      cyaSnapshotName,
      orderSnapshotName,
    }) => {
      test(`Create a an Amended, discharged or varied custom order @regression @nightly @visual`, async ({
        judge,
      }): Promise<void> => {
        const { manageOrders, summaryPage, draftedOrders } = judge;

        await summaryPage.chooseEventFromDropdown("Manage orders");
        await manageOrders.manageOrder1Page.assertPageContents();
        await manageOrders.manageOrder1Page.verifyAccessibility();
        await manageOrders.manageOrder1Page.selectOrderOption(orderOption);
        await manageOrders.manageOrder1Page.clickContinue();

        await manageOrders.manageOrder102Page.assertPageContents();
        await manageOrders.manageOrder102Page.verifyAccessibility();
        await manageOrders.manageOrder102Page.selectWasTheOrderApprovedAtAHearing(
          isApprovedAtAHearing,
        );
        await manageOrders.manageOrder102Page.clickContinue();

        await manageOrders.customOrderManageOrder5Page.assertPageContents(
          "FL401",
        );
        await manageOrders.customOrderManageOrder5Page.verifyAccessibility();
        await manageOrders.customOrderManageOrder5Page.fillInFields({
          orderType: orderType,
          isOrderByConsent: page5Params.isOrderByConsent,
          legalAdviserName: page5Params.legalAdviserName,
          isOrderAboutChildren: page5Params.isOrderAboutChildren,
          caseType: "FL401",
        });
        await manageOrders.customOrderManageOrder5Page.clickContinue();

        await manageOrders.manageOrder19Page.assertPageContents(
          orderType,
          true,
        );
        await manageOrders.manageOrder19Page.verifyAccessibility();
        await manageOrders.manageOrder19Page.fillHearingDetails(page19Params);
        await manageOrders.manageOrder19Page.clickContinue();

        await manageOrders.customOrderManageOrder20Page.assertPageContents(
          caseNumber,
          snapshotsPath,
          orderType,
        );
        await manageOrders.customOrderManageOrder20Page.verifyAccessibility();
        await manageOrders.customOrderManageOrder20Page.clickContinue();

        await manageOrders.manageOrder30Page.assertPageContents();
        await manageOrders.manageOrder30Page.verifyAccessibility();
        await manageOrders.manageOrder30Page.fillAdminDirectionDetails(true);
        await manageOrders.manageOrder30Page.clickContinue();

        await manageOrders.manageOrderSubmitPage.assertPageContents(
          snapshotsPath,
          cyaSnapshotName,
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
            typeOfOrder: orderType,
            englishDocument: `${orderType.replace(/[(),]/g, "")}_${caseNumber}.docx`,
            otherDetails: {
              orderMadeBy: "Elizabeth Williams",
              orderCreatedBy: "Elizabeth Williams",
              status: "Created by Judge",
            },
            isOrderAboutChildren: page5Params.isOrderAboutChildren,
          },
        ]);
        await draftedOrders.draftOrdersPage.assertDraftOrderDocument(
          snapshotsPath,
          caseNumber,
          `${orderType.replace(/[(),]/g, "")}_${caseNumber}.docx`,
          orderSnapshotName,
        );
      });
    },
  );
});
