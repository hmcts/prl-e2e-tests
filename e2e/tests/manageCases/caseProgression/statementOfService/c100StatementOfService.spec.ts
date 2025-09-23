import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { StatementOfService } from "../../../../journeys/manageCases/caseProgression/statementOfService/statementOfService.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Statement of Service event for CA Solicitor case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseSendToGatekeeper(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Complete Task - statement of Service - Child arrangements, specific issue or prohibited steps order (C43) without accessibility test. @nightly @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await StatementOfService.C100StatementOfService({
      page: page,
      accessibilityTest: false,
      browser: browser,
      ccdRef: ccdRef,
      manageOrderData: jsonDatas.manageOrderDataC43CreateOrder,
      applicationSubmittedBy: "Solicitor",
    });
  });

  test("Complete Task - statement of Service - Child arrangements, specific issue or prohibited steps order (C43) with accessibility test. @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await StatementOfService.C100StatementOfService({
      page: page,
      accessibilityTest: true,
      browser: browser,
      ccdRef: ccdRef,
      manageOrderData: jsonDatas.manageOrderDataC43CreateOrder,
      applicationSubmittedBy: "Solicitor",
    });
  });
});
