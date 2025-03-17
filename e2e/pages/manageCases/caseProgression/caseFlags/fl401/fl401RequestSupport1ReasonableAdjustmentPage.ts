import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { Fl401RequestSupport1ReasonableAdjustmentContent } from "../../../../../fixtures/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1ReasonableAdjustmentContent.ts";

enum UniqueSelectors {
  documentsInAlternativeFormat = "#flag-type-0",
}

export class Fl401RequestSupport1ReasonableAdjustmentPage {
  public static async fl401RequestSupport1ReasonableAdjustmentPage(
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
      .locator(Selectors.GovukFieldsetHeading, {
        hasText:
          Fl401RequestSupport1ReasonableAdjustmentContent.govUkFieldSetHeading,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Fl401RequestSupport1ReasonableAdjustmentContent.govUKHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        8,
        Fl401RequestSupport1ReasonableAdjustmentContent,
        `govUkLabel`,
        `${Selectors.GovukLabel}`,
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
    // only decided to fill in one reasonable adjustments journey (documents in alternative format)
    await page.check(UniqueSelectors.documentsInAlternativeFormat);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
