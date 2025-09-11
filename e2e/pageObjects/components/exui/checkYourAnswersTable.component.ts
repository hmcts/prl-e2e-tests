import { Page, Locator, expect } from "@playwright/test";

export class CheckYourAnswersTable {
  readonly page: Page;
  readonly table: Locator;

  constructor(page: Page, selector: string = "table.form-table") {
    this.page = page;
    this.table = page.locator(selector);
  }

  async checkAnswer(label: string, expected: string) {
    const row = this.table.locator(`tr:has(th:has-text("${label}"))`);
    const cell = row.locator("td").first();
    await expect(cell).toContainText(expected);
  }

  async checkYesNo(label: string, yes: boolean) {
    const expected = yes ? "Yes" : "No";
    await this.checkAnswer(label, expected);
  }

  async clickChange(label: string) {
    const row = this.table.locator(`tr:has(th:has-text("${label}"))`);
    await row.locator("a:has-text('Change')").click();
  }

  async sectionHeading(heading: string) {
    await expect(
      this.page.getByRole("heading", { level: 2, name: heading }),
    ).toBeVisible();
  }
}
