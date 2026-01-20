import { Base } from "../../../base.po.ts";
import { expect, Locator, Page } from "@playwright/test";

// Not a standard event page so don't extend EventPage
export class RequestSupport2Page extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Request Support",
  });
  private readonly pageHeading: Locator = this.page.getByRole("heading", {
    name: "Select support type",
  });
  private readonly reasonableAdjustmentLabel: Locator = this.page.getByText(
    "Reasonable adjustment",
  );
  private readonly languageInterpreterLabel: Locator = this.page.getByText(
    "Language Interpreter",
  );

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.reasonableAdjustmentLabel).toBeVisible();
    await expect(this.languageInterpreterLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectSupportType(supportType: string): Promise<void> {
    await this.page.getByRole("radio", { name: supportType }).check();
  }
}
