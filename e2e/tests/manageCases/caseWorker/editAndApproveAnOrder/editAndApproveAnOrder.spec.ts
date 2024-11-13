import { test } from "@playwright/test";
import Config from "../../../../config";
import { EditAndApproveAnOrder } from "../../../../journeys/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Edit and approve a DA order tests @manageCases", (): void => {
  // Triple timeout for these slow tests
  test.slow();
  
  test(`Complete Editing and approving an order with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Send to admin to serve,
  Error message testing,
  Not accessibility testing. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: page,
      caseType: "FL401",
      orderType: "nonMolestation",
      judeOrderAction: "Send to admin to serve",
      errorMessaging: true,
      accessibilityTest: false,
    });
  });

  test(`Complete Editing and approving an order with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Ask the legal representative to make changes,
  Not error message testing,
  Not accessibility testing. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: page,
      caseType: "FL401",
      orderType: "nonMolestation",
      judeOrderAction: "Ask the legal representative to make changes",
      errorMessaging: false,
      accessibilityTest: false,
    });
  });

  test(`Complete Editing and approving an order with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Give admin further directions then serve,
  Not error message testing,
  Accessibility testing. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: page,
      caseType: "FL401",
      orderType: "nonMolestation",
      judeOrderAction: "Give admin further directions then serve",
      errorMessaging: false,
      accessibilityTest: true,
    });
  });
});
