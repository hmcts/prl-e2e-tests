import { Page, expect } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { RestrictedCaseAccessSubmitContent } from "../../../../fixtures/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessSubmitContent.ts";
import { RestrictedCaseAccess2Content } from "../../../../fixtures/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccess2Content.ts";

interface RestrictedCaseAccessSubmitOptions {
  judgePage: Page;
  accessibilityTest: boolean;
}

export class RestrictedCaseAccessSubmitPage {
  public static async restrictedCaseAccessSubmitPage({
    judgePage,
    accessibilityTest,
  }: RestrictedCaseAccessSubmitOptions): Promise<void> {
    await this.checkPageLoads({ judgePage, accessibilityTest });
    await this.submit(judgePage);
  }

  private static async checkPageLoads({
    judgePage,
    accessibilityTest,
  }: RestrictedCaseAccessSubmitOptions) {
    if (!judgePage) {
      throw new Error("No page found");
    }

    const pageTitle = judgePage.locator(
      `${Selectors.h2}:text-is("${RestrictedCaseAccessSubmitContent.h2}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      expect(
        judgePage.locator(Selectors.GovukText16, {
          hasText: RestrictedCaseAccessSubmitContent.text16_1,
        }),
      ).toBeVisible(),
      expect(
        judgePage.locator(Selectors.GovukText16, {
          hasText: RestrictedCaseAccessSubmitContent.text16_2,
        }),
      ).toBeVisible(),
      Helpers.checkVisibleAndPresent(
        judgePage,
        `${Selectors.Span}:text-is("${RestrictedCaseAccess2Content.inputText}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(judgePage);
    }
  }

  private static async submit(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${RestrictedCaseAccessSubmitContent.buttonText}")`,
    );
  }
}
