import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { SupportYouNeedReviewContent } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/supportYouNeedReviewContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";

export class SupportYouNeedReviewPage {
  public static async supportYouNeedReviewPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: SupportYouNeedReviewContent.headingXL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SupportYouNeedReviewContent.headingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${SupportYouNeedReviewContent.linkEdit}")`,
        8,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${SupportYouNeedReviewContent.headingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListKey}:text-is("${SupportYouNeedReviewContent.listKeyDetails}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        6,
        SupportYouNeedReviewContent,
        "summaryListKey",
        Selectors.GovukSummaryListKey,
      ),
      Helpers.checkGroup(
        page,
        5,
        SupportYouNeedReviewContent,
        "summaryListValue",
        Selectors.GovukSummaryListValue,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${SupportYouNeedReviewContent.uniqueListValueRespondent}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${SupportYouNeedReviewContent.listValueYes}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
