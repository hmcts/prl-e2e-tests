import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import { AdminEditAndApproveAnOrder } from "../../../../../journeys/manageCases/caseProgression/manageOrders/serveApprovedOrder/adminEditAndApproveAnOrder.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Serve approved DA order tests as a solicitor for solicitor DA case", (): void => {
  test.slow();
  test(`Complete serve an order that is personally served with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Send to admin to serve,
  Error message testing,
  Not accessibility testing. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await AdminEditAndApproveAnOrder.adminEditAndApproveAnOrder({
      page: page,
      accessibilityTest: false,
      browser: browser,
      personallyServed: true,
    });
  });

  test(`Complete serve an order that is not personally served with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Send to admin to serve,
  Error message testing,
  Not accessibility testing. @nightly @accessibility`, async ({
    page,
    browser,
  }): Promise<void> => {
    await AdminEditAndApproveAnOrder.adminEditAndApproveAnOrder({
      page: page,
      accessibilityTest: false,
      browser: browser,
      personallyServed: false,
    });
  });
});
