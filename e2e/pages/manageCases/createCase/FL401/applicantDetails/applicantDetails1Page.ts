import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantDetails1Content } from "../../../../../fixtures/manageCases/createCase/FL401/applicantDetails/applicantDetails1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum uniqueSelectorPaths {
  dobFormLabel = "div > ccd-field-write > div > ccd-write-complex-type-field > div > fieldset > ccd-field-write > div > ccd-write-date-container-field > ccd-write-date-field > div > fieldset > cut-date-input > div > div",
  applicantFindAddress = `div#applicantsFL401_address_address_postcodeLookup`,
  solicitorFindAddress = `div#applicantsFL401_solicitorAddress_solicitorAddress_postcodeLookup`,
  applicantAddressUniqueSelector = "div > ccd-field-write > div > ccd-write-complex-type-field > div > fieldset > ccd-field-write > div > ccd-write-address-field > div > ccd-write-complex-type-field > div > fieldset > ccd-field-write > div > ccd-write-text-field > div > ",
}

enum applicantInputIDs {
  applicantFirstName = "#applicantsFL401_firstName",
  applicantLastName = "#applicantsFL401_lastName",
  applicantPreviousName = "#applicantsFL401_previousName",
  applicantBirthDay = `${uniqueSelectorPaths.dobFormLabel} > #dateOfBirth-day`,
  applicantBirthMonth = `${uniqueSelectorPaths.dobFormLabel} > #dateOfBirth-month`,
  applicantBirthYear = `${uniqueSelectorPaths.dobFormLabel} > #dateOfBirth-year`,
  applicantGenderFemale = "#applicantsFL401_gender-female",
  applicantGenderMale = "#applicantsFL401_gender-male",
  applicantGenderOther = "#applicantsFL401_gender-other",
  applicantGenderOtherInput = "#applicantsFL401_otherGender",
  applicantInputPostCode = "#applicantsFL401_address_address_postcodeInput",
  applicantSelectAddress = "#applicantsFL401_address_address_addressList",
  applicantBuildingAndStreet = "#applicantsFL401_address__detailAddressLine1",
  applicantAddressLine2 = "#applicantsFL401_address__detailAddressLine2",
  applicantAddressLine3 = "#applicantsFL401_address__detailAddressLine3",
  applicantCity = "#applicantsFL401_address__detailPostTown",
  applicantCounty = "#applicantsFL401_address__detailCounty",
  applicantPostalCode = "#applicantsFL401_address__detailPostCode",
  applicantCountry = "#applicantsFL401_address__detailCountry",
  confidentialAddressYes = "#applicantsFL401_isAddressConfidential_Yes",
  confidentialAddressNo = "#applicantsFL401_isAddressConfidential_No",
  canProvideEmailAddressYes = "#applicantsFL401_canYouProvideEmailAddress_Yes",
  canProvideEmailAddressNo = "#applicantsFL401_canYouProvideEmailAddress_No",
  applicantEmailAddress = "#applicantsFL401_email",
  confidentialEmailYes = "#applicantsFL401_isEmailAddressConfidential_Yes",
  confidentialEmailNo = "#applicantsFL401_isEmailAddressConfidential_No",
  applicantPhoneNumber = "#applicantsFL401_phoneNumber",
  confidentialPhoneNumberYes = "#applicantsFL401_isPhoneNumberConfidential_Yes",
  confidentialPhoneNumberNo = "#applicantsFL401_isPhoneNumberConfidential_No",
  solicitorFirstName = "#applicantsFL401_representativeFirstName",
  solicitorLastName = "#applicantsFL401_representativeLastName",
  solicitorEmailAddress = "#applicantsFL401_solicitorEmail",
  solicitorPhoneNumber = "#applicantsFL401_solicitorTelephone",
  solicitorReference = "#applicantsFL401_solicitorReference",
  organisationSearch = "#search-org-text",
  dxNumber = "#applicantsFL401_dxNumber",
  solicitorPostCode = "#applicantsFL401_solicitorAddress_solicitorAddress_postcodeInput",
  solicitorSelectAddress = "#applicantsFL401_solicitorAddress_solicitorAddress_addressList",
  solicitorBuildingAndStreet = "#applicantsFL401_solicitorAddress__detailAddressLine1",
  solicitorAddressLine2 = "#applicantsFL401_solicitorAddress__detailAddressLine2",
  solicitorAddressLine3 = "#applicantsFL401_solicitorAddress__detailAddressLine3",
  solicitorCity = "#applicantsFL401_solicitorAddress__detailPostTown",
  solicitorCounty = "#applicantsFL401_solicitorAddress__detailCounty",
  solicitorPostalCode = "#applicantsFL401_solicitorAddress__detailPostCode",
  solicitorCountry = "#applicantsFL401_solicitorAddress__detailCountry",
}



