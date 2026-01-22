import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";

export class HistoryPage extends CaseAccessViewPage {
  readonly historyTab: Locator = this.page.getByRole("tab", {
    name: "History",
  });
  readonly eventLogDetails: Locator = this.page
    .locator("ccd-event-log-details, ccd-case-event-log-details")
    .first();
  readonly endStateRow: Locator = this.eventLogDetails
    .locator("tr")
    .filter({ hasText: "End state" });
  readonly endStateValue: Locator = this.endStateRow.locator("td").last();

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.historyTab.click();
    await expect(this.eventLogDetails).toBeVisible();
  }

  async openEvent(eventName: RegExp): Promise<void> {
    await this.page.getByRole("link", { name: eventName }).click();
    await expect(this.eventLogDetails).toBeVisible();
    await expect(this.endStateRow).toBeVisible(); 
  }

  async assertEndState(expected: RegExp): Promise<void> {
    await expect(this.endStateValue).toBeVisible();
    await expect(this.endStateValue).toContainText(expected);
  }
}
