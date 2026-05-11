import { EventPage } from "../../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";

export class ManageOrder102Page extends EventPage {
  private readonly wasTheOrderApprovedAtAHearingLabel: Locator =
    this.page.getByText("Was the order approved at a hearing?");
  private readonly yesLabel: Locator = this.page.getByText("Yes");
  private readonly noLabel: Locator = this.page.getByText("No", {
    exact: true,
  });
  private readonly atWhichHearingWasTheHearingApprovedLabel: Locator =
    this.page.getByText("At which hearing was the order approved?");
  private readonly hearingsDropdown: Locator = this.page.locator(
    "#customOrderHearingsType",
  );

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.wasTheOrderApprovedAtAHearingLabel).toBeVisible();
    await expect(this.yesLabel).toBeVisible();
    await expect(this.noLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectWasTheOrderApprovedAtAHearing(
    isApprovedAtAHearing: boolean,
    hearingName?: string,
  ) {
    await this.page
      .getByRole("radio", { name: isApprovedAtAHearing ? "Yes" : "No" })
      .check();
    if (isApprovedAtAHearing) {
      await expect(this.atWhichHearingWasTheHearingApprovedLabel).toBeVisible();
      await this.hearingsDropdown.selectOption(hearingName);
    }
  }
}
