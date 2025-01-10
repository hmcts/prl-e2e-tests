import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { ReasonableAdjustmentsReviewContent } from "../../../../fixtures/citizen/caseView/reasonableAdjustments/reasonableAdjustmentsReviewContent.ts";

// This page belongs to the CUI Reasonable Adjustments common component (cui ra)
export class ReasonableAdjustmentsReviewPage {
  public static async reasonableAdjustmentsReviewPage(
    page: Page,
  ): Promise<void> {
    await this.checkPageLoads(page);
    await this.submit(page);
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    // Not a comprehensive check as this page is handled by cui ra
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ReasonableAdjustmentsReviewContent.govUkHeadingL,
      })
      .waitFor();
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
