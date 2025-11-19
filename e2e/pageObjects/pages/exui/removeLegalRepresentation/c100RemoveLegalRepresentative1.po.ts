import { EventPage } from "../eventPage.po.js";
import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class C100RemoveLegalRepresentative1Page extends EventPage {
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
}
