import { CaseAccessViewPage } from "../caseAccessView.po.js";
import { Page } from "@playwright/test";

export class SolicitorTasksPage extends CaseAccessViewPage {
  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Tasks" }).click();
  }
}
