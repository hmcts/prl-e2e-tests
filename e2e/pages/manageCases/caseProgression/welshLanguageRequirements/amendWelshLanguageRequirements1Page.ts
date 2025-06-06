import { Page } from "@playwright/test";
import { Language } from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { AmendWelshLanguageRequirements1Content } from "../../../../fixtures/manageCases/caseProgression/welshLanguagesRequirements/amendWelshLanguageRequirements1Content.ts";
import { Helpers } from "../../../../common/helpers.ts";

enum UniqueSelectors {
  welshLanguageRequirementRadioLabels = "#welshLanguageRequirement_radio .form-label",
  welshLanguageRequirementRadioYes = "#welshLanguageRequirement_Yes",
  welshLanguageRequirementRadioNo = "#welshLanguageRequirement_No",
  languageRadioEnglish = "#welshLanguageRequirementApplication-english",
  languageRadioWelsh = "#welshLanguageRequirementApplication-welsh",
  doesApplicationNeedTranslatingToWelshYesRadio = "#languageRequirementApplicationNeedWelsh_Yes",
  doesApplicationNeedTranslatingToWelshNoRadio = "#languageRequirementApplicationNeedWelsh_No",
  doesApplicationNeedTranslatingToEnglishYesRadio = "#welshLanguageRequirementApplicationNeedEnglish_Yes",
  doesApplicationNeedTranslatingToEnglishNoRadio = "#welshLanguageRequirementApplicationNeedEnglish_No",
}

export class AmendWelshLanguageRequirements1Page {
  public static async amendWelshLanguageRequirements1Page(
    page: Page,
    needDocumentsInWelsh: boolean,
    languageToCompleteApplication: Language,
    doesApplicationNeedTranslating: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(
      page,
      needDocumentsInWelsh,
      languageToCompleteApplication,
      doesApplicationNeedTranslating,
    );
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: AmendWelshLanguageRequirements1Content.govUkHeadingL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AmendWelshLanguageRequirements1Content.formLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.welshLanguageRequirementRadioLabels}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.welshLanguageRequirementRadioLabels}:text-is("${CommonStaticText.no}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    needDocumentsInWelsh: boolean,
    languageToCompleteApplication: Language,
    doesApplicationNeedTranslating: boolean,
  ): Promise<void> {
    if (needDocumentsInWelsh) {
      await page.check(UniqueSelectors.welshLanguageRequirementRadioYes);
      await page
        .locator(Selectors.GovukFormLabel, {
          hasText: AmendWelshLanguageRequirements1Content.formLabel2,
        })
        .waitFor();
      if (languageToCompleteApplication === "English") {
        await page.check(UniqueSelectors.languageRadioEnglish);
        await page
          .locator(Selectors.GovukFormLabel, {
            hasText:
              AmendWelshLanguageRequirements1Content.formLabelDoesApplicationNeedTranslatingToWelsh,
          })
          .waitFor();
        if (doesApplicationNeedTranslating) {
          await page.check(
            UniqueSelectors.doesApplicationNeedTranslatingToWelshYesRadio,
          );
        } else {
          await page.check(
            UniqueSelectors.doesApplicationNeedTranslatingToWelshNoRadio,
          );
        }
      } else {
        await page.check(UniqueSelectors.languageRadioWelsh);
        await page
          .locator(Selectors.GovukFormLabel, {
            hasText:
              AmendWelshLanguageRequirements1Content.formLabelDoesApplicationNeedTranslatingToEnglish,
          })
          .waitFor();
        if (doesApplicationNeedTranslating) {
          await page.check(
            UniqueSelectors.doesApplicationNeedTranslatingToEnglishYesRadio,
          );
        } else {
          await page.check(
            UniqueSelectors.doesApplicationNeedTranslatingToEnglishNoRadio,
          );
        }
      }
    } else {
      await page.check(UniqueSelectors.welshLanguageRequirementRadioNo);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
