import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class TransferToAnotherCourtConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-header",
    { hasText: "Case transferred to another court" },
  );
  readonly p1: Locator = this.page.locator(Selectors.p, {
    hasText: "The case has been transferred to",
  });
  readonly p2: Locator = this.page.locator(Selectors.p, {
    hasText: "Local court admin have been notified",
  });

  constructor(page: Page) {
    super(page, "Transfer to another court");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.p1).toBeVisible();
    await expect(this.p2).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
