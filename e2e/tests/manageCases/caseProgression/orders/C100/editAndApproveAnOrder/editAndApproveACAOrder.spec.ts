import { test } from "../../../../../fixtures.ts";
import config from "../../../../../../utils/config.utils.js";
import { OrderTypes } from "../../../../../../common/types.js";
import { JudgePagesGroup } from "../../../../../../pageObjects/roleBasedGroupedPages/judgePages.js";

test.describe("Edit and approve a CA order tests", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ judge, navigationUtils, manageCasesEventUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await manageCasesEventUtils.createSolicitorDraftOrder(
      caseRef,
      "Parental responsibility order (C45A)",
    );
    await navigationUtils.goToCase(
      judge.page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });
  [
    {
      judeOrderAction: "Give admin further directions then serve",
      orderType: "Parental responsibility order (C45A)",
      serveApplication: true,
      status: "Reviewed by Judge",
      snapshotName:
        "C45A-judge-review-approve-order-giveAdmin-furtherDirections-ThenServe",
      snapshotPath: ["caseProgression", "orders", "editAndApproveAnOrders"],
    },
  ].forEach((data) => {
    test(`Complete Editing and approving an C100 solicitor drafted order as a judge with the following option : ${data.judeOrderAction} @nightly @regression @accessibility`, async ({
      judge,
    }): Promise<void> => {
      await editAndApproveOrder(caseRef, judge, data);
    });
  });
  [
    {
      judeOrderAction: "Send to admin to serve",
      orderType: "Parental responsibility order (C45A)",
      serveApplication: true,
      status: "Reviewed by Judge",
      snapshotName: "C45A-judge-review-approve-order-sendAdmin-Serve",
      snapshotPath: ["caseProgression", "orders", "editAndApproveAnOrders"],
    },
  ].forEach((data) => {
    test(`Complete Editing and approving an C100 solicitor drafted order as a judge with the following option : ${data.judeOrderAction} @regression @accessibility`, async ({
      judge,
    }): Promise<void> => {
      await editAndApproveOrder(caseRef, judge, data);
    });
  });
  [
    {
      judeOrderAction: "Ask the legal representative to make changes",
      orderType: "Parental responsibility order (C45A)",
      serveApplication: true,
      status: "Rejected by Judge",
      snapshotName: "C45A-judge-review-approve-order-askLegalRep-Changes",
      snapshotPath: ["caseProgression", "orders", "editAndApproveAnOrders"],
    },
  ].forEach((data) => {
    test(`Complete Editing and approving an C100 solicitor drafted order as a judge with the following option : ${data.judeOrderAction} @regression @accessibility`, async ({
      judge,
    }): Promise<void> => {
      await editAndApproveOrder(caseRef, judge, data);
    });
  });
});

async function editAndApproveOrder(caseRef, judge: JudgePagesGroup, data) {
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

  if (data.judeOrderAction == "Give admin further directions then serve") {
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.assertPageContents(
      data.orderType as OrderTypes,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.verifyAccessibility();
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.fillInFields(
      data.serveApplication,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.clickContinue();
  }

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

  // check draft order
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
}
