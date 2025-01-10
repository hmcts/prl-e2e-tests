import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { ApplicationPackDocumentsContent } from "../../../../../fixtures/citizen/caseView/viewAllDocuments/applicant/applicationPackDocumentsContent.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";

interface ApplicationPackDocumentsParams {
  page: Page;
  accessibilityTest: boolean;
}

export class ApplicationPackDocumentsPage {
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
        hasText: ApplicationPackDocumentsContent.pageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ApplicationPackDocumentsContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${ApplicationPackDocumentsContent.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${ApplicationPackDocumentsContent.p2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ApplicationPackDocumentsContent,
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
      `${Selectors.a}:text-is("${ApplicationPackDocumentsContent.a1}")`,
    );
    await page.waitForTimeout(2000);
  }
}
