import { Page } from "@playwright/test";
import { ExuiHeaderComponent } from "../components/exui/ExuiHeader.component.js";

// Base page for all page types
export class Base {
  readonly page: Page;
  readonly exuiHeader: ExuiHeaderComponent;

  constructor(page: Page) {
    this.page = page;
    this.exuiHeader = new ExuiHeaderComponent(page);
  }
}
