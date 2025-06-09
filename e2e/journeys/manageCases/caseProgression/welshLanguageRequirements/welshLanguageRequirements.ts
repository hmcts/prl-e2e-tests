import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { Language } from "../../../../common/types.ts";
import { AmendWelshLanguageRequirements1Page } from "../../../../pages/manageCases/caseProgression/welshLanguageRequirements/amendWelshLanguageRequirements1Page.ts";
import { AmendWelshLanguageRequirementsSubmitPage } from "../../../../pages/manageCases/caseProgression/welshLanguageRequirements/amendWelshLanguageRequirementsSubmitPage.ts";

interface WelshLanguageRequirementsParams {
  page: Page;
  needDocumentsInWelsh: boolean;
  languageToCompleteApplication: Language;
  doesApplicationNeedTranslating: boolean;
  accessibilityTest: boolean;
}

export class WelshLanguageRequirements {
  public static async welshLanguageRequirements({
    page,
    needDocumentsInWelsh,
    languageToCompleteApplication,
    doesApplicationNeedTranslating,
    accessibilityTest,
  }: WelshLanguageRequirementsParams) {
    await Helpers.chooseEventFromDropdown(page, "Welsh language requirements");
    await AmendWelshLanguageRequirements1Page.amendWelshLanguageRequirements1Page(
      page,
      needDocumentsInWelsh,
      languageToCompleteApplication,
      doesApplicationNeedTranslating,
      accessibilityTest,
    );
    await AmendWelshLanguageRequirementsSubmitPage.amendWelshLanguageRequirementsSubmitPage(
      page,
      needDocumentsInWelsh,
      languageToCompleteApplication,
      doesApplicationNeedTranslating,
      accessibilityTest,
    );
  }
}
