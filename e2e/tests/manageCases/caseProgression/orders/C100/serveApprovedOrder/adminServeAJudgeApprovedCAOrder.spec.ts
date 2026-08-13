import Config from "../../../../../../utils/config.utils.ts";
import { test } from "../../../../../fixtures.ts";
import { JudgePagesGroup } from "../../../../../../pageObjects/roleBasedGroupedPages/judgePages.js";
import { OrderTypes } from "../../../../../../common/types.js";

test.describe("As a Court admin, serve a judge approved - solicitor drafted CA case order tests", (): void => {
  test.slow();

  let caseRef: string;
  const orderType = "Parental responsibility order (C45A)";

  test.beforeEach(async ({ judge, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await manageCasesEventUtils.createSolicitorDraftOrder(
      caseRef,
      orderType as OrderTypes,
    );
    await navigationUtils.goToCase(
      judge.page,
      Config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );

    const judgeData = {
      judeOrderAction: "Send to admin to serve",
      orderType: orderType,
      serveApplication: true,
      status: "Reviewed by Judge",
      snapshotName: "C45A-judge-review-approve-order-sendAdmin-Serve",
      snapshotPath: ["caseProgression", "orders", "editAndApproveAnOrders"],
    };

    await editAndApproveOrder(caseRef, judge, judgeData);
  });
  [
    {
      wantToEditOrder: false,
      serveOrderType: "General",
      cafcassReport: false,
      cafcassInvolvement: false,
      localAuthorityReport: false,
      serveOrderNow: true,
      personallyServed: true,
      responsibleToServeRespondent: "Court bailiff",
      recipientsToServe: undefined,
      serveCafcass: false,
      recipients: ["Legal Solicitor (Applicant's legal representative)"],
      snapshotName: "C45A-admin-personally-serve-approved-order",
      snapshotPath: ["caseProgression", "orders", "serveApprovedOrders"],
    },
  ].forEach((data) => {
    test(`Admin serves a judge approved C100 order that is personally served as : ${data.personallyServed} to respondent by : ${data.responsibleToServeRespondent} @regression @accessibility`, async ({
      caseWorker,
      navigationUtils,
    }): Promise<void> => {
      await editAndServeOrder(caseRef, caseWorker, data, navigationUtils);
    });
  });

  [
    {
      wantToEditOrder: false,
      serveOrderType: "General",
      cafcassReport: false,
      cafcassInvolvement: false,
      localAuthorityReport: false,
      serveOrderNow: true,
      personallyServed: false,
      responsibleToServeRespondent: undefined,
      recipientsToServe: [
        "John Doe (Applicant 1)",
        "Jeremy Anderson (Applicant 2)",
      ],
      serveCafcass: false,
      recipients: ["John Doe", "Jeremy Anderson"],
      snapshotName: "C45A-admin-serve-approved-order",
      snapshotPath: ["caseProgression", "orders", "serveApprovedOrders"],
    },
  ].forEach((data) => {
    test(`Admin serve an judge approved C100 order that is personally served as : ${data.personallyServed} to : ${data.recipientsToServe} @nightly @regression @accessibility`, async ({
      caseWorker,
      navigationUtils,
    }): Promise<void> => {
      await editAndServeOrder(caseRef, caseWorker, data, navigationUtils);
    });
  });
});

async function editAndServeOrder(caseRef, caseWorker, data, navigationUtils) {
  const { tasksPage, adminEditAndApproveAnOrders, summaryPage, Orders } =
    caseWorker;

  await navigationUtils.goToCase(
    caseWorker.page,
    Config.manageCasesBaseURLCase,
    caseRef,
    "tasks",
  );

  await tasksPage.assignTaskToMeAndTriggerNextSteps(
    "Complete the Order - ",
    "Complete the Order",
    "caseWorker",
  );

  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder1Page.assertPageContents();
  //await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder1Page.verifyAccessibility();
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder1Page.selectOrder();
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder1Page.clickContinue();

  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder4Page.assertPageContents(
    "Parental responsibility order (C45A)",
  );
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder4Page.verifyAccessibility();
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder4Page.editOrder(
    data.wantToEditOrder,
  );
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder4Page.clickContinue();

  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder21Page.assertPageContents(
    "C100",
  );
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder21Page.verifyAccessibility();
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder21Page.selectServeOrderOptions(
    "C100",
    data.serveOrderType,
    data.cafcassReport,
    data.cafcassInvolvement,
    data.localAuthorityReport,
    data.serveOrderNow,
  );
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder21Page.clickContinue();

  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder22Page.assertPageContents();
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder22Page.verifyAccessibility();
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder22Page.clickContinue();

  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder23Page.assertPageContents(
    "C100",
  );
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder23Page.verifyAccessibility();
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder23Page.serveOrderDetails(
    "C100",
    data.personallyServed,
    data.responsibleToServeRespondent,
    data.recipientsToServe,
    data.serveCafcass,
  );
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrder23Page.clickContinue();

  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrderSubmitPage.assertPageContents(
    data.snapshotPath,
    data.snapshotName,
  );
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrderSubmitPage.verifyAccessibility();
  await adminEditAndApproveAnOrders.adminEditAndApproveAnOrderSubmitPage.clickSubmit();
  await summaryPage.alertBanner.assertEventAlert(
    caseRef,
    "Edit and serve an order",
  );

  // check the served orders tab as court admin
  await Orders.OrdersPage.goToPage();
  await Orders.OrdersPage.assertOrders([
    {
      Order: data.serveOrderType,
      typeOfOrder: data.orderType,
      welshDocument: "Welsh_Parental_Responsibility_Order_C45A.pdf",
      childrenList: [
        "Joe Doe (Child 1)",
        "Simon Anderson (Child 2)",
        "Lilly Anderson (Child 3)",
        "Charlotte Saxon (Child 4)",
        "Selena Lees (Child 5)",
      ],
      isOrderAboutAllTheChildren: true,
      englishDocument: "Parental_Responsibility_Order_C45A.pdf",
      otherDetails: {
        orderMadeBy: "Test Judge Name",
        orderCreatedBy:
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "PRL DEMO ORG1 Solicitor 2"
            : "AAT Solicitor",
      },
      serveOrderDetails: {
        recipients: data.recipients,
        serveCafcass: false,
        responsibleToServe: data.responsibleToServeRespondent,
      },
    },
  ]);
  await Orders.OrdersPage.assertOrderDocument(
    data.snapshotPath,
    caseRef,
    "Welsh_Parental_Responsibility_Order_C45A.pdf",
    data.snapshotName + "-welsh",
  );
  await Orders.OrdersPage.assertOrderDocument(
    data.snapshotPath,
    caseRef,
    "Parental_Responsibility_Order_C45A.pdf",
    data.snapshotName + "-english",
  );
}

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
