import { expect, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { ApplicationSubmittedContent } from "../../../../fixtures/citizen/caseView/requestMoreTime/applicationSubmittedContent.ts";

export class ApplicationSubmittedPage {
  public static async applicationSubmittedPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.closeAndReturnToCase(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
      page.getByRole("heading", { name: ApplicationSubmittedContent.h1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: ApplicationSubmittedContent.h3 }),
    ).toBeVisible();
    await expect(page.getByText(ApplicationSubmittedContent.p1)).toBeVisible();
    await expect(page.getByText(ApplicationSubmittedContent.p2)).toBeVisible();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async closeAndReturnToCase(page: Page): Promise<void> {
    await page
      .getByRole("link", { name: ApplicationSubmittedContent.button })
      .click();
  }
}
