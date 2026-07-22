import Config from "../../../../../../utils/config.utils.ts";
import config from "../../../../../../utils/config.utils.ts";
import { EditAndApproveAnOrder } from "../../../../../../journeys/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder.ts";
import { test } from "../../../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "judge.json" });

test.describe("Edit and approve a CA order tests", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await manageCasesEventUtils.createSolicitorDraftOrder(
      caseRef,
      "Parental responsibility order (C45A)",
    );
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test(`Complete Editing and approving an order with the following options:
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
    });
  });

  test(`Complete Editing and approving an order with the following options:
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
    });
  });
});
