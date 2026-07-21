//import config from "../../../../../../utils/config.utils.js";
//import { EditAndApproveAnOrder } from "../../../../../../journeys/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder.ts";
//import { Helpers } from "../../../../../../common/helpers.ts";
import { test } from "../../../../../fixtures.ts";
import Config from "../../../../../../utils/config.utils.js";
import config from "../../../../../../utils/config.utils.js";

test.describe("Edit and approve a CA order tests", (): void => {
  // Triple timeout for these slow tests
  //test.slow();
  let caseNumber: string;

  test.beforeEach(
    async ({ solicitor, browser, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        solicitor.page,
        Config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  [
    {
      judeOrderAction: "Give admin further directions then serve",
      snapshotName: "",
    },
  ].forEach((data) => {
    test(`Complete Editing and approving an C100 order with the following option : ${data.judeOrderAction} @nightly @regression @accessibility`, async ({
      judge,
      navigationUtils,
    }): Promise<void> => {
      const { page, summaryPage, editAndApproveAnOrders } = judge;
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
      await summaryPage.chooseEventFromDropdown(
        "Edit and approve a draft order",
      );

      await editAndApproveAnOrders.editAndApproveAnOrder2Page.assertPageContents();
      await editAndApproveAnOrders.editAndApproveAnOrder2Page.verifyAccessibility();
      await editAndApproveAnOrders.editAndApproveAnOrder2Page.selectOrderCheckOptions(data.judeOrderAction);
      await editAndApproveAnOrders.editAndApproveAnOrder2Page.clickContinue();

      await editAndApproveAnOrders.editAndApproveAnOrder21Page.assertPageContents();

    });
  });

  /*test(`Complete Editing and approving an order with the following options:
  Case: C100,
  Order type: Parental responsibility order (C45A),
  Judge order action: Send to admin to serve,
  Not accessibility testing. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: page,
      caseType: "C100",
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
  Not accessibility testing. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: page,
      caseType: "C100",
      orderType: "parentalResponsibility",
      judeOrderAction: "Ask the legal representative to make changes",
      errorMessaging: false,
      accessibilityTest: false,
      browser: browser,
      caseRef: caseNumber,
    });
  });

  test(`Complete Editing and approving an order with the following options:
  Case: C100,
  Order type: Parental responsibility order (C45A),
  Judge order action: Give admin further directions then serve,
  Accessibility testing. @accessibility @nightly`, async ({
    page,
    browser,
  }): Promise<void> => {
    await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: page,
      caseType: "C100",
      orderType: "parentalResponsibility",
      judeOrderAction: "Give admin further directions then serve",
      errorMessaging: false,
      accessibilityTest: true,
      browser: browser,
      caseRef: caseNumber,
    });
  });*/
});
