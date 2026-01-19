import { expect, Page } from "@playwright/test";
import { CaseAccessViewPage } from "./caseAccessView.po.js"; // adjust import path to match your project

export class HistoryPage extends CaseAccessViewPage {
  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.locator("mat-tab-header").getByText("History", { exact: true }).click();
    await expect(this.page.locator("ccd-event-log-details")).toBeVisible();
  }

  async openEvent(eventName: RegExp): Promise<void> {
    await this.page.getByRole("link", { name: eventName }).click();
  }

  async assertEndState(expected: RegExp): Promise<void> {
    const endStateValue = this.page.locator(
      "//ccd-event-log-details//tr[th[normalize-space()='End state']]/td"
    );
    await expect(endStateValue).toContainText(expected);
  }
}