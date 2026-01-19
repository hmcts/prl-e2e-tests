import { expect, Locator, Page } from "@playwright/test";
import { DateHelperUtils } from "../../../utils/dateHelpers.utils.js";

export class CaseFlagSectionComponent {
  private readonly dateHelper: DateHelperUtils = new DateHelperUtils();

  constructor(private page: Page) {}

  async assertCaseFlagPresent(
    recipient: string,
    adjustment: string,
    reason: string,
    status: string = "Requested",
    modified: boolean = false,
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
    // if the flag has been modified then the date will show under 2 columns instead of 1
    await expect(caseFlagSection.getByText(date)).toHaveCount(modified ? 2 : 1);
    await expect(caseFlagSection.getByText(status)).toBeVisible();
  }
}
