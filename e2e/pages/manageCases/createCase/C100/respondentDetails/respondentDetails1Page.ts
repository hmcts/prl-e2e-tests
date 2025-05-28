import { Page, expect } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { C100RespondentDetails1Content } from "../../../../../fixtures/manageCases/createCase/C100/respondentDetails/c100RespondentDetails1Content";

export type C100RespondentGender = "female" | "male" | "other";
export type C100RespondentAddress5Years = "yes" | "no" | "dontKnow";
export type C100RespondentLegalRepresentation = "yes" | "no" | "dontKnow";

interface respondent1DetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoRespondentDetailsC100: boolean;
  respondentGender: C100RespondentGender;
  respondentAddress5Years: C100RespondentAddress5Years;
  respondentLegalRepresentation: C100RespondentLegalRepresentation;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoRespondentDetailsC100: boolean;
  respondentGender: C100RespondentGender;
  respondentAddress5Years: C100RespondentAddress5Years;
  respondentLegalRepresentation: C100RespondentLegalRepresentation;
}

enum uniqueSelectors {
  respondentFirstName = "#respondents_0_firstName",
  respondentLastName = "#respondents_0_lastName",
  respondentPrevName = "#respondents_0_previousName",
  genderRadio = "#respondents_0_gender-",
  genderField = "#respondents_0_otherGender",
  dateOfBirthKnownYes = "#respondents_0_isDateOfBirthKnown_Yes",
  dateOfBirthKnownNo = "#respondents_0_isDateOfBirthKnown_No",
  dateOfBirthLabels = "div > ccd-field-write > div > ccd-write-complex-type-field >div > fieldset > ccd-field-write > div >ccd-write-date-container-field >ccd-write-date-field >div > fieldset >cut-date-input >div > div > .form-label",
  dateOfBirthDay = "#dateOfBirth-day",
  dateOfBirthMonth = "#dateOfBirth-month",
  dateOfBirthYear = "#dateOfBirth-year",
  respondent5YearsRadio = "#respondents_0_isAtAddressLessThan5YearsWithDontKnow-",
  respondent5YearsField = "#respondents_0_addressLivedLessThan5YearsDetails",
  respondentCurrentAddressYes = "#respondents_0_isCurrentAddressKnown_Yes",
  respondentCurrentAddressNo = "#respondents_0_isCurrentAddressKnown_No",
  respondentPostcodeField = "#respondents_0_address_address_postcodeInput",
  respondentAddressDropdown = "#respondents_0_address_address_addressList",
  representativePresent = "#respondents_0_doTheyHaveLegalRepresentation-",
  representativePostcodeField = "#respondents_0_solicitorAddress_solicitorAddress_postcodeInput",
  representativeAddressDropdown = "#respondents_0_solicitorAddress_solicitorAddress_addressList",
  placeOfBirthKnownYes = "#respondents_0_isPlaceOfBirthKnown_Yes",
  placeOfBirthKnownNo = "#respondents_0_isPlaceOfBirthKnown_No",
  placeOfBirthField = "#respondents_0_placeOfBirth",
  emailKnownYes = "#respondents_0_canYouProvideEmailAddress_Yes",
  emailKnownNo = "#respondents_0_canYouProvideEmailAddress_No",
  emailField = "#respondents_0_email",
  numberKnownYes = "#respondents_0_canYouProvidePhoneNumber_Yes",
  numberKnownNo = "#respondents_0_canYouProvidePhoneNumber_No",
  numberField = "#respondents_0_phoneNumber",
  representativeFirstNameField = "#respondents_0_representativeFirstName",
  representativeLastNameField = "#respondents_0_representativeLastName",
  representativeEmailField = "#respondents_0_solicitorEmail",
  representativeOrgSearchField = "#search-org-text",
  representativeDXNumberField = "#respondents_0_dxNumber",
}

enum RespondentAddressFields {
  line1 = "#respondents_0_address__detailAddressLine1",
  line2 = "#respondents_0_address__detailAddressLine2",
  line3 = "#respondents_0_address__detailAddressLine3",
  town = "#respondents_0_address__detailPostTown",
  county = "#respondents_0_address__detailCounty",
  postcode = "#respondents_0_address__detailPostCode",
  country = "#respondents_0_address__detailCountry",
}

enum RepresentativeAddressFields {
  line1 = "#respondents_0_solicitorAddress__detailAddressLine1",
  line2 = "#respondents_0_solicitorAddress__detailAddressLine2",
  line3 = "#respondents_0_solicitorAddress__detailAddressLine3",
  town = "#respondents_0_solicitorAddress__detailPostTown",
  county = "#respondents_0_solicitorAddress__detailCounty",
  postcode = "#respondents_0_solicitorAddress__detailPostCode",
  country = "#respondents_0_solicitorAddress__detailCountry",
}

