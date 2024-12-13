import { test } from "@playwright/test";
import Config from "../../../../config";
import { EditAndApproveAnOrder } from "../../../../journeys/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Edit and approve a DA order tests", (): void => {
  // tests failing due to EXUI-2621
  // TODO: turn tests back on once issue around "Client context information not matching" has been resolved
  test(
    `Complete Editing and approving an order with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Send to admin to serve,
  Error message testing,
  Not accessibility testing. @regression`,
    async ({ page, browser }): Promise<void> => {
      await EditAndApproveAnOrder.editAndApproveAnOrder({
        page: page,
        caseType: "FL401",
        orderType: "nonMolestation",
        judeOrderAction: "Send to admin to serve",
        errorMessaging: true,
        accessibilityTest: false,
        browser: browser,
      });
    },
  );

  test(
    `Complete Editing and approving an order with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Ask the legal representative to make changes,
  Not error message testing,
  Not accessibility testing. @regression`,
    async ({ page, browser }): Promise<void> => {
      await EditAndApproveAnOrder.editAndApproveAnOrder({
        page: page,
        caseType: "FL401",
        orderType: "nonMolestation",
        judeOrderAction: "Ask the legal representative to make changes",
        errorMessaging: false,
        accessibilityTest: false,
        browser: browser,
      });
    },
  );

  test(
    `Complete Editing and approving an order with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Give admin further directions then serve,
  Not error message testing,
  Accessibility testing. @nightly @accessibility`,
    async ({ page, browser }): Promise<void> => {
      await EditAndApproveAnOrder.editAndApproveAnOrder({
        page: page,
        caseType: "FL401",
        orderType: "nonMolestation",
        judeOrderAction: "Give admin further directions then serve",
        errorMessaging: false,
        accessibilityTest: true,
        browser: browser,
      });
    },
  );
});