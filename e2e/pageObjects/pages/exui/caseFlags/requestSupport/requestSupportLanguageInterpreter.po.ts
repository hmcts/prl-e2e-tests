import { expect, Locator, Page } from "@playwright/test";
import { Base } from "../../../base.po.ts";

// Not a standard event page so don't extend EventPage
export class RequestSupportLanguageInterpreterPage extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Request Support",
  });
  private readonly pageHeading: Locator = this.page.getByText(
    "Language Interpreter",
    { exact: true },
  );
  private readonly languageLabel: Locator = this.page.getByText(
    "Enter the language manually",
    { exact: true },
  );
  private readonly languageHint: Locator = this.page.getByText(
    "Enter the language that will need to be interpreted. If this language is not listed, you can enter it manually.",
  );
  private readonly languageInput: Locator = this.page.locator("#mat-input-0");

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.languageLabel).toBeVisible();
    await expect(this.languageHint).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectLanguage(language: string): Promise<void> {
    await this.languageInput.fill(language);
    const languageOption: Locator = this.page.locator(".mat-option-text", {
      hasText: language,
    });
    await expect(languageOption).toBeVisible();
    await languageOption.click();
  }
}
