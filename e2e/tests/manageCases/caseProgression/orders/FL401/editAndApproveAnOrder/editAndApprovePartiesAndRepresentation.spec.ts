import { expect, Page } from "@playwright/test";
import config from "../../../../../../utils/config.utils.ts";
import { test } from "../../../../../fixtures.ts";
import { OrderTypes } from "../../../../../../common/types.js";
import { DraftAnOrder6Page } from "../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder6.po.js";

const orderType = "Non-molestation order (FL404A)" as OrderTypes;
const editOrderAction = "Edit the order myself and send to admin to serve";
const enteredParties = "Test parties and representation";
const amendedParties = "Updated parties and representation";
const servedParties = "Admin updated parties and representation";

test.describe("Parties and representation on edit and approve and edit and serve", (): void => {
  test("Judge and admin can view, amend and check parties and representation on an FL404A order @regression @accessibility", async ({
    judge,
    caseWorker,
    navigationUtils,
    manageCasesEventUtils,
  }): Promise<void> => {
    const caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await manageCasesEventUtils.createSolicitorDraftOrder(caseRef, orderType);

    await navigationUtils.goToCase(
      judge.page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );

    const { tasksPage, summaryPage, editAndApproveAnOrders, manageOrders } =
      judge;
    await tasksPage.assignTaskToMeAndTriggerNextSteps(
      "Review and Approve Legal rep Order - ",
      "Review and Approve Legal rep Order",
      "judge",
    );

    await editAndApproveAnOrders.editAndApproveAnOrder2Page.assertPageContents(
      orderType,
      "solicitor",
    );
    await editAndApproveAnOrders.editAndApproveAnOrder2Page.verifyAccessibility();
    await editAndApproveAnOrders.editAndApproveAnOrder2Page.selectOrderCheckOptions(
      editOrderAction,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder2Page.clickContinue();

    await editAndApproveAnOrders.editAndApproveAnOrder5Page.assertPageContents(
      "FL401",
      orderType,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder5Page.verifyAccessibility();
    await editAndApproveAnOrders.editAndApproveAnOrder5Page.assertPartiesAndRepresentation(
      "",
    );
    await editAndApproveAnOrders.editAndApproveAnOrder5Page.fillPartiesAndRepresentation(
      enteredParties,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder5Page.clickContinue();

    await manageOrders.manageOrder6Page.assertPageContents(
      false,
      orderType,
      "Edit and approve a draft order",
    );
    await manageOrders.manageOrder6Page.clickContinue();

    const judgeOrderDetails = new DraftAnOrder6Page(judge.page);
    await judgeOrderDetails.assertPageContents(
      orderType,
      "Edit and approve a draft order",
    );
    await judgeOrderDetails.clickContinue();

    await expectPreviewAndContinue(judge.page);

    await editAndApproveAnOrders.editAndApproveAnOrder21Page.assertPageContents(
      orderType,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.fillInFields(true);
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.clickContinue();

    await editAndApproveAnOrders.editAndApproveAnOrder22Page.assertPageContents();
    await editAndApproveAnOrders.editAndApproveAnOrder22Page.selectIsUrgent(
      false,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder22Page.clickContinue();

    await editAndApproveAnOrders.editAndApproveAnOrderSubmitPage.assertPageContents();
    await editAndApproveAnOrders.editAndApproveAnOrderSubmitPage.assertPartiesAndRepresentation(
      enteredParties,
    );
    await editAndApproveAnOrders.editAndApproveAnOrderSubmitPage.changePartiesAndRepresentation(
      enteredParties,
      amendedParties,
    );
    await editAndApproveAnOrders.editAndApproveAnOrderSubmitPage.clickSubmit();

    await editAndApproveAnOrders.editAndApproveAnOrderConfirmPage.assertPageContents(
      editOrderAction,
    );
    await editAndApproveAnOrders.editAndApproveAnOrderConfirmPage.clickCloseAndReturnToCaseDetails();
    await summaryPage.alertBanner.assertEventAlert(
      caseRef,
      "Edit and approve a draft order",
    );

    await navigationUtils.goToCase(
      caseWorker.page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );

    const {
      tasksPage: adminTasks,
      adminEditAndApproveAnOrders,
      summaryPage: adminSummary,
      manageOrders: adminManageOrders,
    } = caseWorker;
    await adminTasks.assignTaskToMeAndTriggerNextSteps(
      "Complete the Order - ",
      "Complete the Order",
      "caseWorker",
    );

    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder1Page.assertPageContents();
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder1Page.selectOrder();
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder1Page.clickContinue();

    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder4Page.assertPageContents(
      orderType,
    );
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder4Page.editOrder(
      true,
    );
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder4Page.clickContinue();

    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder5Page.assertPageContents(
      "FL401",
      orderType,
    );
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder5Page.verifyAccessibility();
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder5Page.assertPartiesAndRepresentation(
      amendedParties,
    );
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder5Page.fillPartiesAndRepresentation(
      servedParties,
    );
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder5Page.clickContinue();

    await adminManageOrders.manageOrder6Page.assertPageContents(
      false,
      orderType,
      "Edit and serve an order",
    );
    await adminManageOrders.manageOrder6Page.clickContinue();

    const adminOrderDetails = new DraftAnOrder6Page(caseWorker.page);
    await adminOrderDetails.assertPageContents(
      orderType,
      "Edit and serve an order",
    );
    await adminOrderDetails.clickContinue();

    await expectPreviewAndContinue(caseWorker.page);

    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder21Page.assertPageContents(
      "FL401",
    );
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder21Page.selectServeOrderOptions(
      "FL401",
      "General",
      false,
      false,
      false,
      true,
    );
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder21Page.clickContinue();

    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder22Page.assertPageContents();
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder22Page.clickContinue();

    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder23Page.assertPageContents(
      "FL401",
    );
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder23Page.serveOrderDetails(
      "FL401",
      false,
      "",
      ["John Smith", "Elise Lynn"],
      false,
    );
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder23Page.clickContinue();

    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrderSubmitPage.assertPageContents();
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrderSubmitPage.assertPartiesAndRepresentation(
      servedParties,
    );
    await adminEditAndApproveAnOrders.adminEditAndApproveAnOrderSubmitPage.clickSubmit();
    await adminSummary.alertBanner.assertEventAlert(
      caseRef,
      "Edit and serve an order",
    );
  });
});

async function expectPreviewAndContinue(page: Page): Promise<void> {
  await expect(
    page.getByRole("heading", { name: "Preview the order" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
}
