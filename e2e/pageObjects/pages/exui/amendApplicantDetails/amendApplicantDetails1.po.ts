import { Page, Locator, expect } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";

// more details and page asserts to be added as needed in the future

interface ApplicantName {
  firstname: string;
  surname: string;
}
interface RespondentName {
  firstname: string;
  surname: string;
}

export class AmendApplicantDetails1 extends EventPage {

  private readonly applicantFirstNameField: Locator = this.page
    .locator("#applicants_0_firstName")
      .first();

  private readonly applicantLastNameField: Locator = this.page
    .locator("#applicants_0_lastName")
    .first();

  constructor(page: Page) {
    super(page, "Amend applicant details");
  }

  async updateApplicantsName(
    firstname: string,
    surname: string,
  ): Promise<void> {
    await this.applicantFirstNameField.fill(firstname);
    await this.applicantLastNameField.fill(surname);
  }
}
