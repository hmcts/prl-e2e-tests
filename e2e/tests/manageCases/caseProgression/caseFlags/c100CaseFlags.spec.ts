import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CaseFlagsCA } from "../../../../journeys/manageCases/caseProgression/caseFlags/caseFlagsCA.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });
test.slow();
// TEST COMMENT
test.describe("Case flags tests for CA case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
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
    await CaseFlagsCA.caseFlagsCA({
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
    await CaseFlagsCA.caseFlagsCA({
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
    await CaseFlagsCA.caseFlagsCA({
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
    await CaseFlagsCA.caseFlagsCA({
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
