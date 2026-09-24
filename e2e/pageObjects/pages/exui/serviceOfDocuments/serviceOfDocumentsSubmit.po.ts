import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { expect, Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class ServiceOfDocumentsSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Service of documents", CommonStaticText.saveAndContinue);
  }

  async verifyAccessibility(): Promise<void> {
    // Ensure the page has finished rendering before running the audit.
    await expect(this.saveAndContinueButton).toBeEnabled();

    const documentButtons = this.page.locator(
      "ccd-read-document-field button.govuk-js-link",
    );
    for (const button of await documentButtons.all()) {
      await expect(button).toHaveText(/\S/);
    }

    await super.verifyAccessibility();
  }
}
