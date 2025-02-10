import { Page, expect } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantGender } from "../../../../../common/types";
import { OtherPeopleInTheCase1Content } from "../../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseRevised1Content.";
import config from "../../../../../config";

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
  otherPersonLivesInRefugeYes = "#otherPartyInTheCaseRevised_0_liveInRefuge_Yes",
  otherPersonLivesInRefugeNo = "#otherPartyInTheCaseRevised_0_liveInRefuge_No",
  uploadC8FormLabel = "label[for='otherPartyInTheCaseRevised_0_refugeConfidentialityC8Form'] .form-label",
  uploadC8FormHint = "label[for='otherPartyInTheCaseRevised_0_refugeConfidentialityC8Form'] + .form-hint",
  c8RefugeFormUploadFileInput = "#otherPartyInTheCaseRevised_0_refugeConfidentialityC8Form",
  applicantAddressDropdown = "#otherPartyInTheCaseRevised_0_address_address_addressList",
  applicantLivedAtAddressLessThan5YearsYes = "#otherPartyInTheCaseRevised_0_isAtAddressLessThan5Years_Yes",
  addressFields = "div > ccd-field-write > div > ccd-write-complex-type-field > div > fieldset > ccd-field-write > div > ccd-write-address-field > div > ccd-write-complex-type-field > div > fieldset > ccd-field-write > div > ccd-write-text-field > div > label > span.form-label",
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
  addressConfidentialNo = "#otherPartyInTheCaseRevised_0_isAddressConfidential_No",
  address5YearsDetailsRequiredInput = "#otherPartyInTheCaseRevised_0_addressLivedLessThan5YearsDetails",
  emailAddressInput = "#otherPartyInTheCaseRevised_0_email",
  emailAddressConfidentialNo = "#otherPartyInTheCaseRevised_0_isEmailAddressConfidential_No",
  contactNumberInput = "#otherPartyInTheCaseRevised_0_phoneNumber",
  contactNumberConfidentialityNo = "#otherPartyInTheCaseRevised_0_isPhoneNumberConfidential_No",
}

