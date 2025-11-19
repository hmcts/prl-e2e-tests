import { Page, Locator } from "@playwright/test";
import { ExuiHeaderComponent } from "../components/exui/ExuiHeader.component.js";

// Base page for all page types
export abstract class Base {
  readonly page: Page;
  readonly exuiHeader: ExuiHeaderComponent;
  readonly continueButton: Locator;
  readonly previousButton: Locator;

  protected constructor(page: Page) {
    this.page = page;
    this.exuiHeader = new ExuiHeaderComponent(page);
    this.continueButton = this.page.getByRole("button", { name: "Continue" });
    this.previousButton = this.page.locator("button", {
      hasText: "Previous",
    });
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickPrevious() {
    await this.previousButton.click();
  }
}
