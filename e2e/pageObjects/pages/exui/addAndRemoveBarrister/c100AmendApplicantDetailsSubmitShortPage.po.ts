import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class C100AmendApplicantDetailsSubmitShortPage extends EventPage {
    private readonly submitButton: Locator = this.page.locator(
        Selectors.button,
        {
            hasText: CommonStaticText.submit,
        },
    );

  constructor(page: Page) {
    super(page, "Amend applicant details");
  }
    
    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }
}
