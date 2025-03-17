import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Fl401RequestSupport1LanguageInterpreterContent } from "../../../../../fixtures/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1LanguageInterpreterContent.ts";

enum UniqueSelectors {
  languageSearchBox = "#mat-input-0",
}

export class Fl401RequestSupport1LanguageInterpreterPage {
  public static async fl401RequestSupport1LanguageInterpreterPage(
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
        hasText: Fl401RequestSupport1LanguageInterpreterContent.guvUkLabelM,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Fl401RequestSupport1LanguageInterpreterContent.govUKHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${Fl401RequestSupport1LanguageInterpreterContent.guvUkLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${Fl401RequestSupport1LanguageInterpreterContent.govUkHint}")`,
        1,
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
    await page.fill(UniqueSelectors.languageSearchBox, "Korean");
    await page.click(".mat-option-text"); // might not work
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
