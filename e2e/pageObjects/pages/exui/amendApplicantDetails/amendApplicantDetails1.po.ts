import { Page, Locator } from "@playwright/test";
import { EventPage } from "../eventPage.po";

// more details and page asserts to be added as needed in the future

export class AmendApplicantDetails1 extends EventPage {
  private readonly c100applicantFirstNameField: Locator = this.page
    .locator("#applicants_0_firstName")
    .first();

  private readonly c100applicantLastNameField: Locator = this.page
    .locator("#applicants_0_lastName")
    .first();
  private readonly fl401applicantFirstNameField: Locator = this.page
    .locator("#applicantsFL401_firstName")
    .first();
  private readonly fl401applicantLastNameField: Locator = this.page
    .locator("#applicantsFL401_lastName")
    .first();

  constructor(page: Page) {
    super(page, "Amend applicant details");
  }

  async c100updateApplicantsName(
    firstname: string,
    surname: string,
  ): Promise<void> {
    await this.c100applicantFirstNameField.fill(firstname);
    await this.c100applicantLastNameField.fill(surname);
  }

  async fl401updateApplicantsName(
    firstname: string,
    surname: string,
  ): Promise<void> {
    await this.fl401applicantFirstNameField.fill(firstname);
    await this.fl401applicantLastNameField.fill(surname);
  }
}
