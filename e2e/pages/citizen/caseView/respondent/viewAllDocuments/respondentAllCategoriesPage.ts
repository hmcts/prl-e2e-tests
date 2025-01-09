import { RespondentAllCategoriesContent } from "../../../../../fixtures/citizen/caseView/respondent/viewAllDocuments/respondentAllCategoriesContent.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { Page } from "@playwright/test";

interface AllCategoriesParams {
  page: Page;
  accessibilityTest: boolean;
}

export class RespondentAllCategoriesPage {
  public static async allCategoriesPage({
    page,
    accessibilityTest,
  }: AllCategoriesParams): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<AllCategoriesParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page
      .locator(Selectors.h1, {
        hasText: RespondentAllCategoriesContent.pageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${RespondentAllCategoriesContent.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        RespondentAllCategoriesContent,
        "p",
        Selectors.p,
      ),
      Helpers.checkGroup(
        page,
        2,
        RespondentAllCategoriesContent,
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
  }: Partial<AllCategoriesParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page.click(
      `${Selectors.a}:text-is("${RespondentAllCategoriesContent.a1}")`,
    );
  }
}
