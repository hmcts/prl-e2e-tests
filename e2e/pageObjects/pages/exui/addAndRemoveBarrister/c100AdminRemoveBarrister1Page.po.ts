import { EventPage } from "../eventPage.po";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";

export class C100AdminRemoveBarrister1Page extends EventPage {
  private readonly partyToRemoveBarristerCheckbox: Locator = this.page.locator(
    "#allocatedBarrister_partyList_",
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
}
