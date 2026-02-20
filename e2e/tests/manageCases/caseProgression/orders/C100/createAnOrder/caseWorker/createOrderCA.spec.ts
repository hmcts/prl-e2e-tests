import { test } from "../../../../../../fixtures.ts";
import Config from "../../../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../../../common/helpers.js";
import { C100ManageOrders } from "../../../../../../../journeys/manageCases/caseWorker/createAnOrder/C100OrderCA/c100ManageOrders.js";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Create an order tests", (): void => {
  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    const caseRef =
      await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      caseRef,
      "Summary",
    );
  });

  test(`Complete Creating an order as a Caseworker with the following options:
  Case: C100,
  Not accessibility testing. 
  @regression`, async ({ page }): Promise<void> => {
    await C100ManageOrders.c100ManageOrders({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "C100",
      isUploadOrder: false,
      checkOption: "managerCheck",
    });
  });
  test(`Complete Creating an order as a Caseworker with the following options:
  Case: C100,
  Accessibility testing: yes. 
  @nightly @accessibility`, async ({ page }): Promise<void> => {
    await C100ManageOrders.c100ManageOrders({
      page: page,
      accessibilityTest: true,
      solicitorCaseCreateType: "C100",
      isUploadOrder: false,
      checkOption: "managerCheck",
    });
  });
});
