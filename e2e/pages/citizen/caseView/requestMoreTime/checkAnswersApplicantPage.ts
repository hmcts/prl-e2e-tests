import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CheckAnswersContent } from "../../../../fixtures/citizen/caseView/requestMoreTime/checkAnswersContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class CheckAnswersApplicantPage {
  public static async checkAnswersApplicantPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.submitApplication(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: CheckAnswersContent.GovukHeadingXL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        4,
        CheckAnswersContent,
        `GovukSummaryListKey`,
        `${Selectors.GovukSummaryListKey}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        CheckAnswersContent,
        `GovukSummaryListValue`,
        `${Selectors.GovukSummaryListValue}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${CheckAnswersContent.GovukSummaryListValueYes}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
  private static async submitApplication(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.submitApplication}")`,
    );
  }
}
