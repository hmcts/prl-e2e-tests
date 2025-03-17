import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../common/helpers.ts";
import { ApplicationSubmittedContent } from "../../../fixtures/edgeCases/submission/applicationSubmittedContent.ts";

interface ApplicationSubmittedPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ApplicationSubmitted {
  public static async applicationSubmittedPage({
    page,
    accessibilityTest,
  }: ApplicationSubmittedPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: ApplicationSubmittedPageOptions): Promise<void> {
    const h1Locator = page.locator(
      `${Selectors.h1}:text(${ApplicationSubmittedContent.h1})`,
    );
    await h1Locator.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.font}:text-is("${ApplicationSubmittedContent.font}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ApplicationSubmittedContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ApplicationSubmittedContent.link}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicationSubmittedContent,
        "li",
        `${Selectors.li}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
