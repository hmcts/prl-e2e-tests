import { Page, expect } from "@playwright/test";
// import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { RestrictedCaseAccessSubmitContent } from "../../../../fixtures/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessSubmitContent.ts";
import { RestrictedCaseAccess2Content } from "../../../../fixtures/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccess2Content.ts";

interface RestrictedCaseAccessSubmitOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class RestrictedCaseAccessSubmitPage {
  public static async restrictedCaseAccessSubmitPage({
    page,
    accessibilityTest,
  }: RestrictedCaseAccessSubmitOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.submit(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: RestrictedCaseAccessSubmitOptions) {
    if (!page) {
      throw new Error("No page found");
    }

    const pageTitle = page.locator(
      `${Selectors.h2}:text-is("${RestrictedCaseAccessSubmitContent.h2}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      expect(
        page.locator(Selectors.GovukText16, {
          hasText: RestrictedCaseAccessSubmitContent.text16_1,
        }),
      ).toBeVisible(),
      expect(
        page.locator(Selectors.GovukText16, {
          hasText: RestrictedCaseAccessSubmitContent.text16_2,
        }),
      ).toBeVisible(),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${RestrictedCaseAccess2Content.inputText}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); //turn back on once EXUI-3016 is resolved.
    }
  }

  private static async submit(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${RestrictedCaseAccessSubmitContent.buttonText}")`,
    );
  }
}
