import { test } from "@playwright/test";
import Config from "../../../../config";
import { EditAndApproveAnOrder } from "../../../../journeys/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Edit and approve a CA order tests", (): void => {
  // Triple timeout for these slow tests
  test.slow();
  // tests failing due to EXUI-2621
  // TODO: turn tests back on once issue around "Client context information not matching" has been resolved
  test.fixme(
    `Complete Editing and approving an order with the following options:
  Case: C100,
  Order type: Parental responsibility order (C45A),
  Judge order action: Send to admin to serve,
  Not accessibility testing. @regression`,
    async ({ page, browser }): Promise<void> => {
      await EditAndApproveAnOrder.editAndApproveAnOrder({
        page: page,
        caseType: "C100",
        orderType: "parentalResponsibility",
        judeOrderAction: "Send to admin to serve",
        errorMessaging: false,
        accessibilityTest: false,
        browser: browser,
      });
    },
  );

  test.fixme(
    `Complete Editing and approving an order with the following options:
  Case: C100,
  Order type: Parental responsibility order (C45A),
  Judge order action: Ask the legal representative to make changes,
  Not accessibility testing. @regression`,
    async ({ page, browser }): Promise<void> => {
      await EditAndApproveAnOrder.editAndApproveAnOrder({
        page: page,
        caseType: "C100",
        orderType: "parentalResponsibility",
        judeOrderAction: "Ask the legal representative to make changes",
        errorMessaging: false,
        accessibilityTest: false,
        browser: browser,
      });
    },
  );

  test.fixme(
    `Complete Editing and approving an order with the following options:
  Case: C100,
  Order type: Parental responsibility order (C45A),
  Judge order action: Give admin further directions then serve,
  Accessibility testing. @accessibility @nightly`,
    async ({ page, browser }): Promise<void> => {
      await EditAndApproveAnOrder.editAndApproveAnOrder({
        page: page,
        caseType: "C100",
        orderType: "parentalResponsibility",
        judeOrderAction: "Give admin further directions then serve",
        errorMessaging: false,
        accessibilityTest: true,
        browser: browser,
      });
    },
  );
});
