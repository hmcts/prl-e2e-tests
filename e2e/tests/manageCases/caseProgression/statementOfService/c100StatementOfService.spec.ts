import { test } from "../../../fixtures";
import config from "../../../../utils/config.utils";
import { Helpers } from "../../../../common/helpers";
import { StatementOfService } from "../../../../journeys/manageCases/caseProgression/statementOfService/statementOfService";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas";

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

  test("Complete Task - statement of Service - Child arrangements, specific issue or prohibited steps order (C43) with accessibility test. @nightly @regression @accessibility", async ({
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
