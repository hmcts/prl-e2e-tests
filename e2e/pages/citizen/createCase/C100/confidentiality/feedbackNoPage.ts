import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { FeedbackNoContent } from "../../../../../fixtures/citizen/createCase/C100/confidentiality/feedbackNo";
import { Helpers } from "../../../../../common/helpers";

interface FeedbackNoPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class FeedbackNoPage {
  public static async feedbackNoPage({
                                       page,
                                       accessibilityTest,
                                     }: FeedbackNoPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
                                        page,
                                        accessibilityTest,
                                      }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(`${Selectors.GovukHeadingXL}:text-is("${FeedbackNoContent.pageTitle}")`);

    const elementSelectors = [
      `${Selectors.GovukLabel}:text-is("${FeedbackNoContent.bodyM1}")`,
      `${Selectors.GovukLabel}:text-is("${FeedbackNoContent.caption}")`,
    ];

    const visibilityPromises = elementSelectors.map(selector =>
      Helpers.checkVisibleAndPresent(page, selector, 1)
    );

    await Promise.all(visibilityPromises);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}[type="submit"][name="onlycontinue"][data-prevent-double-click="true"]`
    );
  }
}
