import { expect, Locator, Page } from "@playwright/test";
import { CaseNumberUtils } from "../../../utils/caseNumber.utils.js";

export class AlertBannerComponent {
  private readonly alertBanner: Locator = this.page.locator(".hmcts-banner");
  private readonly caseNumberUtils: CaseNumberUtils = new CaseNumberUtils();

  constructor(private page: Page) {}

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
    const formattedCaseNumber =
      this.caseNumberUtils.getHyphenatedCaseReference(caseNumber);
    await expect(
      this.alertBanner.locator(".alert-message", {
        hasText: `Case #${formattedCaseNumber} has been updated with event: ${alertMessage}`,
      }),
    ).toBeVisible();
  }
}
