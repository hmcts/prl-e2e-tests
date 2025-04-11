import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { RestrictedCaseAccessConfirmContent } from "../../../../fixtures/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessConfirmContent.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface RestrictedCaseAccessConfirmOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class RestrictedCaseAccessConfirmPage {
  public static async restrictedCaseAccessConfirmPage({
    page,
    accessibilityTest,
  }: RestrictedCaseAccessConfirmOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.submit(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: RestrictedCaseAccessConfirmOptions) {
    if (!page) {
      throw new Error("No page found");
    }

    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${RestrictedCaseAccessConfirmContent.h1}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${RestrictedCaseAccessConfirmContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${RestrictedCaseAccessConfirmContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${RestrictedCaseAccessConfirmContent.a}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async submit(page: Page) {
    await page
      .getByRole("button", {
        name: `${CommonStaticText.closeAndReturnToCaseDetails}`,
      })
      .click();
  }
}
