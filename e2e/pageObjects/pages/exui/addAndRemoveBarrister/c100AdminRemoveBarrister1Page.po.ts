import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class C100AdminRemoveBarrister1Page extends EventPage {
  readonly continueButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.continue,
  });
  readonly previousButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.previous,
  });
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
    await expect(this.previousButton).toBeVisible();
  }

  async selectPartyToRemoveBarrister(
    existingRepresentativeRemoval: string[],
  ): Promise<void> {
    await this.page
      .getByRole("radio", { name: existingRepresentativeRemoval[0] })
      .check();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
