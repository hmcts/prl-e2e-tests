import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { RestrictedCaseAccess1Content } from "../../../../fixtures/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccess1Content.ts";
import { CommonContent } from "../../../../fixtures/manageCases/commonContent.ts";

interface RestrictedCaseAccess1Options {
  page: Page;
  accessibilityTest: boolean;
}

export class RestrictedCaseAccess1Page {
  public static async restrictedCaseAccess1Page({
    page,
    accessibilityTest,
  }: RestrictedCaseAccess1Options): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: RestrictedCaseAccess1Options) {
    if (!page) {
      throw new Error("No page found");
    }

    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${RestrictedCaseAccess1Content.h1}")`,
    );
    await pageTitle.waitFor();

    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        RestrictedCaseAccess1Content,
        "h2_",
        Selectors.h2,
      ),
      Helpers.checkGroup(
        page,
        2,
        RestrictedCaseAccess1Content,
        "p",
        Selectors.p,
      ),
      Helpers.checkGroup(
        page,
        3,
        RestrictedCaseAccess1Content,
        "tableHeader",
        Selectors.GovukTableHeader,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukTableCell}:text-is("${RestrictedCaseAccess1Content.tableCell}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukTableCell}:text-is("${CommonContent.judgeNameNoPrefix}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukTableCell}:text-is("${CommonContent.judgeEmail}")`,
        1,
      ),
    ]);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
