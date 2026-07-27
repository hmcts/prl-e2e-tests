import { test } from "../../../../../fixtures.ts";
import config from "../../../../../../utils/config.utils.js";
import { OrderTypes } from "../../../../../../common/types.js";

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

    [
      {
        judeOrderAction: "Give admin further directions then serve",
        orderType: "Parental responsibility order (C45A)",
        serveApplication: true,
        snapshotName: "C45A-judge-review-approve-order-giveAdmin-furtherDirections-ThenServe",
      },
    ].forEach((data) => {
      test(`Complete Editing and approving an C100 order with the following option : ${data.judeOrderAction} @nightly @regression @accessibility`, async ({
        judge,
        }): Promise<void> => {

        const { tasksPage, summaryPage, editAndApproveAnOrders, draftedOrders } = judge;

        await tasksPage.assignTaskToMeAndTriggerNextSteps(
          "Review and Approve Legal rep Order - " + '${data.orderType}',
          "Review and Approve Legal rep Order",
          "judge",
        );

        await editAndApproveAnOrders.editAndApproveAnOrder2Page.assertPageContents(data.orderType as OrderTypes);
        await editAndApproveAnOrders.editAndApproveAnOrder2Page.verifyAccessibility();
        await editAndApproveAnOrders.editAndApproveAnOrder2Page.selectOrderCheckOptions(data.judeOrderAction);
        await editAndApproveAnOrders.editAndApproveAnOrder2Page.clickContinue();

        await editAndApproveAnOrders.editAndApproveAnOrder21Page.assertPageContents(data.orderType as OrderTypes);
        await editAndApproveAnOrders.editAndApproveAnOrder21Page.verifyAccessibility();
        await editAndApproveAnOrders.editAndApproveAnOrder21Page.fillInFields(data.serveApplication);
        await editAndApproveAnOrders.editAndApproveAnOrder21Page.clickContinue();

        await editAndApproveAnOrders.editAndApproveAnOrderSubmitPage.assertPageContents(
          ["caseProgression", "orders", "editAndApproveAnOrders"],
          data.snapshotName,
        );
        await editAndApproveAnOrders.editAndApproveAnOrderSubmitPage.verifyAccessibility();
        await editAndApproveAnOrders.editAndApproveAnOrderSubmitPage.clickSubmit();

        await editAndApproveAnOrders.editAndApproveAnOrderConfirmPage.assertPageContents();
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
            englishDocument: `${customOrderParams.orderType.replace(/[(),]/g, "")}_${caseRef}.docx`,
            otherDetails: {
              orderMadeBy: "Elizabeth Williams",
              orderCreatedBy: "Elizabeth Williams",
              status: "Reviewed by Judge",
            },
            isOrderAboutAllTheChildren:
            customOrderParams.page5Params.isOrderAboutAllTheChildren,
          },
        ]);
        await draftedOrders.draftOrdersPage.assertDraftOrderDocument(
          customOrderParams.snapshotsPath,
          caseRef,
          `${customOrderParams.orderType.replace(/[(),]/g, "")}_${caseRef}.docx`,
          customOrderParams.orderSnapshotName,
        );

      });
    });

    /*test(`Complete Editing and approving an order with the following options:
    Case: C100,
    Order type: Parental responsibility order (C45A),
    Judge order action: Send to admin to serve,
    Not accessibility testing. @regression`, async ({ page }): Promise<void> => {
      await EditAndApproveAnOrder.editAndApproveAnOrder({
        page: page,
        orderType: "parentalResponsibility",
        judeOrderAction: "Send to admin to serve",
        errorMessaging: false,
        accessibilityTest: false,
        browser: browser,
        caseRef: caseNumber,
      });
    });*/

    /*test(`Complete Editing and approving an order with the following options:
    Case: C100,
    Order type: Parental responsibility order (C45A),
    Judge order action: Ask the legal representative to make changes,
    Not accessibility testing. @regression`, async ({ page }): Promise<void> => {
      await EditAndApproveAnOrder.editAndApproveAnOrder({
        page: page,
        orderType: "parentalResponsibility",
        judeOrderAction: "Ask the legal representative to make changes",
        errorMessaging: false,
        accessibilityTest: false,
  <<<<<<< HEAD
        browser: browser,
        caseRef: caseNumber,
  =======
  >>>>>>> master
      });
    });

    test(`Complete Editing and approving an order with the following options:
    Case: C100,
    Order type: Parental responsibility order (C45A),
    Judge order action: Give admin further directions then serve,
    Accessibility testing. @accessibility @nightly`, async ({
      page,
    }): Promise<void> => {
      await EditAndApproveAnOrder.editAndApproveAnOrder({
        page: page,
        orderType: "parentalResponsibility",
        judeOrderAction: "Give admin further directions then serve",
        errorMessaging: false,
        accessibilityTest: true,
  <<<<<<< HEAD
        browser: browser,
        caseRef: caseNumber,
  =======
  >>>>>>> master
      });
    });*/
  });
  });