import { Page, Locator } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";

// more details and page asserts to be added as needed in the future

export class AmendRespondentDetails1 extends EventPage {
  private readonly c100respondentFirstNameField: Locator = this.page
    .locator("#respondents_0_firstName")
    .first();
  private readonly c100respondentLastNameField: Locator = this.page
    .locator("#respondents_0_lastName")
    .first();
  private readonly c100respondentEmailConfidential0: Locator = this.page
    .locator("#respondents_0_isEmailAddressConfidential_No")
    .first();
  private readonly c100respondentEmailConfidential1: Locator = this.page
    .locator("#respondents_1_isEmailAddressConfidential_No")
    .first();
  private readonly c100respondentEmailConfidential2: Locator = this.page
    .locator("#respondents_2_isEmailAddressConfidential_No")
    .first();
  private readonly fl401respondentFirstNameField: Locator = this.page
    .locator("#respondentsFL401_firstName")
    .first();
  private readonly fl401respondentLastNameField: Locator = this.page
    .locator("#respondentsFL401_lastName")
    .first();
  private readonly fl401respondentEmailConfidential: Locator = this.page
    .locator("#respondentsFL401_isEmailAddressConfidential_No")
    .first();

  constructor(page: Page) {
    super(page, "Amend respondent details");
  }

  async c100updateRespondentsName(
    firstname: string,
    surname: string,
  ): Promise<void> {
    await this.c100respondentFirstNameField.fill(firstname);
    await this.c100respondentLastNameField.fill(surname);
    await this.c100respondentEmailConfidential0.check();
    await this.c100respondentEmailConfidential1.check();
    await this.c100respondentEmailConfidential2.check();
  }

  async fl401updateRespondentsName(
    firstname: string,
    surname: string,
  ): Promise<void> {
    await this.fl401respondentFirstNameField.fill(firstname);
    await this.fl401respondentLastNameField.fill(surname);
    await this.fl401respondentEmailConfidential.check();
  }
}
