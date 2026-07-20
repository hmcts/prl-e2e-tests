import Config from "../../../../../../utils/config.utils.ts";
import config from "../../../../../../utils/config.utils.ts";
import { EditAndApproveAnOrder } from "../../../../../../journeys/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder.ts";
import { test } from "../../../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "judge.json" });

test.describe("Judge Edit and approve a solicitor created DA case order tests", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await manageCasesEventUtils.createSolicitorDraftOrder(
      caseRef,
      "Non-molestation order (FL404A)",
    );
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test(`Complete Editing and approving an order with the following options:
  Case: FL401,
  Order type: Non-molestation order (FL404A),
  Judge order action: Send to admin to serve,
  Error message testing,
  Not accessibility testing. @regression`, async ({ page }): Promise<void> => {
    await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: page,
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
  Not accessibility testing. @regression`, async ({ page }): Promise<void> => {
    await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: page,
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
  Accessibility testing. @nightly @accessibility`, async ({
    page,
  }): Promise<void> => {
    await EditAndApproveAnOrder.editAndApproveAnOrder({
      page: page,
      orderType: "nonMolestation",
      judeOrderAction: "Give admin further directions then serve",
      errorMessaging: false,
      accessibilityTest: true,
    });
  });
});
