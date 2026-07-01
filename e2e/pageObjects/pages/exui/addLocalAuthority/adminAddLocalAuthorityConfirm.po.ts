import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.js";

export class AdminAddLocalAuthorityConfirmPage extends EventPage {
  private readonly confirmationBanner: Locator = this.page.locator(
    ".hmcts-banner--success .alert-message",
    { hasText: "Add local authority" },
  );

  constructor(page: Page) {
    super(page, "Add local authority");
  }

  async assertPageContents(): Promise<void> {
    await expect(this.confirmationBanner).toBeVisible();
  }
}
