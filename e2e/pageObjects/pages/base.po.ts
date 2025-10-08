import { expect, Page } from "@playwright/test";
import { ExuiHeaderComponent } from "../components/exui/ExuiHeader.component.js";
import { ExuiCaseListComponent } from "@hmcts/playwright-common";

// Base page for all page types
export abstract class Base {
  //readonly page: Page;
  readonly exuiHeader = new ExuiHeaderComponent(this.page);
  readonly exuiCaseListComponent = new ExuiCaseListComponent(this.page);

  /* protected constructor(page: Page) {
    this.page = page;
    //this.exuiHeader = new ExuiHeaderComponent(page);
  }*/

  protected constructor(public readonly page: Page) {}

  async checkStrings(selector: string, stringArray: string[]): Promise<void> {
    for (const string of stringArray) {
      await expect(
        this.page.locator(selector).getByText(string, { exact: true }),
      ).toBeVisible();
    }
  }
}
