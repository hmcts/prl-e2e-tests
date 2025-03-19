import { Page } from "@playwright/test";
import { SupportType } from "../../../../../common/types.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Fl401RequestSupport1SubmitContent } from "../../../../../fixtures/manageCases/caseProgression/caseFlags/fl401/fl401RequestSupport1SubmitContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

export class Fl401RequestSupport1SubmitPage {
  public static async fl401RequestSupport1SubmitPage(
    page: Page,
    supportType: SupportType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, supportType, accessibilityTest);
    await this.submit(page);
  }

  private static async checkPageLoads(
    page: Page,
    supportType: SupportType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.headingH2, {
        hasText: Fl401RequestSupport1SubmitContent.headingH2,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Fl401RequestSupport1SubmitContent.govUKHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        Fl401RequestSupport1SubmitContent,
        `govUkSummaryListKey`,
        `${Selectors.GovukSummaryListKey}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        Fl401RequestSupport1SubmitContent,
        `govUkSummaryListValue`,
        `${Selectors.GovukSummaryListValue}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
    ]);
    if (supportType === "reasonableAdjustment") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${Fl401RequestSupport1SubmitContent.govUkSummaryListValueReasonableAdjustmentSupportType}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${Fl401RequestSupport1SubmitContent.govUkSummaryListValueLanguageInterpreterSupportType}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
