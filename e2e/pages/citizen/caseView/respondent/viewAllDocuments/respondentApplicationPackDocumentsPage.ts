import { RespondentApplicationPackDocumentsContent } from "../../../../../fixtures/citizen/caseView/respondent/viewAllDocuments/respondentApplicationPackDocumentsContent.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Page } from "@playwright/test";

interface ApplicationPackDocumentsParams {
  page: Page;
  accessibilityTest: boolean;
}

export class RespondentApplicationPackDocumentsPage {
  public static async applicationPackDocumentsPage({
    page,
    accessibilityTest,
  }: ApplicationPackDocumentsParams): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ApplicationPackDocumentsParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page
      .locator(Selectors.h1, {
        hasText: RespondentApplicationPackDocumentsContent.pageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${RespondentApplicationPackDocumentsContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${RespondentApplicationPackDocumentsContent.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${RespondentApplicationPackDocumentsContent.p2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        RespondentApplicationPackDocumentsContent,
        "a",
        Selectors.a,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<ApplicationPackDocumentsParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page.click(
      `${Selectors.a}:text-is("${RespondentApplicationPackDocumentsContent.a1}")`,
    );
    await page.waitForTimeout(2000);
  }
}
