import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class C100AmendApplicantDetailsSubmitShortPage extends EventPage {
  // private readonly saveAndContinueButton: Locator = this.page.locator(Selectors.button, {
  //   hasText: CommonStaticText.saveAndContinue,
  // });

  // constructor(page: Page) {
  //   super(page, "Amend applicant details");
  // }

  async clickSaveAndContinue(): Promise<void> {
    await caseworkerPage.getByRole('button', { name: "Continue" }).click();
  }

  public async endCaseworkerSession() {
    await this.page.close();
  }
}
