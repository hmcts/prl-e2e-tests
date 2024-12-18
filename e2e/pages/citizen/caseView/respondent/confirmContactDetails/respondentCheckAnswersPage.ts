import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { RespondentCheckAnswersContent } from "../../../../../fixtures/citizen/caseView/respondent/confirmContactDetails/respondentCheckAnswersContent.ts";

export class RespondentCheckAnswersPage {
  public static async checkAnswersPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: RespondentCheckAnswersContent.govukHeadingXl,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${RespondentCheckAnswersContent.govukHint1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        RespondentCheckAnswersContent,
        `govukSummaryListKey`,
        `${Selectors.GovukSummaryListKey}`,
      ),
      Helpers.checkGroup(
        page,
        5,
        RespondentCheckAnswersContent,
        `govukSummaryListValue`,
        `${Selectors.GovukSummaryListValue}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${RespondentCheckAnswersContent.govukHint2}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${RespondentCheckAnswersContent.govukHint3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${RespondentCheckAnswersContent.a}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
