import { EventPage } from "../eventPage.po.js";
import { Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class C100Noc2Page extends EventPage {
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly clientFirstNameField: Locator =
    this.page.locator('#NoCChallengeQ1');
  private readonly clientLastNameField: Locator =
    this.page.locator('#NoCChallengeQ2');

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

  async fillInPartyName(firstname: string, surname: string): Promise<void> {
    await this.clientFirstNameField.fill(firstname);
    await this.clientLastNameField.fill(surname);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
