import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { StatementOfService } from "../../../../journeys/manageCases/caseProgression/statementOfService/statementOfService.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });
// TEST COMMENT

test.describe("Statement of Service event for DA Solicitor case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Complete Task - statement of Service - Power of arrest (FL406) without accessibility test. @nightly @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await StatementOfService.FL401statementOfService({
      page: page,
      accessibilityTest: false,
      ccdRef: ccdRef,
      browser: browser,
      manageOrderData: jsonDatas.manageOrderDataPowerOfArrest,
      createOrderFL401Options: "power of arrest",
      applicationSubmittedBy: "Solicitor",
    });
  });

  test("Complete Task - statement of Service - Amended, discharged or varied order (FL404B)  with accessibility test. @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await StatementOfService.FL401statementOfService({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      browser: browser,
      manageOrderData: jsonDatas.manageOrderDataAmendDischargedVaried,
      createOrderFL401Options: "amend discharge varied order",
      applicationSubmittedBy: "Solicitor",
    });
  });
});
