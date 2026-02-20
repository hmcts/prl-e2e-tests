import { Base } from "../../../base.po";
import { expect, Locator, Page } from "@playwright/test";

// Not a standard event page so don't extend EventPage
export class RequestSupport1Page extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Request Support",
  });
  private readonly pageHeading: Locator = this.page.getByRole("heading", {
    name: "Who is the support for?",
  });

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async selectSupportRecipient(recipient: string): Promise<void> {
    await this.page.getByRole("radio", { name: recipient }).check();
  }
}
