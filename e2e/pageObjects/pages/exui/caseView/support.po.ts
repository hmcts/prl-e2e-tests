import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";

export class SupportPage extends CaseAccessViewPage {
  private readonly heading: Locator = this.page.getByRole("heading", {
    name: "Case Flags",
  });
  private readonly dateHelper: DateHelperUtils = new DateHelperUtils();

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Support" }).click();
    await expect(this.heading).toBeVisible();
  }

  async assertCaseFlag(
    recipient: string,
    adjustment: string,
    reason: string,
    status: string = "Requested",
  ): Promise<void> {
    const caseFlagSection: Locator = this.page.locator("ccd-case-flag-table", {
      hasText: recipient,
    });
    // table headings
    await expect(caseFlagSection.getByText("Party level flags")).toBeVisible();
    await expect(caseFlagSection.getByText("Comments")).toBeVisible();
    await expect(caseFlagSection.getByText("Creation date")).toBeVisible();
    await expect(caseFlagSection.getByText("Last modified")).toBeVisible();
    await expect(caseFlagSection.getByText("Flag status")).toBeVisible();
    // table contents
    await expect(caseFlagSection.getByText(adjustment)).toBeVisible();
    await expect(caseFlagSection.getByText(reason)).toBeVisible();
    const date: string = this.dateHelper.todayDate() as string;
    await expect(caseFlagSection.getByText(date)).toHaveCount(2);
    await expect(caseFlagSection.getByText(status)).toBeVisible();
  }
}
