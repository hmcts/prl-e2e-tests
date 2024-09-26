import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { WelshLanguageRequirementsContent } from "../../../../../fixtures/manageCases/createCase/FL401/welshLanguageRequirements/welshLanguageRequirementsContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum radioIds {
  welshLanguageRequirement_Yes = "#welshLanguageRequirement_Yes",
  welshLanguageRequirement_No = "#welshLanguageRequirement_No",
  welshLanguageRequirementApplication_english = "#welshLanguageRequirementApplication-english",
  welshLanguageRequirementApplication_welsh = "#welshLanguageRequirementApplication-welsh",
  languageRequirementApplicationNeedWelsh_Yes = "#languageRequirementApplicationNeedWelsh_Yes",
  welshLanguageRequirementApplicationNeedEnglish_Yes = "#welshLanguageRequirementApplicationNeedEnglish_Yes"
}

export class WelshLanguageRequirementsPage {
  public static async welshLanguageRequirementsPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    welshLanguageRequirementsAllOptionsYes: boolean,
    welshLanguageRequirementsSelectWelsh?: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(
      page,
      welshLanguageRequirementsAllOptionsYes,
      welshLanguageRequirementsSelectWelsh,
      accessibilityTest,
    );
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHeadingL}:text-is("${WelshLanguageRequirementsContent.title}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${WelshLanguageRequirementsContent.textOnPage}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirementsContent.formLabel1}")`,
          1,
        ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
    accessibilityTest: boolean,
    welshLanguageRequirementsAllOptionsYes: boolean,
    welshLanguageRequirementsSelectWelsh?: boolean,
  ): Promise<void> {
    if (welshLanguageRequirementsAllOptionsYes) {
      await page.click(radioIds.welshLanguageRequirement_Yes);
      await page.waitForSelector(`${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirementsContent.formLabel2}")`)
      if (welshLanguageRequirementsSelectWelsh) {
        await page.click(radioIds.welshLanguageRequirementApplication_welsh);
        await page.waitForSelector(`${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirementsContent.formLabel3}")`)
        await page.click(radioIds.welshLanguageRequirementApplicationNeedEnglish_Yes);
        await page.click(
            `${Selectors.button}:text-is("${WelshLanguageRequirementsContent.continue}")`,
        );
      } else {
        await page.click(radioIds.welshLanguageRequirementApplication_english);
        await page.waitForSelector(`${Selectors.GovukFormLabel}:text-is("${WelshLanguageRequirementsContent.formLabel4}")`)
        await page.click(radioIds.languageRequirementApplicationNeedWelsh_Yes)
        await page.click(
            `${Selectors.button}:text-is("${WelshLanguageRequirementsContent.continue}")`,
        );
      }
    } else {
      await page.click(radioIds.welshLanguageRequirement_No);
      await page.click(
          `${Selectors.button}:text-is("${WelshLanguageRequirementsContent.continue}")`,
      );
    }
  }
}
