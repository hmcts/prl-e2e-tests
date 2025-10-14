import { EventPage } from "../eventPage.po.js";
import { Locator, Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class C100NocSubmitPage extends EventPage {
  private readonly SubmitButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.submit,
  });
  private readonly detailsAccurateCheckbox: Locator =
    this.page.locator("#affirmation");
  private readonly notifyEveryPartyCheckbox: Locator =
    this.page.locator("#notifyEveryParty");

  constructor(page: Page) {
    super(page, "Enter your client's details");
  }

  async checkBoxes(): Promise<void> {
    await this.detailsAccurateCheckbox.check();
    await this.notifyEveryPartyCheckbox.check();
  }

  async clickSubmit(): Promise<void> {
    await this.SubmitButton.click();
    // extra await to avoid test failure due to timeout, to be investigated/removed in the future
    await expect(
      this.page.getByRole("link", { name: "Notice of change" }),
    ).toBeVisible();
  }
}
