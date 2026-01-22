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
  // readonly eventHistoryName: Locator = this.page
    // .locator("ccd-event-log-details, ccd-case-event-log-details")
  // .first(); hasText "Add case number";
  
  //readonly endStateValue: Locator = this.endStateRow.locator("td").last();
  // hasText: "Case Issued"

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.historyTab.click();
    await expect(this.eventLogDetails).toBeVisible();
    // await expect eventHistoryName toBeVisible();
  }

  async openEvent(): Promise<void> {
    // not needed?  await this.page.getByRole("link", { name: eventName }).click();
    // not needed? await expect(this.eventLogDetails).toBeVisible();
    await expect(this.endStateRow).toBeVisible();
  }

  async assertEndState(): Promise<void> {
    await expect(this.endStateValue).toBeVisible();
    // not needed await expect(this.endStateValue).toContainText(expected);
  }
}
