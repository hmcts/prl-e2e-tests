import { test } from "@playwright/test";
import Config from "../../../../config";
import { EditAndApproveAnOrder } from "../../../../journeys/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Edit and approve a CA order tests @manageCases", (): void => {
  // Triple timeout for these slow tests
  test.slow();

  test(`Complete Editing and approving an order with the following options:
  Case: C100,
  Order type: Parental responsibility order (C45A),
  Judge order action: Send to admin to serve,
  Not accessibility testing. @crossbrowserManageCases`, async ({
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
    });
  });

  test(`Complete Editing and approving an order with the following options:
  Case: C100,
  Order type: Parental responsibility order (C45A),
  Judge order action: Ask the legal representative to make changes,
  Not accessibility testing. @crossbrowserManageCases`, async ({
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
    });
  });

  test(`Complete Editing and approving an order with the following options:
  Case: C100,
  Order type: Parental responsibility order (C45A),
  Judge order action: Give admin further directions then serve,
  Accessibility testing. @crossbrowserManageCases`, async ({
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
    });
  });
});
