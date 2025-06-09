import { Page } from "@playwright/test";
import { Language } from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { AmendWelshLanguageRequirementsSubmitContent } from "../../../../fixtures/manageCases/caseProgression/welshLanguagesRequirements/amendWelshLanguageRequirementsSubmitContent.ts";
import { Helpers } from "../../../../common/helpers.ts";

export class AmendWelshLanguageRequirementsSubmitPage {
  public static async amendWelshLanguageRequirementsSubmitPage(
    page: Page,
    needDocumentsInWelsh: boolean,
    languageToCompleteApplication: Language,
    doesApplicationNeedTranslating: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      needDocumentsInWelsh,
      languageToCompleteApplication,
      doesApplicationNeedTranslating,
      accessibilityTest,
    );
    await this.saveAndContinue(page);
    await this.checkDocuments(
      page,
      needDocumentsInWelsh,
      languageToCompleteApplication,
      doesApplicationNeedTranslating,
    );
  }

  private static async checkPageLoads(
    page: Page,
    needDocumentsInWelsh: boolean,
    languageToCompleteApplication: Language,
    doesApplicationNeedTranslating: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.headingH2, {
        hasText: AmendWelshLanguageRequirementsSubmitContent.headingH2,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AmendWelshLanguageRequirementsSubmitContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        AmendWelshLanguageRequirementsSubmitContent,
        `text16`,
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
        1,
      ),
    ]);
    await this.checkFilledInFields(
      page,
      needDocumentsInWelsh,
      languageToCompleteApplication,
      doesApplicationNeedTranslating,
    );
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkFilledInFields(
    page: Page,
    needDocumentsInWelsh: boolean,
    languageToCompleteApplication: Language,
    doesApplicationNeedTranslating: boolean,
  ): Promise<void> {
    if (needDocumentsInWelsh) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendWelshLanguageRequirementsSubmitContent.text16WhichLanguageAreYouUsingToCompleteThisApplication}")`,
        1,
      );
      if (languageToCompleteApplication === "English") {
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${AmendWelshLanguageRequirementsSubmitContent.text16English}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${AmendWelshLanguageRequirementsSubmitContent.text16DoesThisApplicationNeedToBeTranslatedIntoWelsh}")`,
            1,
          ),
        ]);
      } else {
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${AmendWelshLanguageRequirementsSubmitContent.text16Welsh}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${AmendWelshLanguageRequirementsSubmitContent.text16DoesThisApplicationNeedToBeTranslatedIntoEnglish}")`,
            1,
          ),
        ]);
      }
      if (doesApplicationNeedTranslating) {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonStaticText.yes}"):visible`,
          2,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonStaticText.yes}"):visible`,
          1,
        );
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonStaticText.no}"):visible`,
          1,
        );
      }
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${CommonStaticText.no}"):visible`,
        1,
      );
    }
  }

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }

  private static async checkDocuments(
    page: Page,
    needDocumentsInWelsh: boolean,
    languageToCompleteApplication: Language,
    doesApplicationNeedTranslating: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.alertMessage, {
        hasText: AmendWelshLanguageRequirementsSubmitContent.alertMessage,
      })
      .waitFor();
    await page
      .locator(".mat-tab-label-content", {
        hasText: "Case documents",
      })
      .click();
    if (needDocumentsInWelsh) {
      if (languageToCompleteApplication === "English") {
        if (doesApplicationNeedTranslating) {
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.a}:text-is("${AmendWelshLanguageRequirementsSubmitContent.welshFinalDocPdfLink}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.a}:text-is("${AmendWelshLanguageRequirementsSubmitContent.englishFinalDocPdfLink}")`,
              1,
            ),
          ]);
        } else {
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.a}:text-is("${AmendWelshLanguageRequirementsSubmitContent.englishFinalDocPdfLink}")`,
            1,
          );
        }
      } else {
        if (doesApplicationNeedTranslating) {
          await Promise.all([
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.a}:text-is("${AmendWelshLanguageRequirementsSubmitContent.welshFinalDocPdfLink}")`,
              1,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.a}:text-is("${AmendWelshLanguageRequirementsSubmitContent.englishFinalDocPdfLink}")`,
              1,
            ),
          ]);
        } else {
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.a}:text-is("${AmendWelshLanguageRequirementsSubmitContent.welshFinalDocPdfLink}")`,
            1,
          );
        }
      }
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${AmendWelshLanguageRequirementsSubmitContent.englishFinalDocPdfLink}")`,
        1,
      );
    }
  }
}
