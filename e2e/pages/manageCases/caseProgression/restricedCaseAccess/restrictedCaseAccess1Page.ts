import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { RestrictedCaseAccess1Content } from "../../../../fixtures/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccess1Content.ts";
import { CommonContent } from "../../../../fixtures/manageCases/commonContent.ts";

interface RestrictedCaseAccess1Options {
  judgePage: Page;
  accessibilityTest: boolean;
}

export class RestrictedCaseAccess1Page {
  public static async restrictedCaseAccess1Page({
    judgePage,
    accessibilityTest,
  }: RestrictedCaseAccess1Options): Promise<void> {
    await this.checkPageLoads({ judgePage, accessibilityTest });
    await this.continue(judgePage);
  }

  private static async checkPageLoads({
    judgePage,
    accessibilityTest,
  }: RestrictedCaseAccess1Options) {
    if (!judgePage) {
      throw new Error("No page found");
    }

    const pageTitle = judgePage.locator(
      `${Selectors.h1}:text-is("${RestrictedCaseAccess1Content.h1}")`,
    );
    await pageTitle.waitFor();

    await Promise.all([
      Helpers.checkGroup(
        judgePage,
        2,
        RestrictedCaseAccess1Content,
        "h2_",
        Selectors.h2,
      ),
      Helpers.checkGroup(
        judgePage,
        2,
        RestrictedCaseAccess1Content,
        "p",
        Selectors.p,
      ),
      Helpers.checkGroup(
        judgePage,
        3,
        RestrictedCaseAccess1Content,
        "tableHeader",
        Selectors.GovukTableHeader,
      ),
      Helpers.checkVisibleAndPresent(
        judgePage,
        `${Selectors.GovukTableCell}:text-is("${RestrictedCaseAccess1Content.tableCell}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        judgePage,
        `${Selectors.GovukTableCell}:text-is("${CommonContent.judgeNameNoPrefix}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        judgePage,
        `${Selectors.GovukTableCell}:text-is("${CommonContent.judgeEmail}")`,
        1,
      ),
    ]);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(judgePage);
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
