import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class C100AmendApplicantDetails1ShortPage extends EventPage {
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly previousButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.previous,
    },
  );
    private readonly submitButton: Locator = this.page.locator(
        Selectors.button,
        {
            hasText: CommonStaticText.submit,
        },
    );

  constructor(page: Page) {
    super(page, "Amend applicant details");
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
    
    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }
}
