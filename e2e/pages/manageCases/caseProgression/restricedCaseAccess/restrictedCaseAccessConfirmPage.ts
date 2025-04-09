import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { RestrictedCaseAccessConfirmContent } from "../../../../fixtures/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessConfirmContent.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface RestrictedCaseAccessConfirmOptions {
  judgePage: Page;
  accessibilityTest: boolean;
}

export class RestrictedCaseAccessConfirmPage {
  public static async restrictedCaseAccessConfirmPage({
    judgePage,
    accessibilityTest,
  }: RestrictedCaseAccessConfirmOptions): Promise<void> {
    await this.checkPageLoads({ judgePage, accessibilityTest });
    await this.submit(judgePage);
  }

  private static async checkPageLoads({
    judgePage,
    accessibilityTest,
  }: RestrictedCaseAccessConfirmOptions) {
    if (!judgePage) {
      throw new Error("No page found");
    }

    const pageTitle = judgePage.locator(
      `${Selectors.h1}:text-is("${RestrictedCaseAccessConfirmContent.h1}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        judgePage,
        `${Selectors.h2}:text-is("${RestrictedCaseAccessConfirmContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        judgePage,
        `${Selectors.p}:text-is("${RestrictedCaseAccessConfirmContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        judgePage,
        `${Selectors.a}:text-is("${RestrictedCaseAccessConfirmContent.a}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(judgePage);
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