export class RespondentDetails1Page {
  public static async respondent1DetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoRespondentDetailsC100: yesNoRespondentDetailsC100,
    respondentGender: respondentGender,
    respondentAddress5Years: respondentAddress5Years,
    respondentLegalRepresentation: respondentLegalRepresentation,
  }: respondent1DetailsPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({
      page,
      yesNoRespondentDetailsC100,
      respondentGender,
      respondentAddress5Years,
      respondentLegalRepresentation,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${C100RespondentDetails1Content.h21}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${C100RespondentDetails1Content.h22}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${C100RespondentDetails1Content.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        14,
        C100RespondentDetails1Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
    yesNoRespondentDetailsC100: yesNoRespondentDetailsC100,
    respondentGender: respondentGender,
    respondentAddress5Years: respondentAddress5Years,
    respondentLegalRepresentation: respondentLegalRepresentation,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${uniqueSelectors.respondentFirstName}`,
      C100RespondentDetails1Content.respondentFirstName,
    );
    await page.fill(
      `${uniqueSelectors.respondentLastName}`,
      C100RespondentDetails1Content.respondentLastName,
    );
    await page.fill(
      `${uniqueSelectors.respondentPrevName}`,
      C100RespondentDetails1Content.respondentPrevName,
    );
    await page.click(`${uniqueSelectors.genderRadio}${respondentGender}`);
    if (respondentGender === "other") {
      await this.handleOtherGender(page);
    }
    switch (respondentAddress5Years) {
      case "yes":
        await this.handleRespondent5YearsYes(page);
        break;
      default:
        await page.click(
          `${uniqueSelectors.respondent5YearsRadio}${respondentAddress5Years}`,
        );
        break;
    }
    if (respondentLegalRepresentation === "yes" && yesNoRespondentDetailsC100) {
      await page.click(`${uniqueSelectors.respondentCurrentAddressYes}`);
      await page.fill(
        `${uniqueSelectors.respondentPostcodeField}`,
        C100RespondentDetails1Content.postcode,
      );
      await page
        .locator(
          `${Selectors.button}:text-is("${C100RespondentDetails1Content.findAddressButton}")`,
        )
        .first()
        .click();
      await page.selectOption(
        `${uniqueSelectors.respondentAddressDropdown}`,
        C100RespondentDetails1Content.address,
      );
      await page.click(
        `${uniqueSelectors.representativePresent}${respondentLegalRepresentation}`,
      );
      await this.handleLegalRepresentationDetails(page);
      await page.fill(
        `${uniqueSelectors.representativePostcodeField}`,
        C100RespondentDetails1Content.postcode,
      );
      await page
        .locator(
          `${Selectors.button}:text-is("${C100RespondentDetails1Content.findAddressButton}")`,
        )
        .nth(1)
        .click();
      await page.selectOption(
        `${uniqueSelectors.representativeAddressDropdown}`,
        C100RespondentDetails1Content.address,
      );
      await this.handleAddress(page);
    } else {
      await page.click(`${uniqueSelectors.respondentCurrentAddressNo}`);
      await page.click(
        `${uniqueSelectors.representativePresent}${respondentLegalRepresentation}`,
      );
    }
    if (yesNoRespondentDetailsC100) {
      await this.handleDateOfBirthYes(page);
      await this.handlePlaceOfBirthYes(page);
      await this.handleEmailAddressYes(page);
      await this.handleContactNumberYes(page);
    } else {
      await page.click(`${uniqueSelectors.dateOfBirthKnownNo}`);
      await page.click(`${uniqueSelectors.placeOfBirthKnownNo}`);
      await page.click(`${uniqueSelectors.emailKnownNo}`);
      await page.click(`${uniqueSelectors.numberKnownNo}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${C100RespondentDetails1Content.continue}")`,
    );
  }

  private static async handleOtherGender(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelIdentifyAnotherWay}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.genderField}`,
      C100RespondentDetails1Content.otherGender,
    );
  }

  private static async handleDateOfBirthYes(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.dateOfBirthKnownYes}`);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelDateOfBirthKnownYesLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${C100RespondentDetails1Content.formHintDateOfBirth}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        C100RespondentDetails1Content,
        `formLabelDateOfBirthKnownYes`,
        `${uniqueSelectors.dateOfBirthLabels}`,
      ),
    ]);
    await page.fill(
      `${uniqueSelectors.dateOfBirthDay}`,
      C100RespondentDetails1Content.day,
    );
    await page.fill(
      `${uniqueSelectors.dateOfBirthMonth}`,
      C100RespondentDetails1Content.month,
    );
    await page.fill(
      `${uniqueSelectors.dateOfBirthYear}`,
      C100RespondentDetails1Content.year,
    );
  }

  private static async handlePlaceOfBirthYes(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.placeOfBirthKnownYes}`);
    await page.click(`${uniqueSelectors.placeOfBirthKnownYes}`);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelYes1}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.placeOfBirthField}`,
      C100RespondentDetails1Content.placeOfBirth,
    );
  }

  private static async handleEmailAddressYes(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.emailKnownYes}`);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelYes2}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.emailField}`,
      C100RespondentDetails1Content.respondentEmail,
    );
  }

  private static async handleContactNumberYes(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.numberKnownYes}`);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelYes3}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.numberField}`,
      C100RespondentDetails1Content.phoneNumber,
    );
  }

  private static async handleRespondent5YearsYes(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.respondent5YearsRadio}yes`);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelPrevAddresses}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.respondent5YearsField}`,
      C100RespondentDetails1Content.last5Years,
    );
  }

  private static async handleLegalRepresentationDetails(
    page: Page,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        5,
        C100RespondentDetails1Content,
        `formLabelSolicitorYes`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkGroup(
        page,
        5,
        C100RespondentDetails1Content,
        `h2Yes`,
        `${Selectors.h2}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${C100RespondentDetails1Content.strong}")`,
        1,
      ),
    ]);
    await page.fill(
      `${uniqueSelectors.representativeFirstNameField}`,
      `${C100RespondentDetails1Content.representativeFirstName}`,
    );
    await page.fill(
      `${uniqueSelectors.representativeLastNameField}`,
      `${C100RespondentDetails1Content.representativeLastName}`,
    );
    await page.fill(
      `${uniqueSelectors.representativeEmailField}`,
      `${C100RespondentDetails1Content.representativeEmail}`,
    );
    await page.fill(
      `${uniqueSelectors.representativeOrgSearchField}`,
      `${C100RespondentDetails1Content.org}`,
    );
    await page
      .locator(
        `${Selectors.a}:text-is("${C100RespondentDetails1Content.select}")`,
      )
      .first()
      .click();
    await page.fill(
      `${uniqueSelectors.representativeDXNumberField}`,
      `${C100RespondentDetails1Content.dxNumber}`,
    );
  }

  private static async handleAddress(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelSelectAddress}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelAddressLine2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelAddressLine3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelTownOrCity}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelCounty}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelPostcode}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100RespondentDetails1Content.formLabelCountry}")`,
        2,
      ),
      await expect(page.locator(RespondentAddressFields.line1)).toHaveValue(
        C100RespondentDetails1Content.buildingAndStreet,
      ),
      await expect(page.locator(RespondentAddressFields.line2)).toHaveValue(""),
      await expect(page.locator(RespondentAddressFields.line3)).toHaveValue(""),
      await expect(page.locator(RespondentAddressFields.town)).toHaveValue(
        C100RespondentDetails1Content.townOrCity,
      ),
      await expect(page.locator(RespondentAddressFields.county)).toHaveValue(
        "",
      ),
      await expect(page.locator(RespondentAddressFields.postcode)).toHaveValue(
        C100RespondentDetails1Content.postcode,
      ),
      await expect(page.locator(RespondentAddressFields.country)).toHaveValue(
        C100RespondentDetails1Content.country,
      ),
      await expect(page.locator(RepresentativeAddressFields.line1)).toHaveValue(
        C100RespondentDetails1Content.buildingAndStreet,
      ),
      await expect(page.locator(RepresentativeAddressFields.line2)).toHaveValue(
        "",
      ),
      await expect(page.locator(RepresentativeAddressFields.line3)).toHaveValue(
        "",
      ),
      await expect(page.locator(RepresentativeAddressFields.town)).toHaveValue(
        C100RespondentDetails1Content.townOrCity,
      ),
      await expect(
        page.locator(RepresentativeAddressFields.county),
      ).toHaveValue(""),
      await expect(
        page.locator(RepresentativeAddressFields.postcode),
      ).toHaveValue(C100RespondentDetails1Content.postcode),
      await expect(
        page.locator(RepresentativeAddressFields.country),
      ).toHaveValue(C100RespondentDetails1Content.country),
    ]);
  }
}
