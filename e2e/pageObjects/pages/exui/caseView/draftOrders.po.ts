import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { Page } from "@playwright/test";

export class DraftOrdersPage extends CaseAccessViewPage {
  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    // double check this is the right name
    await this.page.getByRole("tab", { name: "Draft Orders" }).click();
  }

  // TODO: add rest of stuff required to check draft orders
}
