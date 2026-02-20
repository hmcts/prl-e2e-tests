import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../common/helpers";
import { ApplicationSubmittedContent } from "../../../fixtures/edgeCases/submission/applicationSubmittedContent";

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
    await expect(
      page.locator(Selectors.h1, { hasText: ApplicationSubmittedContent.h1 }),
    ).toBeVisible();
    await Promise.all([
      expect(
        page.locator(Selectors.font, {
          hasText: ApplicationSubmittedContent.font,
        }),
      ).toBeVisible(),
      expect(
        page.locator(Selectors.h2, { hasText: ApplicationSubmittedContent.h2 }),
      ).toBeVisible(),
      expect(
        page.locator(Selectors.GovukLink, {
          hasText: ApplicationSubmittedContent.link,
        }),
      ).toBeVisible(),
      Helpers.checkGroup(
        page,
        3,
        ApplicationSubmittedContent,
        "li",
        `${Selectors.li}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
