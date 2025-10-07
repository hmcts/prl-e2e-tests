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
    private readonly partyToRemoveBarristerCheckbox: Locator = this.page.locator('[id^="allocatedBarrister_partyList_"]');

  constructor(page: Page) {
    super(page, "Remove barrister");
  }

  // async assertPageContents(existingRepresentative: string[]): Promise<void> {
  //   await this.assertPageHeadings();
  //   for (const representative of existingRepresentative) {
  //     await expect(
  //       this.page.locator(Selectors.p, { hasText: representative }),
  //     ).toBeVisible();
  //   }

  //   await expect(this.continueButton).toBeVisible();
  //   await expect(this.previousButton).toBeVisible();
  // }

  // async selectPartyToAddBarrister(
  //   existingRepresentative: string[],
  // ): Promise<void> {
  //   for (const representative of existingRepresentative) {
  //     await this.page.getByLabel(representative).check();
  //   }
  // }
    
  async selectPartyToRemoveBarrister(
  ): Promise<void> {
    await this.partyToRemoveBarristerCheckbox.check();
}

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
