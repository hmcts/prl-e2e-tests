import { Base } from "../../../base.po.js";
import { expect, Locator, Page } from "@playwright/test";

// Not a standard event page so don't extend EventPage
export class ReviewRARequest1Page extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Review RA Request",
  });
  private readonly pageHeading: Locator = this.page.getByRole("heading", {
    name: "Manage case flags",
  });

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(
    recipient: string,
    recipientRole: string,
    supportType: string,
    adjustment: string,
    reason: string,
  ): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(this.pageHeading).toBeVisible();
    const caseFlagRadioLabel: string = `${recipient} (${recipientRole}) - ${supportType}, ${adjustment} (${reason})`;
    await expect(this.page.getByText(caseFlagRadioLabel)).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async selectSupportRequest(recipient: string): Promise<void> {
    await this.page.getByRole("radio", { name: recipient }).check();
  }
}
