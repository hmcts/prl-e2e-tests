import { EventPage } from "../eventPage.po.js";
import { Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class C100NocSubmitPage extends EventPage {
  private readonly SubmitButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.submit,
    },
  );
  private readonly detailsAccurateCheckbox: Locator = this.page.locator('#affirmation');
  private readonly notifyEveryPartyCheckbox: Locator = this.page.locator('#notifyEveryParty');

  constructor(page: Page) {
    super(page, "Enter your client's details");
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

  async checkBoxes(
  ): Promise<void> {
      await this.detailsAccurateCheckbox.check();
      await this.notifyEveryPartyCheckbox.check();
  }

  async clickSubmit(): Promise<void> {
    await this.SubmitButton.click();
  }
}
