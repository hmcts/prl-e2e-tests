import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ReviewContent } from "../../../../fixtures/citizen/caseView/contactPreferences/reviewContent.ts";
import { Helpers } from "../../../../common/helpers.ts";

export class ReviewPage {
  public static async reviewPage(
    page: Page,
    isApplicant: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, isApplicant, accessibilityTest);
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads(
    page: Page,
    isApplicant: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: ReviewContent.govUkHeadingXL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ReviewContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListKey}:text-is("${ReviewContent.govUkSummaryListKey}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${ReviewContent.govUkWarningText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ReviewContent,
        `commonGovUkBody`,
        `${Selectors.GovukBody}`,
      ),
    ]);
    if (isApplicant) {
      await Helpers.checkGroup(
        page,
        4,
        ReviewContent,
        `applicantGovUkBody`,
        `${Selectors.GovukBody}`,
      );
    } else {
      await Helpers.checkGroup(
        page,
        5,
        ReviewContent,
        `respondentGovUkBody`,
        `${Selectors.GovukBody}`,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.getByRole("button", { name: CommonStaticText.continue }).click();
  }
}
