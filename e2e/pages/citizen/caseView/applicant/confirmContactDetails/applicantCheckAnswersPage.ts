import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { ApplicantCheckAnswersContent } from "../../../../../fixtures/citizen/caseView/applicant/confirmContactDetails/applicantCheckAnswersContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

export class ApplicantCheckAnswersPage {
  public static async checkAnswersPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ApplicantCheckAnswersContent.govukHeadingL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionM}:text-is("${ApplicantCheckAnswersContent.govukCaptionM}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ApplicantCheckAnswersContent,
        `govukSummaryListKey`,
        `${Selectors.GovukSummaryListKey}`,
      ),
      Helpers.checkGroup(
        page,
        5,
        ApplicantCheckAnswersContent,
        `govukSummaryListValue`,
        `${Selectors.GovukSummaryListValue}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ApplicantCheckAnswersContent.govukHint1}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ApplicantCheckAnswersContent.govukHint2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ApplicantCheckAnswersContent.a}")`,
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