enum invalidPhoneNumbers {
  nonNumeric = "abcdef",
  tooShort = "12345678",
}

enum invalidDoB {
  applicantBirthDay = "h",
  applicantBirthMonth = "10",
  applicantBirthYear = "1990",
}


export class ApplicantDetails1Page {
  public static async applicantDetails1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrors(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ApplicantDetails1Content.headingL}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${ApplicantDetails1Content.formHintDoB}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantDetails1Content,
        'dateLabel',
        `${Selectors.GovukFormLabel}`
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantDetails1Content,
        "h2Heading",
        `${Selectors.h2}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ApplicantDetails1Content,
        "govParagraph",
        `${Selectors.p}`,
      ),
      Helpers.checkGroup(
        page,
        18,
        ApplicantDetails1Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ApplicantDetails1Content.cantEnterPostcode_2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${ApplicantDetails1Content.postcodeButton_2}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await this.fillInTopLevelFields(page);
    await this.fillInRadios(page);
    await this.fillInSecondLevelFields(page);
    await this.fillAndCheckAddressFields(page);
    await this.selectOrganisation(page);
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
  }

  private static async fillInTopLevelFields(page: Page): Promise<void> {
    for (let [key, input_value] of Object.entries(ApplicantDetails1Content)) {
      let input_id: string =
        applicantInputIDs[key as keyof typeof applicantInputIDs];
      await page.fill(input_id, "");
      await page.fill(input_id, input_value);
    }
  }

  private static async fillInRadios(page: Page): Promise<void> {
    const radiosToClick = [
      applicantInputIDs.applicantGenderOther,
      applicantInputIDs.confidentialAddressYes,
      applicantInputIDs.canProvideEmailAddressYes,
      applicantInputIDs.confidentialEmailYes,
      applicantInputIDs.confidentialPhoneNumberYes,
    ];
    for (let radioID of radiosToClick) {
      await page.click(radioID);
    }
  }

  private static async fillInSecondLevelFields(page: Page): Promise<void> {
    for (let [key, input_value] of Object.entries(ApplicantDetails1Content)) {
      let input_id: string =
        applicantInputIDs[key as keyof typeof applicantInputIDs];
      await page.fill(input_id, "");
      await page.fill(input_id, input_value);
    }
  }

  private static async fillAndCheckAddressFields(page: Page): Promise<void> {
    for (let person of ["applicant", "solicitor"]) {
      let findAddressUniqueKey =
        `${person}FindAddress` as keyof typeof uniqueSelectorPaths;
      await page.click(
        `${uniqueSelectorPaths[findAddressUniqueKey]} > button:text-is("${ApplicantDetails1Content.postcodeButton_2}")`,
      );
      let selectAddressID =
        `${person}SelectAddress` as keyof typeof applicantInputIDs;
      await page
        .locator(applicantInputIDs[selectAddressID])
        .selectOption({ index: 1 });
    }
    await this.addressValidation(page);
    await this.applicantAddressValidation(page);
    await this.solicitorAddressValidation(page);
  }

  private static async addressValidation(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.selectAddress}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        uniqueSelectorPaths.applicantAddressUniqueSelector +
          "label > " +
          `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.buildingAndStreet}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.buildingAndStreetOptional}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.addressLine2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.addressLine3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.townOrCity}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.addressCounty}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.postalCode}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.addressCountry}")`,
        2,
      ),
    ]);
  }

  private static async applicantAddressValidation(page: Page): Promise<void> {
    await Promise.all([
      expect(
        page.locator(applicantInputIDs.applicantBuildingAndStreet),
      ).toHaveValue(applicantDetails1Content.bpBuildingAndStreet),
      expect(page.locator(applicantInputIDs.applicantAddressLine2)).toHaveValue(
        applicantDetails1Content.bpAddressLine2,
      ),
      expect(page.locator(applicantInputIDs.applicantAddressLine3)).toHaveValue(
        applicantDetails1Content.bpAddressLine3,
      ),
      expect(page.locator(applicantInputIDs.applicantCity)).toHaveValue(
        applicantDetails1Content.bpCity,
      ),
      expect(page.locator(applicantInputIDs.applicantCounty)).toHaveValue(
        applicantDetails1Content.bpCounty,
      ),
      expect(page.locator(applicantInputIDs.applicantPostalCode)).toHaveValue(
        applicantDetails1Content.bpPostalCode,
      ),
      expect(page.locator(applicantInputIDs.applicantCountry)).toHaveValue(
        applicantDetails1Content.bpCountry,
      ),
    ]);
  }

  private static async solicitorAddressValidation(page: Page): Promise<void> {
    await Promise.all([
      expect(
        page.locator(applicantInputIDs.solicitorBuildingAndStreet),
      ).toHaveValue(applicantDetails1Content.bpBuildingAndStreet),
      expect(page.locator(applicantInputIDs.solicitorAddressLine2)).toHaveValue(
        applicantDetails1Content.bpAddressLine2,
      ),
      expect(page.locator(applicantInputIDs.solicitorAddressLine3)).toHaveValue(
        applicantDetails1Content.bpAddressLine3,
      ),
      expect(page.locator(applicantInputIDs.solicitorCity)).toHaveValue(
        applicantDetails1Content.bpCity,
      ),
      expect(page.locator(applicantInputIDs.solicitorCounty)).toHaveValue(
        applicantDetails1Content.bpCounty,
      ),
      expect(page.locator(applicantInputIDs.solicitorPostalCode)).toHaveValue(
        applicantDetails1Content.bpPostalCode,
      ),
      expect(page.locator(applicantInputIDs.solicitorCountry)).toHaveValue(
        applicantDetails1Content.bpCountry,
      ),
    ]);
  }

  private static async selectOrganisation(page: Page): Promise<void> {
    const orgSelector = `${Selectors.a}[title="Select the organisation ${ApplicantDetails1Content.organisationSearch}"]`;
    await page.click(orgSelector);
  }

  private static async checkErrors(page: Page): Promise<void> {
    await this.checkRequiredInputErrors(page);
    await this.checkValidationErrors(page);
  }

  private static async checkRequiredInputErrors(page: Page): Promise<void> {
    await this.checkTopLevelInputErrors(page);
    await this.checkSecondLevelInputErrors(page);
  }

  private static async checkTopLevelInputErrors(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
    await page.waitForSelector(
      `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorSummaryTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.postcodeErrorMessage_2}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        9,
        ApplicantDetails1Content,
        "topLevelInputErrorSummary",
        `${Selectors.GovukErrorValidation}`,
      ),
      Helpers.checkGroup(
        page,
        8,
        ApplicantDetails1Content,
        `topLevelInputErrorMessage`,
        `${Selectors.GovukErrorMessage}`,
      ),
    ]);
  }

  private static async checkSecondLevelInputErrors(page: Page): Promise<void> {
    await page.click(applicantInputIDs.applicantGenderOther);
    await page.click(applicantInputIDs.canProvideEmailAddressYes);
    await this.delayedClickContinue(page);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantDetails1Content,
        "secondLevelInputErrorSummary",
        `${Selectors.GovukErrorValidation}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantDetails1Content,
        "secondLevelInputErrorMessage",
        `${Selectors.GovukErrorMessage}`,
      ),
    ]);
  }

  private static async checkInvalidDoB(page: Page): Promise<void> {
    for (let [key, inputData] of Object.entries(invalidDoB)) {
      let inputKeyID = key as keyof typeof applicantInputIDs;
      await page.fill(applicantInputIDs[inputKeyID], "");
      await page.fill(applicantInputIDs[inputKeyID], inputData);
    }
    await this.delayedClickContinue(page);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.invalidDoBSummary}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.invalidDoBMessage}")`,
        1,
      ),
    ]);
  }

  private static async checkInvalidPhoneNumbers(page: Page): Promise<void> {
    await page.fill(
      applicantInputIDs.applicantPhoneNumber,
      invalidPhoneNumbers.nonNumeric,
    );
    await this.delayedClickContinue(page);
    await this.checkPhoneNumberValidationError(page);
    await page.fill(applicantInputIDs.applicantPhoneNumber, "");
    await page.fill(
      applicantInputIDs.applicantPhoneNumber,
      invalidPhoneNumbers.tooShort,
    );
    await this.delayedClickContinue(page);
    await this.checkPhoneNumberValidationError(page);
  }

  private static async checkPhoneNumberValidationError(
    page: Page,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.invalidApplicantPhoneSummary}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.invalidApplicantPhoneMessage}")`,
        1,
      ),
    ]);
  }

  private static async checkValidationErrors(page: Page): Promise<void> {
    await this.checkInvalidDoB(page);
    await this.checkInvalidPhoneNumbers(page);
  }

  private static async delayedClickContinue(
    page: Page,
    msDelay: number = 2000,
  ): Promise<void> {
    await page.waitForTimeout(msDelay);
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
  }
}
