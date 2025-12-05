import { Page, Locator, expect } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";

// more details and page asserts to be added as needed in the future

interface RespondentName {
  firstname: string;
  surname: string;
}

export class AmendRespondentDetails1 extends EventPage {

  private readonly respondentFirstNameField: Locator = this.page
      .locator("#respondents_0_firstName")
      .first();
  private readonly respondentLastNameField: Locator = this.page
      .locator("#respondents_0_lastName")
      .first();
    private readonly respondentEmailConfidential0: Locator = this.page
        .locator("#respondents_0_isEmailAddressConfidential_No")
        .first();
    private readonly respondentEmailConfidential1: Locator = this.page
        .locator("#respondents_1_isEmailAddressConfidential_No")
        .first();
    private readonly respondentEmailConfidential2: Locator = this.page
        .locator("#respondents_2_isEmailAddressConfidential_No")
        .first();
    
  constructor(page: Page) {
    super(page, "Amend respondent details");
  }

  async updateApplicantsName(
    firstname: string,
    surname: string,
  ): Promise<void> {
    await this.respondentFirstNameField.fill(firstname);
    await this.respondentLastNameField.fill(surname);
    await this.respondentEmailConfidential0.check();
    await this.respondentEmailConfidential1.check();
    await this.respondentEmailConfidential2.check();
  }
}
