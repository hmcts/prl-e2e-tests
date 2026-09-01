import { expect, Locator, Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Base } from "../../base.po.ts";

export class HearingsPage extends Base {
  readonly hearingsTab: Locator = this.page.getByRole("tab", {
    name: "Hearings",
  });
  readonly requestAHearingButton: Locator = this.page.getByRole("button", {
    name: CommonStaticText.hearingRequest,
    exact: true,
  });
  readonly currentAndUpcomingHearingsTable: Locator = this.page
    .getByRole("table")
    .filter({
      has: this.page.getByRole("columnheader", {
        name: "Current and upcoming",
        exact: true,
      }),
    });

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          /.*\/api\/prd\/lov\/getLovRefData.*/.test(response.url()) &&
          response.status() === 200,
      ),
      this.hearingsTab.click(),
    ]);
    await expect(this.requestAHearingButton).toBeVisible();
  }

  async requestAHearing(): Promise<void> {
    await this.requestAHearingButton.click();
  }

  async assertHearingAdded(): Promise<void> {
    const waitingToBeListedStatus = this.page.locator("strong.govuk-tag", {
      hasText: /^WAITING TO BE LISTED\s*$/,
    });
    const hearingRow = this.currentAndUpcomingHearingsTable
      .getByRole("row")
      .filter({ has: waitingToBeListedStatus });

    await expect(hearingRow).toBeVisible();
    await expect(hearingRow.getByRole("cell").nth(1)).toHaveText(/^\d+$/);
  }
}
