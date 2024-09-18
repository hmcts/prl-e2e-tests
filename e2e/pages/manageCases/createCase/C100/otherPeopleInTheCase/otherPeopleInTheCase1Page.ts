import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { OtherPeopleInTheCase1Content } from "../../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseRevised1Content.";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ApplicantGender } from "../applicantDetails/applicantDetails1Page";

enum UniqueSelectors {
  applicantFirstNameInput = "#otherPartyInTheCaseRevised_0_firstName",
  applicantLastNameInput = "#otherPartyInTheCaseRevised_0_lastName",
  applicantPreviousNameInput = "#otherPartyInTheCaseRevised_0_previousName",
  applicantBirthDateYes = "#otherPartyInTheCaseRevised_0_isDateOfBirthKnown_Yes",
  applicantBirthDateNo = "#otherPartyInTheCaseRevised_0_isDateOfBirthKnown_No",
  applicantGenderMale = "#otherPartyInTheCaseRevised_0_gender-male",
  applicantGenderFemale = "#otherPartyInTheCaseRevised_0_gender-female",
  applicantGenderOther = "#otherPartyInTheCaseRevised_0_gender-other",
  applicantPlaceOfBirthKnownYes = "#otherPartyInTheCaseRevised_0_isPlaceOfBirthKnown_Yes",
  applicantPlaceOfBirthKnownNo = "#otherPartyInTheCaseRevised_0_isPlaceOfBirthKnown_No",
  applicantCurrentAddressYes = "#otherPartyInTheCaseRevised_0_isCurrentAddressKnown_Yes",
  applicantCurrentAddressNo = "#otherPartyInTheCaseRevised_0_isCurrentAddressKnown_No",
  applicantLivedAtAddressLessThan5YearsYes = "#otherPartyInTheCaseRevised_0_isAtAddressLessThan5Years_Yes",
  applicantLivedAtAddressLessThan5YearsNo = "#otherPartyInTheCaseRevised_0_isAtAddressLessThan5Years_No",
  applicantEmailAddressYes = "#otherPartyInTheCaseRevised_0_canYouProvideEmailAddress_Yes",
  applicantEmailAddressNo = "#otherPartyInTheCaseRevised_0_canYouProvideEmailAddress_No",
  applicantContactNumberYes = "#otherPartyInTheCaseRevised_0_canYouProvidePhoneNumber_Yes",
  applicantContactNumberNo = "#otherPartyInTheCaseRevised_0_canYouProvidePhoneNumber_No",
  dateOfBirthDay = "#dateOfBirth-day",
  dateOfBirthMonth = "#dateOfBirth-month",
  dateOfBirthYear = "#dateOfBirth-year",
  preferredGenderInput = "#otherPartyInTheCaseRevised_0_otherGender",
  placeOfBirthInput = "#otherPartyInTheCaseRevised_0_placeOfBirth",
  applicantCurrentAddressInput = "#otherPartyInTheCaseRevised_0_address_address_postcodeInput",
  addressConfidentialYes = "#otherPartyInTheCaseRevised_0_isAddressConfidential_Yes",
  addressConfidentialNo = "#otherPartyInTheCaseRevised_0_isAddressConfidential_No",
  address5YearsDetailsRequiredInput = "#otherPartyInTheCaseRevised_0_addressLivedLessThan5YearsDetails",
  emailAddressInput = "#otherPartyInTheCaseRevised_0_email",
  emailAddressConfidentialYes = "#otherPartyInTheCaseRevised_0_isEmailAddressConfidential_Yes",
  emailAddressConfidentialNo = "#otherPartyInTheCaseRevised_0_isEmailAddressConfidential_No",
  contactNumberInput = "#otherPartyInTheCaseRevised_0_phoneNumber",
  contactNumberConfidentialityYes = "#otherPartyInTheCaseRevised_0_isPhoneNumberConfidential_Yes",
  contactNumberConfidentialityNo = "#otherPartyInTheCaseRevised_0_isPhoneNumberConfidential_No",
}

