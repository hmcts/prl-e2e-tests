import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { Locator, Page } from "@playwright/test";

export class HistoryPage extends CaseAccessViewPage {
  readonly historyTab: Locator = this.page.getByRole("tab", { name: "History" });

  readonly eventHistoryName: Locator = this.page
    .locator("ccd-event-log-details, ccd-case-event-log-details")
    .filter({ hasText: "Add case number" });

  readonly endStateRow: Locator = this.page
    .locator("tr")
    .filter({ hasText: "End state" })
    .filter({ hasText: "Case Issued" })
    .first();

  readonly endStateValue: Locator = this.endStateRow
    .locator("td")
    .filter({ hasText: "Case Issued" })
    .last();

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.historyTab.click();
  }
}
