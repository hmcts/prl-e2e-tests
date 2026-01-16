import { Base } from "../../../base.po.ts";
import { expect, Locator, Page } from "@playwright/test";

// Not a standard event page so don't extend EventPage
export class RequestSupport5Page extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Request Support",
  });
  private readonly pageHeading: Locator = this.page.getByRole("heading", {
    name: "Tell us more about the request (optional)",
  });
  private readonly hintText: Locator = this.page.getByText(
    "Explain why you are creating this support request. Do not include any sensitive information such as personal details.",
  );
  private readonly charLimitText: Locator = this.page.getByText(
    "You can enter up to 200 characters",
  );

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.hintText).toBeVisible();
    await expect(this.charLimitText).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async enterReason(reason: string): Promise<void> {
    await this.page
      .getByRole("textbox", { name: "Tell us more about the request" })
      .fill(reason);
  }
}