enum ApplicantAddressFields {
  line1 = "#otherPartyInTheCaseRevised_0_address__detailAddressLine1",
  line2 = "#otherPartyInTheCaseRevised_0_address__detailAddressLine2",
  line3 = "#otherPartyInTheCaseRevised_0_address__detailAddressLine3",
  town = "#otherPartyInTheCaseRevised_0_address__detailPostTown",
  county = "#otherPartyInTheCaseRevised_0_address__detailCounty",
  postcode = "#otherPartyInTheCaseRevised_0_address__detailPostCode",
  country = "#otherPartyInTheCaseRevised_0_address__detailCountry",
}

export class OtherPeopleInTheCase1Page {
  public static async otherPeopleInTheCase1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    // await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${OtherPeopleInTheCase1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${OtherPeopleInTheCase1Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${OtherPeopleInTheCase1Content.h2}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${OtherPeopleInTheCase1Content.addNew}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${OtherPeopleInTheCase1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${OtherPeopleInTheCase1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${OtherPeopleInTheCase1Content.errorMessageLived5YearsInAddress}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${OtherPeopleInTheCase1Content.errorMessageLived5YearsInAddress}")`,
        1,
      ),
    ]);
    await page.click(`${UniqueSelectors.applicantBirthDateYes}`)
    await page.fill(
      `${UniqueSelectors.dateOfBirthDay}`,
      OtherPeopleInTheCase1Content.day
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorMessage}:text-is("${OtherPeopleInTheCase1Content.errorMessageInvalidDOB}")`,
      1,
    ),

    await page.click(`${UniqueSelectors.applicantCurrentAddressYes}`);
    await page.click(`${UniqueSelectors.applicantEmailAddressYes}`);
    await page.click(`${UniqueSelectors.applicantContactNumberYes}`);
    await page.click(`${UniqueSelectors.applicantEmailAddressYes}`);
    await page.click(
      `${Selectors.button}:text-is("${OtherPeopleInTheCase1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${OtherPeopleInTheCase1Content.errorMessage5YearsDetailsRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${OtherPeopleInTheCase1Content.errorMessage5YearsDetailsRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${OtherPeopleInTheCase1Content.errorMessageAddressConfidential}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${OtherPeopleInTheCase1Content.errorMessageAddressConfidential}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${OtherPeopleInTheCase1Content.errorMessageEmailConfidential}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${OtherPeopleInTheCase1Content.errorMessageEmailConfidential}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${OtherPeopleInTheCase1Content.errorMessageContactNumberConfidential}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${OtherPeopleInTheCase1Content.errorMessageContactNumberConfidential}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    yesNoOtherPeopleInTheCase: boolean,
    applicantGender: ApplicantGender, // type ApplicantGender = "female" | "male" | "other";
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${OtherPeopleInTheCase1Content.addNew}")`,
    );
    await page.fill(`${UniqueSelectors.applicantFirstNameInput}`, OtherPeopleInTheCase1Content.applicantFirstName)
    await page.fill(`${UniqueSelectors.applicantLastNameInput}`, OtherPeopleInTheCase1Content.applicantLastName)
    await page.fill(`${UniqueSelectors.applicantPreviousNameInput}`, OtherPeopleInTheCase1Content.applicantPrevName)
    switch (applicantGender) {
      case "female":
        await page.click(`${UniqueSelectors.applicantGenderFemale}`)
        break;
      case "male":
        await page.click(`${UniqueSelectors.applicantGenderMale}`)
        break;
      case "other":
        await page.click(`${UniqueSelectors.applicantGenderOther}`);
        await page.fill(`${UniqueSelectors.preferredGenderInput}`, OtherPeopleInTheCase1Content.loremIpsum)
        break;
      default:
        console.log("Please select a gender")
    }
  }

  private static async AddressValidation(page: Page): Promise<void> {}

  private static async checkApplicantAddress5Years(page: Page): Promise<void> {}

  private static async checkEmailAddress(page: Page): Promise<void> {}
}
