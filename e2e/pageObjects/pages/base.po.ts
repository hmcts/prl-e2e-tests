import { expect, Page } from "@playwright/test";
import { ExuiHeaderComponent } from "../components/exui/ExuiHeader.component.js";
import { AxeUtils } from "@hmcts/playwright-common";

// Base page for all page types
export abstract class Base {
  readonly page: Page;
  readonly exuiHeader: ExuiHeaderComponent;

  protected constructor(page: Page) {
    this.page = page;
    this.exuiHeader = new ExuiHeaderComponent(page);
  }

  async accessibilityTest(accessibilityTest: boolean): Promise<void> {
    if (accessibilityTest) {
      await new AxeUtils(this.page).audit();
    }
  }

  async checkStrings(selector: string, stringArray: string[]): Promise<void> {
    for (const string of stringArray) {
      await expect(
        this.page.locator(selector).getByText(string, { exact: true }),
      ).toBeVisible();
    }
  }
}
