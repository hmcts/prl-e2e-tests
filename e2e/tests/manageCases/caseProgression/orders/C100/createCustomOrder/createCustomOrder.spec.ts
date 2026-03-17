import config from "../../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../../common/helpers.js";
import { test } from "../../../../../fixtures.ts";
import { clippingCoords } from "../../../../../../pageObjects/pages/exui/exuiMediaViewer.po.ts";

test.describe("Create a custom order", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ browser, caseEventUtils }) => {
    // Setup: create ca case as solicitor and issue to local court as court admin stoke
    caseRef = await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
    });

  test("Create a custom C43 order as a caseworker @regression", async ({ 
    caseWorker, 
  }): Promise<void> => {
    await Helpers.goToCase(caseWorker.page, config.manageCasesBaseURLCase, caseRef, "tasks");
    const { customOrders, manageOrders } = caseWorker;

    await Helpers.chooseEventFromDropdown(caseWorker.page, "Manage orders");

    await manageOrders.manageOrder1Page.selectOrderOption("create custom order");
    await manageOrders.manageOrder1Page.clickContinue();
    
    await customOrders.manageOrder102Page.selectApprovedAtHearing("No");
    await customOrders.manageOrder102Page.clickContinue();

    await customOrders.manageOrder5Page.completeC43CustomOrderConfiguration({
      orderTypeLabel: "Child Arrangements Order",
      caOrderType: "Both live with and spend time with order",
      filePath: config.testWordFile,
      orderByConsent: true,
      judgeTitle: "Her Honour Judge",
      judgeName: "Jane Doe",
      isAllChildren: true,
    });
    await customOrders.manageOrder5Page.clickContinue();

    await manageOrders.manageOrder19Page.clickContinue(); 
    await manageOrders.manageOrder20Page.checkCustomOrderPreviewLink(caseRef);
    const mediaViewer = await manageOrders.manageOrder20Page.checkCustomOrderPreviewLink(caseRef);

    const snapshotPath = ['orders', 'C43', 'Preview'];
    await mediaViewer.runVisualTestOnAllPages(
      caseWorker.page,
      snapshotPath,
      clippingCoords.centeredPageWithoutToolbar,
      [mediaViewer.toolbar.container]
    );
    await manageOrders.manageOrder20Page.clickContinue();
    
    await manageOrders.manageOrder24Page.selectNoChecksRequired();
    await manageOrders.manageOrder24Page.clickContinue();

    await manageOrders.manageOrder26Page.completeSimpleOrderFlow("1: interim");
    
    const todaysOrderLabel = Helpers.todayDate(false, false) as string; 
    await manageOrders.manageOrder27Page.verifyAndSelectOrder(todaysOrderLabel);
    await manageOrders.manageOrder27Page.clickContinue();

    await manageOrders.manageOrder28Page.submitServiceDetails({
      personallyServed: 'Yes',
      responsibility: "Applicant's legal representative",
      serveCafcass: 'No'
    });
   });
});