import { expect, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ApplicantGender } from "../../../../../common/types.ts";
import config from "../../../../../utils/config.utils.ts";
import { ApplicantDetails1Content } from "../../../../../fixtures/manageCases/createCase/FL401/applicantDetails/applicantDetails1Content.ts";

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
  applicantLivesInRefugeYes = "#applicantsFL401_liveInRefuge_Yes",
  applicantLivesInRefugeNo = "#applicantsFL401_liveInRefuge_No",
  c8RefugeFormUploadFileInput = "#applicantsFL401_refugeConfidentialityC8Form",
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
  solicitorInputPostCode = "#applicantsFL401_solicitorAddress_solicitorAddress_postcodeInput",
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
    yesNoFL401ApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrors(page);
    }
    await this.fillInFields(page, yesNoFL401ApplicantDetails, applicantGender);
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
        "dateLabel",
        `${uniqueSelectorPaths.dobFormLabel} > ${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ApplicantDetails1Content.h2Heading1}")`,
        1,
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
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.formLabelApplicantLivesInRefuge}")`,
        1,
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
    await expect(
      page
        .locator(Selectors.h2)
        .filter({ hasText: "Search for an organisation" })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator(Selectors.h2)
        .filter({ hasText: "Search for an organisation" })
        .last(),
    ).toBeVisible();
    await expect(
      page
        .locator(Selectors.h2)
        .filter({ hasText: "Search for an organisation" }),
    ).toHaveCount(2);
    await expect(
      page
        .locator(Selectors.h2)
        .filter({ hasText: "Organisation name and address" })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator(Selectors.h2)
        .filter({ hasText: "Organisation name and address" })
        .last(),
    ).toBeVisible();
    await expect(
      page
        .locator(Selectors.h2)
        .filter({ hasText: "Organisation name and address" }),
    ).toHaveCount(2);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    yesNoFL401ApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await this.fillInTopLevelFields(page);
    await this.fillInYesNoRadios(page, yesNoFL401ApplicantDetails);
    await this.fillInGenderRadio(page, applicantGender);
    if (yesNoFL401ApplicantDetails) {
      await this.uploadC8RefugeForm(page);
      await this.fillInSecondLevelFields(page, applicantGender);
      await this.fillInSecondLevelRadios(page, yesNoFL401ApplicantDetails);
    }
    await this.fillAndCheckAddressFields(page);
    await this.selectOrganisation(page);
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
  }

  private static async fillInTopLevelFields(page: Page): Promise<void> {
    await page.fill(
      applicantInputIDs.applicantFirstName,
      ApplicantDetails1Content.applicantFirstName,
    );
    await page.fill(
      applicantInputIDs.applicantLastName,
      ApplicantDetails1Content.applicantLastName,
    );
    await page.fill(
      applicantInputIDs.applicantPreviousName,
      ApplicantDetails1Content.applicantPreviousName,
    );
    await page.fill(
      applicantInputIDs.applicantBirthDay,
      ApplicantDetails1Content.applicantBirthDay,
    );
    await page.fill(
      applicantInputIDs.applicantBirthMonth,
      ApplicantDetails1Content.applicantBirthMonth,
    );
    await page.fill(
      applicantInputIDs.applicantBirthYear,
      ApplicantDetails1Content.applicantBirthYear,
    );
    await page.fill(
      applicantInputIDs.applicantInputPostCode,
      ApplicantDetails1Content.bpPostalCode,
    );
    await page.fill(
      applicantInputIDs.applicantPhoneNumber,
      ApplicantDetails1Content.applicantPhoneNumber,
    );
    await page.fill(
      applicantInputIDs.solicitorFirstName,
      ApplicantDetails1Content.solicitorFirstName,
    );
    await page.fill(
      applicantInputIDs.solicitorLastName,
      ApplicantDetails1Content.solicitorLastName,
    );
    await page.fill(
      applicantInputIDs.solicitorEmailAddress,
      ApplicantDetails1Content.solicitorEmailAddress,
    );
    await page.fill(
      applicantInputIDs.solicitorPhoneNumber,
      ApplicantDetails1Content.solicitorPhoneNumber,
    );
    await page.fill(
      applicantInputIDs.solicitorReference,
      ApplicantDetails1Content.solicitorReference,
    );
    await page.fill(
      applicantInputIDs.solicitorInputPostCode,
      ApplicantDetails1Content.bpPostalCode,
    );
    await page.fill(
      applicantInputIDs.dxNumber,
      ApplicantDetails1Content.dxNumber,
    );
    await page.fill(
      applicantInputIDs.organisationSearch,
      ApplicantDetails1Content.organisationSearch,
    );
  }

  private static async fillInYesNoRadios(
    page: Page,
    yesNoFL401ApplicantDetails: boolean,
  ): Promise<void> {
    if (yesNoFL401ApplicantDetails) {
      const radiosToClick = [
        applicantInputIDs.applicantLivesInRefugeYes,
        applicantInputIDs.confidentialAddressYes,
        applicantInputIDs.canProvideEmailAddressYes,
        applicantInputIDs.confidentialPhoneNumberYes,
      ];
      for (const radioID of radiosToClick) {
        await page.click(radioID);
      }
    } else {
      const radiosToClick = [
        applicantInputIDs.applicantLivesInRefugeNo,
        applicantInputIDs.confidentialAddressNo,
        applicantInputIDs.canProvideEmailAddressNo,
        applicantInputIDs.confidentialPhoneNumberNo,
      ];
      for (const radioID of radiosToClick) {
        await page.click(radioID);
      }
    }
  }

  private static async fillInGenderRadio(
    page: Page,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    switch (applicantGender) {
      case "female":
        await page.click(applicantInputIDs.applicantGenderFemale);
        break;
      case "male":
        await page.click(applicantInputIDs.applicantGenderMale);
        break;
      case "other":
        await page.click(applicantInputIDs.applicantGenderOther);
        await page.fill(
          applicantInputIDs.applicantGenderOtherInput,
          ApplicantDetails1Content.applicantGenderOtherInput,
        );
        break;
    }
  }

  private static async fillInSecondLevelFields(
    page: Page,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await page.fill(
      applicantInputIDs.applicantEmailAddress,
      ApplicantDetails1Content.applicantEmailAddress,
    );
    if (applicantGender === "other") {
      await page.fill(
        applicantInputIDs.applicantGenderOtherInput,
        ApplicantDetails1Content.applicantGenderOtherInput,
      );
    }
  }

  private static async fillInSecondLevelRadios(
    page: Page,
    yesNoFL401ApplicantDetails: boolean,
  ): Promise<void> {
    if (yesNoFL401ApplicantDetails) {
      await page.click(applicantInputIDs.confidentialEmailYes);
    } else {
      await page.click(applicantInputIDs.confidentialEmailNo);
    }
  }

  private static async fillAndCheckAddressFields(page: Page): Promise<void> {
    for (const person of ["applicant", "solicitor"]) {
      const findAddressUniqueKey =
        `${person}FindAddress` as keyof typeof uniqueSelectorPaths;
      await page.click(
        `${uniqueSelectorPaths[findAddressUniqueKey]} > button:text-is("${ApplicantDetails1Content.postcodeButton_2}")`,
      );
      await page.waitForSelector(
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.selectAddress}")`,
      );
      const selectAddressID =
        `${person}SelectAddress` as keyof typeof applicantInputIDs;
      await page
        .locator(applicantInputIDs[selectAddressID])
        .selectOption({ index: 1 });
    }
    await this.addressValidation(page);
    await this.applicantAddressValidation(page);
    await this.solicitorAddressValidation(page);
  }

  private static async uploadC8RefugeForm(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.formLabelC8FormUpload}"):visible`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.p}:text-is("${ApplicantDetails1Content.c8FormUploadP}"):visible`,
      1,
    );
    const fileInput = page.locator(
      `${applicantInputIDs.c8RefugeFormUploadFileInput}`,
    );
    await fileInput.setInputFiles(config.testPdfFile);
    await page.waitForSelector(
      `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.uploadingFile}")`,
      { state: "hidden" },
    );
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
      ).toHaveValue(ApplicantDetails1Content.bpBuildingAndStreet),
      expect(page.locator(applicantInputIDs.applicantAddressLine2)).toHaveValue(
        ApplicantDetails1Content.bpAddressLine2,
      ),
      expect(page.locator(applicantInputIDs.applicantAddressLine3)).toHaveValue(
        ApplicantDetails1Content.bpAddressLine3,
      ),
      expect(page.locator(applicantInputIDs.applicantCity)).toHaveValue(
        ApplicantDetails1Content.bpCity,
      ),
      expect(page.locator(applicantInputIDs.applicantCounty)).toHaveValue(
        ApplicantDetails1Content.bpCounty,
      ),
      expect(page.locator(applicantInputIDs.applicantPostalCode)).toHaveValue(
        ApplicantDetails1Content.bpPostalCode,
      ),
      expect(page.locator(applicantInputIDs.applicantCountry)).toHaveValue(
        ApplicantDetails1Content.bpCountry,
      ),
    ]);
  }

  private static async solicitorAddressValidation(page: Page): Promise<void> {
    await Promise.all([
      expect(
        page.locator(applicantInputIDs.solicitorBuildingAndStreet),
      ).toHaveValue(ApplicantDetails1Content.bpBuildingAndStreet),
      expect(page.locator(applicantInputIDs.solicitorAddressLine2)).toHaveValue(
        ApplicantDetails1Content.bpAddressLine2,
      ),
      expect(page.locator(applicantInputIDs.solicitorAddressLine3)).toHaveValue(
        ApplicantDetails1Content.bpAddressLine3,
      ),
      expect(page.locator(applicantInputIDs.solicitorCity)).toHaveValue(
        ApplicantDetails1Content.bpCity,
      ),
      expect(page.locator(applicantInputIDs.solicitorCounty)).toHaveValue(
        ApplicantDetails1Content.bpCounty,
      ),
      expect(page.locator(applicantInputIDs.solicitorPostalCode)).toHaveValue(
        ApplicantDetails1Content.bpPostalCode,
      ),
      expect(page.locator(applicantInputIDs.solicitorCountry)).toHaveValue(
        ApplicantDetails1Content.bpCountry,
      ),
    ]);
  }

  private static async selectOrganisation(page: Page): Promise<void> {
    await page
      .locator(`${Selectors.a}:text-is("${ApplicantDetails1Content.select}")`)
      .first()
      .click();
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageRefugeDetailsRequired}")`,
        1,
      ),
    ]);
  }

  private static async checkSecondLevelInputErrors(page: Page): Promise<void> {
    await page.click(applicantInputIDs.applicantGenderOther);
    await page.click(applicantInputIDs.canProvideEmailAddressYes);
    await page.click(applicantInputIDs.applicantLivesInRefugeYes);
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.applicantEmail}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageC8FormUploadRequired}")`,
        1,
      ),
    ]);
  }

  private static async checkInvalidDoB(page: Page): Promise<void> {
    for (const [key, inputData] of Object.entries(invalidDoB)) {
      const inputKeyID = key as keyof typeof applicantInputIDs;
      await page.fill(applicantInputIDs[inputKeyID], "");
      await page.fill(applicantInputIDs[inputKeyID], inputData);
    }
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
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
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
    await this.checkPhoneNumberValidationError(page);
    await page.fill(applicantInputIDs.applicantPhoneNumber, "");
    await page.fill(
      applicantInputIDs.applicantPhoneNumber,
      invalidPhoneNumbers.tooShort,
    );
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
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
}
