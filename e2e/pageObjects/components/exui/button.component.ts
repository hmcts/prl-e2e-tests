import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";

export class ButtonComponent {
  readonly page: Page;
  readonly buttonText: string;
  readonly button: Locator;

  constructor(page: Page, buttonText: string) {
    this.page = page;
    this.buttonText = buttonText;
    this.button = page.locator(Selectors.button, {
      hasText: buttonText,
    });
  }

  async isVisible(): Promise<void> {
    await expect(this.button).toBeVisible();
  }

  async click(): Promise<void> {
    await this.button.click();
  }
}
