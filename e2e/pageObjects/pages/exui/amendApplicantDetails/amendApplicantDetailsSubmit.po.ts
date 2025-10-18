import { Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";

// more details and page asserts to be added as needed in the future
export class AmendApplicantDetailsSubmit extends EventPage {
  constructor(page: Page) {
    super(page, "Amend applicant details");
  }

  async clickSaveAndContinue(caseworkerPage): Promise<void> {
    await caseworkerPage
      .getByRole("button", { name: "Save and continue" })
      .click();
  }
}
