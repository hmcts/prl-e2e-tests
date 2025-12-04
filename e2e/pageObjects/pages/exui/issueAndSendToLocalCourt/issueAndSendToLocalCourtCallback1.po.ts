import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.js";
import { Selectors } from "../../../../common/selectors.js";

export class IssueAndSendToLocalCourtCallback1Page extends EventPage {
  readonly formLabel: Locator = this.page.locator(Selectors.GovukFormLabel, {
    hasText: "Select from the list of courts",
  });

  readonly localCourtText: Locator = this.page.locator(Selectors.p, {
    hasText: "Let the local court admin know there’s a new case",
  });

  readonly courtListDropdown: Locator = this.page.locator("#courtList");

  constructor(page: Page) {
    super(page, "Issue and send to local court");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.localCourtText).toBeVisible();
    await expect(this.formLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectCourt(courtName: string): Promise<void> {
    await this.courtListDropdown.selectOption(courtName);
  }
}
