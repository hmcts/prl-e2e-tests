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
}
