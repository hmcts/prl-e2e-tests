import { Selectors } from "../../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { AllCategoriesContent } from "../../../../fixtures/citizen/caseView/viewAllDocuments/allCatergoriesContent.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";

interface AllCategoriesParams {
  page: Page;
  accessibilityTest: boolean;
}

export class AllCategoriesPage {
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
      throw new Error("Page is not defined");
    }
    await page
      .locator(Selectors.h1, {
        hasText: AllCategoriesContent.pageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${AllCategoriesContent.p}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, AllCategoriesContent, "p", Selectors.p),
      Helpers.checkGroup(page, 2, AllCategoriesContent, "a", Selectors.a),
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
    await page.click(`${Selectors.a}:text-is("${AllCategoriesContent.a1}")`);
  }
}
