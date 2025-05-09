import { test } from "@playwright/test";
import Config from "../../../../config";
import config from "../../../../config";
import { Helpers } from "../../../../common/helpers";
import { CaseFlags } from "../../../../journeys/manageCases/caseProgression/caseFlags/caseFlags.ts";
import { SolicitorCACaseCreator } from "../../../../common/caseHelpers/solicitorCACaseCreator.ts";
import {
  jsonDatas,
  submitEvent,
} from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });
test.slow();

test.describe("Case flags tests for CA case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser }) => {
    await page.goto(Config.manageCasesBaseURLCase);
    ccdRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(page);
    const ctscPage = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(
      ctscPage,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await submitEvent(
      ctscPage,
      ccdRef,
      "issueAndSendToLocalCourtCallback",
      jsonDatas.solicitorCACaseData,
    );
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Case flags - request support - reasonable adjustments - court admin approved - with translation. @nightly @accessibility @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CaseFlags.caseFlags({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      caseType: "C100",
      supportType: "reasonableAdjustment",
      isApproved: true,
      withTranslation: true,
      accessibilityTest: true,
    });
  });

  test("Case flags - request support - language interpreter - court admin not approved - with translation. @nightly @accessibility @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CaseFlags.caseFlags({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      caseType: "C100",
      supportType: "languageInterpreter",
      isApproved: false,
      withTranslation: true,
      accessibilityTest: true,
    });
  });

  test("Case flags - request support - reasonable adjustments - court admin not approved - without translation. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CaseFlags.caseFlags({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      caseType: "C100",
      supportType: "reasonableAdjustment",
      isApproved: false,
      withTranslation: false,
      accessibilityTest: false,
    });
  });

  test("Case flags - request support - language interpreter - court admin approved - without translation. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CaseFlags.caseFlags({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      caseType: "C100",
      supportType: "languageInterpreter",
      isApproved: true,
      withTranslation: false,
      accessibilityTest: false,
    });
  });
});
