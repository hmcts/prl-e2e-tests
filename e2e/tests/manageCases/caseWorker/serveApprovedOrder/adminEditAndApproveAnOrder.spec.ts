import { test } from "@playwright/test";
import Config from "../../../../config";
import { AdminEditAndApproveAnOrder } from "../../../../journeys/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Serve approved DA order tests @manageCases", (): void => {
  test(`Complete serve an order with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Send to admin to serve,
  Error message testing,
  Not accessibility testing. @crossbrowserManageCases`, async ({
                                                                         page,
                                                                         browser,
                                                                       }): Promise<void> => {
    await AdminEditAndApproveAnOrder.adminEditAndApproveAnOrder({
      page: page,
      caseType: "FL401",
      orderType: "nonMolestation",
      judeOrderAction: "Send to admin to serve",
      errorMessaging: true,
      accessibilityTest: false,
      browser: browser,
    });
  });
});
