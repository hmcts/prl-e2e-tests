import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Fl401ManageFlags1AddTranslationsContent } from "../../../../../fixtures/manageCases/caseProgression/caseFlags/fl401/fl401ManageFlags1AddTranslationsContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

enum UniqueSelectors {
  otherDescriptionTextbox = "#otherDescription",
  otherDescriptionWelshTextbox = "#otherDescription_cy",
  flagCommentsWelshTextbox = "#flagComment_cy",
}

export class Fl401ManageFlags1AddTranslationsPage {
  public static async fl401ManageFlags1AddTranslationsPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukLabelM, {
        hasText: Fl401ManageFlags1AddTranslationsContent.govUkLabelM,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Fl401ManageFlags1AddTranslationsContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        Fl401ManageFlags1AddTranslationsContent,
        `govUkLabel`,
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${Fl401ManageFlags1AddTranslationsContent.govUkHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${Fl401ManageFlags1AddTranslationsContent.govUkHint2}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      UniqueSelectors.otherDescriptionTextbox,
      Fl401ManageFlags1AddTranslationsContent.otherDescription,
    );
    await page.fill(
      UniqueSelectors.otherDescriptionWelshTextbox,
      Fl401ManageFlags1AddTranslationsContent.otherDescriptionWelsh,
    );
    await page.fill(
      UniqueSelectors.flagCommentsWelshTextbox,
      Fl401ManageFlags1AddTranslationsContent.flagCommentsWelsh,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
