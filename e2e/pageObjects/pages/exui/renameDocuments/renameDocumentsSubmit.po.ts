import { EventPage } from "../eventPage.po.js";
import { Page } from "@playwright/test";

export class RenameDocumentsSubmitPage extends EventPage {
  constructor(page: Page) {
    super(page, "Rename documents");
  }

  async submit(): Promise<void> {
    // Check Your Answers uses either "Save and continue" or "Submit".
    if (await this.saveAndContinueButton.isVisible()) {
      await this.saveAndContinueButton.click();
    } else {
      await this.clickSubmit();
    }
  }
}
