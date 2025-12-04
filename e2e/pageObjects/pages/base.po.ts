import { Page, Locator } from "@playwright/test";
import { ExuiHeaderComponent } from "../components/exui/ExuiHeader.component.js";
import { AxeUtils } from "@hmcts/playwright-common";

// Base page for all page types
export abstract class Base {
  readonly page: Page;
  readonly exuiHeader: ExuiHeaderComponent;
  readonly axeUtils: AxeUtils;
  readonly continueButton: Locator;
  readonly previousButton: Locator;

  protected constructor(page: Page) {
    this.page = page;
    this.exuiHeader = new ExuiHeaderComponent(page);
    this.axeUtils = new AxeUtils(this.page);
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

  async verifyAccessibility(): Promise<void> {
    await this.axeUtils.audit();
  }
}
