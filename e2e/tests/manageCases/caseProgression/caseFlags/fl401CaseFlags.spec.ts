import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CaseFlagsDA } from "../../../../journeys/manageCases/caseProgression/caseFlags/caseFlagsDA.ts";
import { test } from "../../../fixtures.js";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });
test.slow();

test.describe("Case flags tests for DA case tests.", () => {
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

  test("Case flags - request support - reasonable adjustments - court admin approved - with translation. @nightly @accessibility @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CaseFlagsDA.caseFlagsDA({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      caseType: "FL401",
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
    await CaseFlagsDA.caseFlagsDA({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      caseType: "FL401",
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
    await CaseFlagsDA.caseFlagsDA({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      caseType: "FL401",
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
    await CaseFlagsDA.caseFlagsDA({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      caseType: "FL401",
      supportType: "languageInterpreter",
      isApproved: true,
      withTranslation: false,
      accessibilityTest: false,
    });
  });
});
