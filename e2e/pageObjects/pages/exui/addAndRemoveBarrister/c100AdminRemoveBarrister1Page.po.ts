import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class C100AdminRemoveBarrister1Page extends EventPage {
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly partyToRemoveBarristerCheckbox: Locator = this.page.locator(
    '[id^="allocatedBarrister_partyList_"]',
  );

  private readonly textLabel1: Locator = this.page.locator(Selectors.Span, {
    hasText: "Select a party to remove a Barrister",
  });

  constructor(page: Page) {
    super(page, "Remove barrister");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.textLabel1).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async selectPartyToRemoveBarrister(): Promise<void> {
    await this.partyToRemoveBarristerCheckbox.check();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
