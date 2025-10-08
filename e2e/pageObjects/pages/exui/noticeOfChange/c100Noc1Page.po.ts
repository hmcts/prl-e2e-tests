import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class C100Noc1Page extends EventPage {
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly caseNumberField: Locator = this.page.locator("#caseRef");

  constructor(page: Page) {
    super(page, "Notice of change");
  }

  //   async assertPageContents(existingRepresentatives: string[]): Promise<void> {
  //     await this.assertPageHeadings();
  //     for (const representative of existingRepresentatives) {
  //       await expect(
  //         this.page.locator(Selectors.p, { hasText: representative }),
  //       ).toBeVisible();
  //     }
  //     await expect(this.continueButton).toBeVisible();
  //   }

  async fillInCaseNumber(caseNumber: string): Promise<void> {
    await this.caseNumberField.fill(caseNumber);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
