import config from "../../../../../../utils/config.utils.ts";
import { expect, test } from "../../../../../fixtures.ts";
import { OrderTypes } from "../../../../../../common/types.js";
import { JudgePagesGroup } from "../../../../../../pageObjects/roleBasedGroupedPages/judgePages.js";
import { DraftAnOrder6Page } from "../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder6.po.js";
import { defaultPartiesAndRepresentation } from "../../../../../../pageObjects/components/exui/orders/orderDetails.component.js";

test.describe("Edit and approve a DA order tests", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ judge, navigationUtils, manageCasesEventUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await manageCasesEventUtils.createSolicitorDraftOrder(
      caseRef,
      "Non-molestation order (FL404A)",
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
      orderType: "Non-molestation order (FL404A)",
      serveApplication: true,
      status: "Reviewed by Judge",
      snapshotName:
        "FL404A-judge-review-approve-order-giveAdmin-furtherDirections-ThenServe",
      snapshotPath: ["caseProgression", "orders", "editAndApproveAnOrders"],
    },
  ].forEach((data) => {
    test(`Complete Editing and approving an FL401 solicitor drafted order as a judge with the following option : ${data.judeOrderAction} @nightly @regression @accessibility`, async ({
      judge,
    }): Promise<void> => {
      await editAndApproveOrder(caseRef, judge, data);
    });
  });

  [
    {
      judeOrderAction: "Send to admin to serve",
      orderType: "Non-molestation order (FL404A)",
      serveApplication: true,
      status: "Reviewed by Judge",
      snapshotName: "FL404A-judge-review-approve-order-sendAdmin-Serve",
      snapshotPath: ["caseProgression", "orders", "editAndApproveAnOrders"],
    },
  ].forEach((data) => {
    test(`Complete Editing and approving an FL401 solicitor drafted order as a judge with the following option : ${data.judeOrderAction} @regression @accessibility`, async ({
      judge,
    }): Promise<void> => {
      await editAndApproveOrder(caseRef, judge, data);
    });
  });

  [
    {
      judeOrderAction: "Ask the legal representative to make changes",
      orderType: "Non-molestation order (FL404A)",
      serveApplication: true,
      status: "Rejected by Judge",
      snapshotName: "FL404A-judge-review-approve-order-askLegalRep-Changes",
      snapshotPath: ["caseProgression", "orders", "editAndApproveAnOrders"],
    },
  ].forEach((data) => {
    test(`Complete Editing and approving an FL401 solicitor drafted order as a judge with the following option : ${data.judeOrderAction} @regression @accessibility`, async ({
      judge,
    }): Promise<void> => {
      await editAndApproveOrder(caseRef, judge, data);
    });
  });

  [
    {
      judeOrderAction: "Edit the order myself and send to admin to serve",
      orderType: "Non-molestation order (FL404A)",
      serveApplication: true,
      status: "Reviewed by Judge",
      snapshotName: "FL404A-judge-review-approve-order-editTheOrderAndServe",
      snapshotPath: ["caseProgression", "orders", "editAndApproveAnOrders"],
    },
  ].forEach((data) => {
    test(`Complete Editing and approving an FL401 solicitor drafted order as a judge with the following option : ${data.judeOrderAction} @regression @accessibility`, async ({
      judge,
    }): Promise<void> => {
      await editAndApproveOrder(caseRef, judge, data);
    });
  });
});

async function editAndApproveOrder(caseRef, judge: JudgePagesGroup, data) {
  const {
    tasksPage,
    summaryPage,
    editAndApproveAnOrders,
    draftedOrders,
    manageOrders,
  } = judge;
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

  if (
    data.judeOrderAction == "Edit the order myself and send to admin to serve"
  ) {
    await editAndApproveAnOrders.editAndApproveAnOrder5Page.assertPageContents(
      "FL401",
      data.orderType as OrderTypes,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder5Page.verifyAccessibility();
    await editAndApproveAnOrders.editAndApproveAnOrder5Page.fillPartiesAndRepresentation(
      defaultPartiesAndRepresentation,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder5Page.clickContinue();

    await manageOrders.manageOrder6Page.assertPageContents(
      false,
      data.orderType as OrderTypes,
      "Edit and approve a draft order",
    );
    await manageOrders.manageOrder6Page.clickContinue();

    const orderDetails = new DraftAnOrder6Page(judge.page);
    await orderDetails.assertPageContents(
      data.orderType as OrderTypes,
      "Edit and approve a draft order",
    );
    await orderDetails.clickContinue();

    await expect(
      judge.page.getByRole("heading", {
        name: "Creating a hearing is optional",
      }),
    ).toBeVisible();
    await judge.page.getByRole("button", { name: "Continue" }).click();

    await expect(
      judge.page.getByRole("heading", { name: "Preview the order" }),
    ).toBeVisible();
    await judge.page.getByRole("button", { name: "Continue" }).click();

    await editAndApproveAnOrders.editAndApproveAnOrder21Page.assertPageContents(
      data.orderType as OrderTypes,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.fillInFields(
      data.serveApplication,
    );
    await editAndApproveAnOrders.editAndApproveAnOrder21Page.clickContinue();
  }

  await editAndApproveAnOrders.editAndApproveAnOrder22Page.assertPageContents();
  await editAndApproveAnOrders.editAndApproveAnOrder22Page.verifyAccessibility();
  await editAndApproveAnOrders.editAndApproveAnOrder22Page.selectIsUrgent(
    false,
  );
  await editAndApproveAnOrders.editAndApproveAnOrder22Page.clickContinue();

  if (
    data.judeOrderAction == "Edit the order myself and send to admin to serve"
  ) {
    await editAndApproveAnOrders.editAndApproveAnOrderSubmitPage.assertPartiesAndRepresentation(
      defaultPartiesAndRepresentation,
    );
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
        .replace(/-/g, "_")
        .replace(/\s+/g, "_")
        .toLowerCase()}_draft.pdf`,
      otherDetails: {
        orderMadeBy: "Test Judge Name",
        orderCreatedBy:
          process.env.MANAGE_CASES_TEST_ENV === "demo"
            ? "PRL DEMO ORG1 Solicitor 2"
            : "AAT Solicitor",
        status: data.status,
      },
      isOrderAboutChildren: false,
    },
  ]);
  if (
    data.judeOrderAction != "Edit the order myself and send to admin to serve"
  ) {
    await draftedOrders.draftOrdersPage.assertDraftOrderDocument(
      data.snapshotPath,
      caseRef,
      `${data.orderType
        .replace(/[(),]/g, "")
        .replace(/-/g, "_")
        .replace(/\s+/g, "_")
        .toLowerCase()}_draft.pdf`,
      data.snapshotName,
    );
  }
}