enum HiddenFields {
  gender = "div#otherPartyInTheCaseRevised_0_gender > fieldset > legend > label",
  lessThan5Years = "div#otherPartyInTheCaseRevised_0_isAtAddressLessThan5Years > fieldset > legend ",
  dayMonthYear = "div > ccd-field-write > div > ccd-write-complex-type-field > div > fieldset > ccd-field-write > div > ccd-write-date-container-field > ccd-write-date-field > div > fieldset > cut-date-input > div > div > .form-label",
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
    yesNoOtherPeopleInTheCase: boolean,
    otherPersonLivesInRefuge: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(
      page,
      errorMessaging,
      yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge,
      applicantGender,
    );
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
    await page.click(`${UniqueSelectors.applicantBirthDateYes}`);
    await page.fill(
      `${UniqueSelectors.dateOfBirthDay}`,
      OtherPeopleInTheCase1Content.day,
    );
    await page.click(`${UniqueSelectors.applicantCurrentAddressYes}`);
    await page.click(`${UniqueSelectors.applicantCurrentAddressYes}`);
    await page.click(
      `${UniqueSelectors.applicantLivedAtAddressLessThan5YearsYes}`,
    );
    await page.click(`${UniqueSelectors.applicantEmailAddressYes}`);
    await page.click(`${UniqueSelectors.applicantContactNumberYes}`);
    await page.waitForTimeout(5000);
    await page.click(
      `${Selectors.button}:text-is("${OtherPeopleInTheCase1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${OtherPeopleInTheCase1Content.errorMessageInvalidDOBValidation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${OtherPeopleInTheCase1Content.errorMessageInvalidDOBErrorMessage}")`,
        1,
      ),
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
    ]);
  }

  private static async fillInFields(
    page: Page,
    errorMessaging: boolean,
    yesNoOtherPeopleInTheCase: boolean,
    otherPersonLivesInRefuge: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    if (!errorMessaging) {
      await page.click(
        `${Selectors.button}:text-is("${OtherPeopleInTheCase1Content.addNew}")`,
      );
    }
    await this.checkFormLabelsWhenAddNewClicked(page);
    await page.fill(
      `${UniqueSelectors.applicantFirstNameInput}`,
      OtherPeopleInTheCase1Content.applicantFirstName,
    );
    await page.fill(
      `${UniqueSelectors.applicantLastNameInput}`,
      OtherPeopleInTheCase1Content.applicantLastName,
    );
    await page.fill(
      `${UniqueSelectors.applicantPreviousNameInput}`,
      OtherPeopleInTheCase1Content.applicantPrevName,
    );
    switch (applicantGender) {
      case "female":
        await page.click(`${UniqueSelectors.applicantGenderFemale}`);
        break;
      case "male":
        await page.click(`${UniqueSelectors.applicantGenderMale}`);
        break;
      case "other":
        await page.click(`${UniqueSelectors.applicantGenderOther}`);
        await this.preferredGenderValidation(page);
        await page.fill(
          `${UniqueSelectors.preferredGenderInput}`,
          OtherPeopleInTheCase1Content.loremIpsum,
        );
        break;
      default:
        console.log("Please select a gender");
    }
    if (yesNoOtherPeopleInTheCase) {
      await page.click(`${UniqueSelectors.applicantBirthDateYes}`);
      await page.fill(
        `${UniqueSelectors.dateOfBirthDay}`,
        OtherPeopleInTheCase1Content.day,
      );
      await page.fill(
        `${UniqueSelectors.dateOfBirthMonth}`,
        OtherPeopleInTheCase1Content.month,
      );
      await page.fill(
        `${UniqueSelectors.dateOfBirthYear}`,
        OtherPeopleInTheCase1Content.year,
      );
      await this.dateOfBirthValidation(page);
      await page.click(`${UniqueSelectors.applicantPlaceOfBirthKnownYes}`);
      await page.click(`${UniqueSelectors.applicantPlaceOfBirthKnownYes}`);
      await page.fill(
        `${UniqueSelectors.placeOfBirthInput}`,
        OtherPeopleInTheCase1Content.townOrCity,
      );
      await this.placeOfBirthValidation(page);

      await page.click(`${UniqueSelectors.applicantCurrentAddressYes}`);
      if (otherPersonLivesInRefuge) {
        await page.click(`${UniqueSelectors.otherPersonLivesInRefugeYes}`);
        await this.checkFormLabelsWhenOtherPersonLivesInRefugeYesIsClicked(
          page,
        );
        const fileInput = page.locator(
          `${UniqueSelectors.c8RefugeFormUploadFileInput}`,
        );
        await fileInput.setInputFiles(config.testPdfFile);
        await page.waitForSelector(
          `${Selectors.GovukErrorMessage}:text-is("${OtherPeopleInTheCase1Content.uploadingFile}")`,
          { state: "hidden" },
        );
      } else {
        await page.click(`${UniqueSelectors.otherPersonLivesInRefugeNo}`);
      }
      await page.fill(
        `${UniqueSelectors.applicantCurrentAddressInput}`,
        OtherPeopleInTheCase1Content.postcode,
      );
      await page
        .locator(
          `${Selectors.button}:text-is("${OtherPeopleInTheCase1Content.findAddressButton}")`,
        )
        .first()
        .click();
      await page.selectOption(
        `${UniqueSelectors.applicantAddressDropdown}`,
        OtherPeopleInTheCase1Content.address,
      );
      await this.AddressValidation(page);
      await page.click(
        `${UniqueSelectors.applicantLivedAtAddressLessThan5YearsYes}`,
      );
      await page.fill(
        `${UniqueSelectors.address5YearsDetailsRequiredInput}`,
        OtherPeopleInTheCase1Content.last5Years,
      );
      await this.checkApplicantAddress5Years(page);
      await page.click(`${UniqueSelectors.applicantEmailAddressYes}`);
      await page.fill(
        `${UniqueSelectors.emailAddressInput}`,
        OtherPeopleInTheCase1Content.applicantEmail,
      );
      await this.checkEmailAddress(page);
      await page.click(`${UniqueSelectors.applicantContactNumberYes}`);
      await page.fill(
        `${UniqueSelectors.contactNumberInput}`,
        OtherPeopleInTheCase1Content.phoneNumber,
      );
      await this.checkContactNumber(page);
    } else {
      await page.click(`${UniqueSelectors.applicantBirthDateNo}`);
      await page.click(`${UniqueSelectors.applicantPlaceOfBirthKnownNo}`);
      await page.click(`${UniqueSelectors.applicantCurrentAddressNo}`);
      await page.click(
        `${UniqueSelectors.applicantLivedAtAddressLessThan5YearsNo}`,
      );
      await page.click(`${UniqueSelectors.applicantEmailAddressNo}`);
      await page.click(`${UniqueSelectors.applicantContactNumberNo}`);
      await page.waitForTimeout(1000);
    }
    await page.waitForTimeout(2000);
    await page.click(
      `${Selectors.button}:text-is("${OtherPeopleInTheCase1Content.continue}")`,
    );
  }

  private static async checkFormLabelsWhenAddNewClicked(
    page: Page,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        11,
        OtherPeopleInTheCase1Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${HiddenFields.gender} > ${Selectors.GovukFormLabel}:text-is("${OtherPeopleInTheCase1Content.formLabel12}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${HiddenFields.lessThan5Years} > ${Selectors.GovukFormLabel}:text-is("${OtherPeopleInTheCase1Content.formLabel13}")`,
        1,
      ),
    ]);
  }

  private static async preferredGenderValidation(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${OtherPeopleInTheCase1Content.formLabel5}")`,
      1,
    );
  }

  private static async dateOfBirthValidation(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OtherPeopleInTheCase1Content.formLabelDateOfBirth}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${OtherPeopleInTheCase1Content.formHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${HiddenFields.dayMonthYear}:text-is("${OtherPeopleInTheCase1Content.formLabelDay}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${HiddenFields.dayMonthYear}:text-is("${OtherPeopleInTheCase1Content.formLabelMonth}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${HiddenFields.dayMonthYear}:text-is("${OtherPeopleInTheCase1Content.formLabelYear}")`,
        1,
      ),
    ]);
  }

  private static async placeOfBirthValidation(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${OtherPeopleInTheCase1Content.FormLabelPlaceOfBirth}")`,
      1,
    );
  }

  private static async AddressValidation(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OtherPeopleInTheCase1Content.FormLabelPostcode}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${OtherPeopleInTheCase1Content.formLabelBuildingAndStreet}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${OtherPeopleInTheCase1Content.formLabelAddressLine2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${OtherPeopleInTheCase1Content.formLabelAddressLine3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${OtherPeopleInTheCase1Content.formLabelTownOrCity}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${OtherPeopleInTheCase1Content.formLabelCounty}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${OtherPeopleInTheCase1Content.formLabelPostcodeZipcode}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${OtherPeopleInTheCase1Content.formLabelCountry}")`,
        1,
      ),
      await expect(page.locator(ApplicantAddressFields.line1)).toHaveValue(
        OtherPeopleInTheCase1Content.buildingAndStreet,
      ),
      await expect(page.locator(ApplicantAddressFields.line2)).toHaveValue(""),
      await expect(page.locator(ApplicantAddressFields.line3)).toHaveValue(""),
      await expect(page.locator(ApplicantAddressFields.town)).toHaveValue(
        OtherPeopleInTheCase1Content.townOrCity,
      ),
      await expect(page.locator(ApplicantAddressFields.county)).toHaveValue(""),
      await expect(page.locator(ApplicantAddressFields.postcode)).toHaveValue(
        OtherPeopleInTheCase1Content.postcode,
      ),
      await expect(page.locator(ApplicantAddressFields.country)).toHaveValue(
        OtherPeopleInTheCase1Content.country,
      ),
    ]);
  }

  private static async checkApplicantAddress5Years(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${OtherPeopleInTheCase1Content.formLabelApplicantAddressLessThan5Years}")`,
      1,
    );
  }

  private static async checkEmailAddress(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OtherPeopleInTheCase1Content.formLabelApplicantEmailAddress}")`,
        1,
      ),
    ]);
  }

  private static async checkContactNumber(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${OtherPeopleInTheCase1Content.formLabelApplicantContactNumber}")`,
      1,
    );
  }

  private static async checkFormLabelsWhenOtherPersonLivesInRefugeYesIsClicked(
    page: Page,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.uploadC8FormLabel}:text-is("${OtherPeopleInTheCase1Content.formLabelC8FormUpload}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.uploadC8FormHint}:text-is("${OtherPeopleInTheCase1Content.c8FormUploadHint}")`,
        1,
      ),
    ]);
  }
}
