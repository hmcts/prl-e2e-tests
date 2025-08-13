import { expect, Locator, Page } from "@playwright/test";
import { Helpers } from "../../../common/helpers.js";

export class AlertBannerComponent {
  readonly page: Page;
  readonly alertBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertBanner = page.locator(".hmcts-banner");
  }

  async assertTaskAssignedAlert(): Promise<void> {
    await expect(
      this.alertBanner.locator(".alert-message", {
        hasText: "You've assigned yourself a task. It's available in My tasks.",
      }),
    ).toBeVisible();
  }

  async assertEventAlert(
    caseNumber: string,
    alertMessage: string,
  ): Promise<void> {
    const formattedCaseNumber = Helpers.getHyphenatedCaseReference(caseNumber);
    await expect(
      this.alertBanner.locator(".alert-message", {
        hasText: `Case #${formattedCaseNumber} has been updated with event: ${alertMessage}`,
      }),
    ).toBeVisible();
  }
}
