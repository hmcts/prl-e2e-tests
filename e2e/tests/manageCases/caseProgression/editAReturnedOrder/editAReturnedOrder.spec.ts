import config from "../../../../utils/config.utils.ts";
import { test, expect } from "../../../fixtures.ts";
import { Page } from "@playwright/test";
import { EditReturnedOrder3Params } from "../../../../pageObjects/pages/exui/editReturnedOrder/editReturnedOrder3.po.ts";
import { ChildArrangementsEditAReturnedOrderScenarios } from "../../../../testData/editAReturnedOrder.ts";
import { OrderTypes } from "../../../../common/types.ts";
import {
  editAndApproveOrder,
  type EditAndApproveOrderData,
 } from "../../../../utils/editAndApproveOrder.utils.ts";
import { JudgePagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/judgePages.ts";

export interface ChildArrangementsEditAReturnedOrderParams {
  orderType: OrderTypes;
  editReturnedOrder3Params: EditReturnedOrder3Params;
  snapshotName: string;
  snapshotsPath: string[];
}

test.describe("'Edit a returned order' flow.", () => {
  let caseRef: string;

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
      console.log(caseRef);
    });
  
  ChildArrangementsEditAReturnedOrderScenarios.forEach(
    (editAReturnedOrderParams: ChildArrangementsEditAReturnedOrderParams) => {
    test(`Solicitor 'Edit a returned order' flow for a CA case. @regression @accessibility @nightly @test`, async ({
      caseWorker,
      navigationUtils,
      manageCasesEventUtils,
      solicitor,
      browser,
    }): Promise<void> => {
      const { page } =
        solicitor;
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseRef,
        "summary",
      );
      await manageCasesEventUtils.createSolicitorDraftOrder(
        caseRef,
        "Parental responsibility order (C45A)",
      );

      // edit and approve the order, asking an update
      const judgeSession: Page = await navigationUtils.openNewBrowserWindow(browser, "judge");
      await navigationUtils.goToCase(
        judgeSession,
        config.manageCasesBaseURLCase,
        caseRef,
        "summary",
      );
      await judgeSession.getByRole("tab", { name: "Tasks" }).click();

      const judgePages = new JudgePagesGroup(judgeSession);
      
      const editAndApproveData: EditAndApproveOrderData = {
        judeOrderAction: "Ask the legal representative to make changes",
        orderType: "Parental responsibility order (C45A)",
        serveApplication: true,
        status: "Rejected by Judge",
        isUrgent: false,
        snapshotName: "C45A-judge-review-approve-order-askLegalRep-Changes",
        snapshotPath: [
          "caseProgression",
          "orders",
          "editAndApproveAnOrders",
        ],
      };
      await editAndApproveOrder(
        caseRef,
        judgePages,
        caseWorker,
        editAndApproveData,
        navigationUtils,
      );
      
      // starting 'Edit a returned order' event
      const { editAReturnedOrderEvent, summaryPage, tasksPage } =
        solicitor;
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseRef,
        "summary",
      );
      await expect(
            summaryPage.page.getByRole("heading", { name: "Summary" }),
          ).toBeVisible();
      await summaryPage.chooseEventFromDropdown("Edit a returned order");

      await editAReturnedOrderEvent.editReturnedOrder1Page.assertPageContents();
      await editAReturnedOrderEvent.editReturnedOrder1Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder1Page.selectOrder();
      await editAReturnedOrderEvent.editReturnedOrder1Page.clickContinue();

      await editAReturnedOrderEvent.editReturnedOrder2Page.assertPageContents();
      await editAReturnedOrderEvent.editReturnedOrder2Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder2Page.clickContinue();

      await editAReturnedOrderEvent.editReturnedOrder3Page.assertPageContents("C100", editAReturnedOrderParams.orderType);
      await editAReturnedOrderEvent.editReturnedOrder3Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder3Page.fillInFields("C100", editAReturnedOrderParams.editReturnedOrder3Params);
      await editAReturnedOrderEvent.editReturnedOrder3Page.clickContinue();

      await editAReturnedOrderEvent.editReturnedOrder7Page.assertPageContents(editAReturnedOrderParams.orderType);
      await editAReturnedOrderEvent.editReturnedOrder7Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder7Page.fillInFields(); 
      await editAReturnedOrderEvent.editReturnedOrder7Page.clickContinue(); 

      await editAReturnedOrderEvent.editReturnedOrder13Page.assertPageContents(editAReturnedOrderParams.orderType, caseRef, editAReturnedOrderParams.snapshotName, editAReturnedOrderParams.snapshotsPath);
      await editAReturnedOrderEvent.editReturnedOrder13Page.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrder13Page.clickContinue();

      await editAReturnedOrderEvent.editReturnedOrderSubmitPage.assertPageContents(
        editAReturnedOrderParams.snapshotsPath,
        editAReturnedOrderParams.snapshotName,
      );
      await editAReturnedOrderEvent.editReturnedOrderSubmitPage.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrderSubmitPage.clickSaveAndContinue();

      await editAReturnedOrderEvent.editReturnedOrderConfirmPage.assertPageContents();
      await editAReturnedOrderEvent.editReturnedOrderConfirmPage.verifyAccessibility();
      await editAReturnedOrderEvent.editReturnedOrderConfirmPage.clickCloseAndReturnToCaseDetails();

      // switching back to the Judge context to validate the new WA task
      await navigationUtils.goToCase(
        judgeSession,
        config.manageCasesBaseURLCase,
        caseRef,
        "summary",
      );
      await judgeSession.getByRole("tab", { name: "Tasks" }).click();
      await judgePages.tasksPage.assignTaskToMeAndTriggerNextSteps(
        "Review resubmitted Order - ",  // new WA task after resubmission
        "Review and Approve Legal rep Order",
        "judge",
      );

    });
    });
  });
