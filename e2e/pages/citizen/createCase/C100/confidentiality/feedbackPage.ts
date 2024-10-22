import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { FeedbackContent } from "../../../../../fixtures/citizen/createCase/C100/confidentiality/feedback";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";


interface FeedbackPageOptions {
  page: Page;
  accessibilityTest: boolean
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean
}

export class FeedbackPage {
  public static async feedbackPage({
    page,
    accessibilityTest
  }: FeedbackPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest
    });
    await this.fillInFields(
      page
    );
  }

  private static async checkPageLoads({
    page,
    accessibilityTest
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${FeedbackContent.pageTitle}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${FeedbackContent.headingM}")`,
        1
      ),
      Helpers.checkGroup(
        page,
        3,
        FeedbackContent,
        'li',
        `${Selectors.li}`
      ),,
      Helpers.checkGroup(
        page,
        2,
        FeedbackContent,
        'bodyM',
        `${Selectors.GovukBodyM}`
      ),
    ])
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async fillInFields(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`
    );
  }
}
