import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ReviewContent } from "../../../../fixtures/citizen/caseView/contactPreferences/reviewContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CaseUser } from "../../../../journeys/citizen/activateCase/activateCase.js";

export class ReviewPage {
  public static async reviewPage(
    page: Page,
    caseUser: CaseUser,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, caseUser, accessibilityTest);
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseUser: CaseUser,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: ReviewContent.GovukHeadingXL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ReviewContent.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListKey}:text-is("${ReviewContent.GovukSummaryListKey}")`,
        1,
      ),
    ]);
    if (caseUser === "applicant") {
      await Helpers.checkGroup(
        page,
        7,
        ReviewContent,
        `GovukBody`,
        `${Selectors.GovukBody}`,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReviewContent.errorMissingDetails}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
