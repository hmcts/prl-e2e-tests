import { CaseAccessViewPage } from "../caseAccessView.po.js";
import { expect, Page } from "@playwright/test";

export class SolicitorTasksPage extends CaseAccessViewPage {
  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Tasks" }).click();
  }

  /** Asserts each named task link is present on the Tasks tab. */
  async assertTaskLinksVisible(taskLinks: string[]): Promise<void> {
    for (const taskLink of taskLinks) {
      await expect(
        this.page.getByRole("link", { name: taskLink, exact: true }),
      ).toBeVisible();
    }
  }
}
