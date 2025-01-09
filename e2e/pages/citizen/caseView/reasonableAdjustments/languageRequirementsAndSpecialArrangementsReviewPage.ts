import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { LanguageRequirementsAndSpecialArrangementsReviewContent } from "../../../../fixtures/citizen/caseView/reasonableAdjustments/languageRequirementsAndSpecialArrangementsReviewContent.ts";

export class LanguageRequirementsAndSpecialArrangementsReviewPage {
  public static async languageRequirementsAndSpecialArrangementsReviewPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.submitAndContinue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText:
          LanguageRequirementsAndSpecialArrangementsReviewContent.govUkHeadingXl,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${LanguageRequirementsAndSpecialArrangementsReviewContent.govUkCaptionL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListKey}:text-is("${LanguageRequirementsAndSpecialArrangementsReviewContent.govUkSummaryListKey}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${LanguageRequirementsAndSpecialArrangementsReviewContent.govUkSummaryListValue}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${LanguageRequirementsAndSpecialArrangementsReviewContent.govUkHeadingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${LanguageRequirementsAndSpecialArrangementsReviewContent.govUkLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${LanguageRequirementsAndSpecialArrangementsReviewContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${CommonStaticText.submitAndContinue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async submitAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.submitAndContinue}")`,
    );
  }
}
