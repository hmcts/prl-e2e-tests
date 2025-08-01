import { test } from "../../../fixtures.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { default as config } from "../../../../utils/config.utils.ts";
import { WelshLanguageRequirements } from "../../../../journeys/manageCases/caseProgression/welshLanguageRequirements/welshLanguageRequirements.ts";

test.use({ storageState: config.sessionStoragePath + "judge.json" });

test.describe("Welsh Language Requirements task for DA Solicitor case tests as Judge.", () => {
  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    const ccdRef: string = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test(`Complete Welsh Language Requirements with following options: 
  Does any person in this case need orders or documents in Welsh: No
  Accessibility testing: No. @regression`, async ({ page }): Promise<void> => {
    await WelshLanguageRequirements.welshLanguageRequirements({
      page: page,
      needDocumentsInWelsh: false,
      languageToCompleteApplication: "English",
      doesApplicationNeedTranslating: false,
      accessibilityTest: false,
    });
  });

  test(`Complete Welsh Language Requirements with following options: 
  Does any person in this case need orders or documents in Welsh: Yes
  Which language are you using to complete this application: English
  Does this application need to be translated: Yes
  Accessibility testing: No. @regression`, async ({ page }): Promise<void> => {
    await WelshLanguageRequirements.welshLanguageRequirements({
      page: page,
      needDocumentsInWelsh: true,
      languageToCompleteApplication: "English",
      doesApplicationNeedTranslating: true,
      accessibilityTest: false,
    });
  });

  test(`Complete Welsh Language Requirements with following options: 
  Does any person in this case need orders or documents in Welsh: Yes
  Which language are you using to complete this application: English
  Does this application need to be translated: No
  Accessibility testing: No. @regression`, async ({ page }): Promise<void> => {
    await WelshLanguageRequirements.welshLanguageRequirements({
      page: page,
      needDocumentsInWelsh: true,
      languageToCompleteApplication: "English",
      doesApplicationNeedTranslating: false,
      accessibilityTest: false,
    });
  });

  test(`Complete Welsh Language Requirements with following options: 
  Does any person in this case need orders or documents in Welsh: Yes
  Which language are you using to complete this application: Welsh
  Does this application need to be translated: Yes
  Accessibility testing: No. @regression`, async ({ page }): Promise<void> => {
    await WelshLanguageRequirements.welshLanguageRequirements({
      page: page,
      needDocumentsInWelsh: true,
      languageToCompleteApplication: "Welsh",
      doesApplicationNeedTranslating: true,
      accessibilityTest: false,
    });
  });

  test(`Complete Welsh Language Requirements with following options: 
  Does any person in this case need orders or documents in Welsh: Yes
  Which language are you using to complete this application: Welsh
  Does this application need to be translated: No
  Accessibility testing: No. @regression`, async ({ page }): Promise<void> => {
    await WelshLanguageRequirements.welshLanguageRequirements({
      page: page,
      needDocumentsInWelsh: true,
      languageToCompleteApplication: "Welsh",
      doesApplicationNeedTranslating: false,
      accessibilityTest: false,
    });
  });
  test(`Complete Welsh Language Requirements with following options: 
  Does any person in this case need orders or documents in Welsh: No
  Accessibility testing: Yes. @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await WelshLanguageRequirements.welshLanguageRequirements({
      page: page,
      needDocumentsInWelsh: false,
      languageToCompleteApplication: "English",
      doesApplicationNeedTranslating: false,
      accessibilityTest: true,
    });
  });
});
