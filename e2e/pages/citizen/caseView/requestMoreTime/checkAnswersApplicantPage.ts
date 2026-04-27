import { expect, Page } from "@playwright/test";
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
        6,
        CheckAnswersContent,
        `GovukSummaryListKey`,
        `${Selectors.GovukSummaryListKey}`,
      ),
      expect(
        page.getByText(CheckAnswersContent.GovukSummaryListValue1),
      ).toBeVisible(),
      expect(
        page.getByText(CheckAnswersContent.GovukSummaryListValue2),
      ).toHaveCount(2),
      expect(
        page.getByText(CheckAnswersContent.GovukSummaryListValue3),
      ).toBeVisible(),
      expect(
        page.getByText(CheckAnswersContent.GovukSummaryListValueYes),
      ).toHaveCount(3),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async submitApplication(page: Page): Promise<void> {
    await page
      .getByRole("button", { name: CommonStaticText.submitApplication })
      .click();
  }
}
