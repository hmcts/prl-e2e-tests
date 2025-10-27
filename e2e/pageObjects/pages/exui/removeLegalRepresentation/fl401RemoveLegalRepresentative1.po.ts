import { EventPage } from "../eventPage.po.ts";
import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
export class Fl401RemoveLegalRepresentative1Page extends EventPage {
  constructor(page: Page) {
    super(page, "Remove legal representative");
  }

  async assertPageContents(existingRepresentatives: string[]): Promise<void> {
    await this.assertPageHeadings();
    for (const representative of existingRepresentatives) {
      await expect(
        this.page.locator(Selectors.p, { hasText: representative }),
      ).toBeVisible();
    }
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectRepresentativesToRemove(
    existingRepresentatives: string[],
  ): Promise<void> {
    for (const representative of existingRepresentatives) {
      await this.page.getByLabel(representative).check();
    }
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
