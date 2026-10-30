import config from "./config.utils.ts";
import { OrderTypes } from "../common/types.ts";
import { JudgePagesGroup } from "../pageObjects/roleBasedGroupedPages/judgePages.ts";
import { CaseWorkerPagesGroup } from "../pageObjects/roleBasedGroupedPages/caseWorkerPages.ts";
import { NavigationUtils } from "./navigation.utils.ts";

export type EditAndApproveOrderData = {
  judeOrderAction: string;
  orderType: string;
  serveApplication: boolean;
  status: string;
  isUrgent: boolean;
  snapshotName: string;
  snapshotPath: string[];
};

export async function editAndApproveOrder(
  caseRef: string,
  judge: JudgePagesGroup,
  caseWorker: CaseWorkerPagesGroup,
  data: EditAndApproveOrderData,
  navigationUtils: NavigationUtils,
): Promise<void> {
  const { tasksPage, summaryPage, editAndApproveAnOrders, draftedOrders } =
    judge;

  await tasksPage.assignTaskToMeAndTriggerNextSteps(
    "Review and Approve Legal rep Order - ",
    "Review and Approve Legal rep Order",
    "judge",
  );

  await editAndApproveAnOrders.editAndApproveAnOrder2Page.assertPageContents(
    data.orderType as OrderTypes,
  );
  await editAndApproveAnOrders.editAndApproveAnOrder2Page.verifyAccessibility();
  await editAndApproveAnOrders.editAndApproveAnOrder2Page.selectOrderCheckOptions(
    data.judeOrderAction,
  );
  await editAndApproveAnOrders.editAndApproveAnOrder2Page.clickContinue();

  if (data.judeOrderAction === "Give admin further directions then serve") {
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.assertPageContents(
      data.orderType as OrderTypes,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.verifyAccessibility();
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.fillInFields(
      data.serveApplication,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.clickContinue();
  }

  await editAndApproveAnOrders.editAndApproveAnOrder22Page.assertPageContents();
  await editAndApproveAnOrders.editAndApproveAnOrder22Page.verifyAccessibility();
  await editAndApproveAnOrders.editAndApproveAnOrder22Page.selectIsUrgent(
    data.isUrgent,
  );
  await editAndApproveAnOrders.editAndApproveAnOrder22Page.clickContinue();

  await editAndApproveAnOrders.editAndApproveAnOrderSubmitPage.assertPageContents(
    data.snapshotPath,
    data.snapshotName,
  );
  await editAndApproveAnOrders.editAndApproveAnOrderSubmitPage.verifyAccessibility();
  await editAndApproveAnOrders.editAndApproveAnOrderSubmitPage.clickSubmit();

  await editAndApproveAnOrders.editAndApproveAnOrderConfirmPage.assertPageContents(
    data.judeOrderAction,
  );
  await editAndApproveAnOrders.editAndApproveAnOrderConfirmPage.verifyAccessibility();
  await editAndApproveAnOrders.editAndApproveAnOrderConfirmPage.clickCloseAndReturnToCaseDetails();

  await summaryPage.alertBanner.assertEventAlert(
    caseRef,
    "Edit and approve a draft order",
  );

  await draftedOrders.draftOrdersPage.goToPage();

  await draftedOrders.draftOrdersPage.assertDraftOrders([
    {
      typeOfOrder: data.orderType as OrderTypes,
      englishDocument: `${data.orderType
        .replace(/[(),]/g, "")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("_")}_draft.pdf`,
      otherDetails: {
        orderMadeBy: "Test Judge Name",
        orderCreatedBy:
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "PRL DEMO ORG1 Solicitor 2"
            : "AAT Solicitor",
        status: data.status,
      },
      childrenList: [
        "Joe Doe (Child 1)",
        "Simon Anderson (Child 2)",
        "Lilly Anderson (Child 3)",
        "Charlotte Saxon (Child 4)",
        "Selena Lees (Child 5)",
      ],
      isOrderAboutAllTheChildren: true,
    },
  ]);

  await draftedOrders.draftOrdersPage.assertDraftOrderDocument(
    data.snapshotPath,
    caseRef,
    `${data.orderType
      .replace(/[(),]/g, "")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("_")}_draft.pdf`,
    data.snapshotName,
  );

  if (data.isUrgent) {
    await navigationUtils.goToCase(
      caseWorker.page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );

    const { tasksPage } = caseWorker;

    await tasksPage.waitForTask("Complete the Order - " + data.orderType);
    await tasksPage.task.assertTaskSummary(
      "Complete the Order - " + data.orderType,
      "urgent",
      ["Assign to me"],
      "Unassigned",
    );
  }
}
