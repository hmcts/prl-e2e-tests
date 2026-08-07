import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { WelshLanguageRequirements } from "../../../../journeys/manageCases/caseProgression/welshLanguageRequirements/welshLanguageRequirements.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Welsh Language Requirements task for DA Solicitor case tests as Court Admin.", () => {
  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    const caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
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
  Does any person in this case need orders or documents in Welsh: Yes
  Which language are you using to complete this application: English
  Does this application need to be translated: Yes
  Accessibility testing: Yes. @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await WelshLanguageRequirements.welshLanguageRequirements({
      page: page,
      needDocumentsInWelsh: true,
      languageToCompleteApplication: "English",
      doesApplicationNeedTranslating: true,
      accessibilityTest: true,
    });
  });
});
