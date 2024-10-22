import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { FeedbackContent } from "../../../../../fixtures/citizen/createCase/C100/confidentiality/feedback";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";


interface FeedbackPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class FeedbackPage {
  public static async feedbackPage({
                                       page,
                                       accessibilityTest,
                                     }: FeedbackPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
                                        page,
                                        accessibilityTest,
                                      }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${FeedbackContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        FeedbackContent,
        "bodyM",
        `${Selectors.GovukBodyM}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        FeedbackContent,
        "l",
        `${Selectors.li}`,
      ),

      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${FeedbackContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${FeedbackContent.h2}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
