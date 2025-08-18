import { expect, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ApplicantGender } from "../../../../../common/types.ts";
import config from "../../../../../utils/config.utils.ts";
import { ApplicantDetails1Content } from "../../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetails1Content.ts";

enum UniqueSelectors {
  dayMonthYear = "div > ccd-field-write > div > ccd-write-complex-type-field > div > fieldset > ccd-field-write > div > ccd-write-date-container-field > ccd-write-date-field > div > fieldset > cut-date-input > div > div > .form-label",
  applicantAddressDropdown = "#applicants_0_address_address_addressList",
  solicitorAddressDropdown = "#applicants_0_solicitorAddress_solicitorAddress_addressList",
  previousAddresses = "#applicants_0_addressLivedLessThan5YearsDetails",
  applicantEmailAddress = "#applicants_0_email",
  applicantEmailAddressConfidential = "#applicants_0_isEmailAddressConfidential_Yes",
  addressFields = "div > ccd-field-write > div > ccd-write-complex-type-field > div > fieldset > ccd-field-write > div > ccd-write-address-field > div > ccd-write-complex-type-field > div > fieldset > ccd-field-write > div > ccd-write-text-field > div > label > span.form-label",
  emailAddressFields = "ccd-write-email-field > div > label > span.form-label",
  c8RefugeFormUploadFileInput = "#applicants_0_refugeConfidentialityC8Form",
}

enum PageLoadFields {
  applicantFirstName = "#applicants_0_firstName",
  applicantLastName = "#applicants_0_lastName",
  previousName = "#applicants_0_previousName",
  dateOfBirthDay = "#dateOfBirth-day",
  dateOfBirthMonth = "#dateOfBirth-month",
  dateOfBirthYear = "#dateOfBirth-year",
  placeOfBirth = "#applicants_0_placeOfBirth",
  applicantLivesInRefugeYes = "#applicants_0_liveInRefuge_Yes",
  applicantLivesInRefugeNo = "#applicants_0_liveInRefuge_No",
  applicantPostCode = "#applicants_0_address_address_postcodeInput",
  addressConfidentialYes = "#applicants_0_isAddressConfidential_Yes",
  addressConfidentialNo = "#applicants_0_isAddressConfidential_No",
  address5YearsYes = "#applicants_0_isAtAddressLessThan5Years_Yes",
  address5YearsNo = "#applicants_0_isAtAddressLessThan5Years_No",
  applicantsEmailAddressYes = "#applicants_0_canYouProvideEmailAddress_Yes",
  applicantsEmailAddressNo = "#applicants_0_canYouProvideEmailAddress_No",
  applicantPhoneNumber = "#applicants_0_phoneNumber",
  applicantPhoneNumberConfidentialYes = "#applicants_0_isPhoneNumberConfidential_Yes",
  applicantPhoneNumberConfidentialNo = "#applicants_0_isPhoneNumberConfidential_No",
  representativeFirstName = "#applicants_0_representativeFirstName",
  representativeLastName = "#applicants_0_representativeLastName",
  representativeEmail = "#applicants_0_solicitorEmail",
  representativeReference = "#applicants_0_solicitorReference",
  searchOrg = "#search-org-text",
  dxNumber = "#applicants_0_dxNumber",
  solicitorAddress = "#applicants_0_solicitorAddress_solicitorAddress_postcodeInput",
}

enum ApplicantAddressFields {
  line1 = "#applicants_0_address__detailAddressLine1",
  line2 = "#applicants_0_address__detailAddressLine2",
  line3 = "#applicants_0_address__detailAddressLine3",
  town = "#applicants_0_address__detailPostTown",
  county = "#applicants_0_address__detailCounty",
  postcode = "#applicants_0_address__detailPostCode",
  country = "#applicants_0_address__detailCountry",
}

enum RepresentativeAddressFields {
  line1 = "#applicants_0_solicitorAddress__detailAddressLine1",
  line2 = "#applicants_0_solicitorAddress__detailAddressLine2",
  line3 = "#applicants_0_solicitorAddress__detailAddressLine3",
  town = "#applicants_0_solicitorAddress__detailPostTown",
  county = "#applicants_0_solicitorAddress__detailCounty",
  postcode = "#applicants_0_solicitorAddress__detailPostCode",
  country = "#applicants_0_solicitorAddress__detailCountry",
}

export class ApplicantDetails1Page {
  public static async applicantDetails1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    yesNoApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page, yesNoApplicantDetails, applicantGender);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ApplicantDetails1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(page, 2, ApplicantDetails1Content, "p", Selectors.p),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ApplicantDetails1Content.strong}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, ApplicantDetails1Content, "h2", Selectors.h2),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ApplicantDetails1Content.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        18,
        ApplicantDetails1Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.dayMonthYear}:text-is("${ApplicantDetails1Content.formLabelDay}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.dayMonthYear}:text-is("${ApplicantDetails1Content.formLabelMonth}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.dayMonthYear}:text-is("${ApplicantDetails1Content.formLabelYear}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.dayMonthYear}:text-is("${ApplicantDetails1Content.formLabelYear}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.formLabelApplicantLivesInRefuge}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.formLabelUkPostCode}")`,
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
    await expect(
      page
        .locator(Selectors.h2)
        .filter({
          hasText:
            "You can only search for organisations already registered with MyHMCTS. For example, you can search by organisation name or address.",
        })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator(Selectors.h2)
        .filter({
          hasText:
            "You can only search for organisations already registered with MyHMCTS. For example, you can search by organisation name or address.",
        })
        .last(),
    ).toBeVisible();
    await expect(
      page.locator(Selectors.h2).filter({
        hasText:
          "You can only search for organisations already registered with MyHMCTS. For example, you can search by organisation name or address.",
      }),
    ).toHaveCount(2);
    await expect(
      page
        .locator(Selectors.h2)
        .filter({ hasText: "Can’t find the organisation you are looking for?" })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator(Selectors.h2)
        .filter({
          hasText: "Can’t find the organisation you are looking for?",
        })
        .last(),
    ).toBeVisible();
    await expect(
      page.locator(Selectors.h2).filter({
        hasText: "Can’t find the organisation you are looking for?",
      }),
    ).toHaveCount(2);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageFirstNameRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessageFirstNameRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageLastNameRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessageLastNameRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageDateOfBirthRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessageDateOfBirthRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageGenderRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessageGenderRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessagePlaceOfBirthRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessagePlaceOfBirthRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageRefugeDetailsRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessageRefugeDetailsRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageAddressRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageAddressConfidentialRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessageAddressConfidentialRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageLivedAtAddressLessThan5YearsRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessageLivedAtAddressLessThan5YearsRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageEmailAddressProvidedRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessageEmailAddressProvidedRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageContactNumberRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessageContactNumberRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageContactNumberConfidentialRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessageContactNumberConfidentialRequired}")`,
        1,
      ),
    ]);
    await this.checkExtraErrorMessages(page);
  }

  private static async fillInFields(
    page: Page,
    yesNoApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await page.fill(
      `${PageLoadFields.applicantFirstName}`,
      ApplicantDetails1Content.applicantFirstName,
    );
    await page.fill(
      `${PageLoadFields.applicantLastName}`,
      ApplicantDetails1Content.applicantLastName,
    );
    await page.fill(
      `${PageLoadFields.previousName}`,
      ApplicantDetails1Content.applicantPrevName,
    );
    await page.fill(
      `${PageLoadFields.dateOfBirthDay}`,
      ApplicantDetails1Content.day,
    );
    await page.fill(
      `${PageLoadFields.dateOfBirthMonth}`,
      ApplicantDetails1Content.month,
    );
    await page.fill(
      `${PageLoadFields.dateOfBirthYear}`,
      ApplicantDetails1Content.year,
    );
    await page.click(`#applicants_0_gender-${applicantGender}`);
    await page.click(`#applicants_0_gender-${applicantGender}`);
    await page.fill(
      `${PageLoadFields.placeOfBirth}`,
      ApplicantDetails1Content.placeOfBirth,
    );
    await page.fill(
      `${PageLoadFields.applicantPostCode}`,
      ApplicantDetails1Content.postcode,
    );
    await page
      .locator(
        `${Selectors.button}:text-is("${ApplicantDetails1Content.findAddressButton}")`,
      )
      .first()
      .click();
    await page.selectOption(
      `${UniqueSelectors.applicantAddressDropdown}`,
      ApplicantDetails1Content.address,
    );
    await page.fill(
      `${PageLoadFields.solicitorAddress}`,
      ApplicantDetails1Content.postcode,
    );
    await page
      .locator(
        `${Selectors.button}:text-is("${ApplicantDetails1Content.findAddressButton}")`,
      )
      .nth(1)
      .click();
    await page.selectOption(
      `${UniqueSelectors.solicitorAddressDropdown}`,
      ApplicantDetails1Content.address,
    );
    await this.AddressValidation(page);
    if (yesNoApplicantDetails) {
      await page.click(`${PageLoadFields.applicantLivesInRefugeYes}`);
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
        `${UniqueSelectors.c8RefugeFormUploadFileInput}`,
      );
      await fileInput.setInputFiles(config.testPdfFile);
      await page.waitForSelector(
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.uploadingFile}")`,
        { state: "hidden" },
      );
      await page.click(`${PageLoadFields.addressConfidentialYes}`);
      await page.click(`${PageLoadFields.address5YearsYes}`);
      await this.checkApplicantAddress5Years(page);
      await page.fill(
        `${UniqueSelectors.previousAddresses}`,
        ApplicantDetails1Content.last5Years,
      );
      await page.click(`${PageLoadFields.applicantsEmailAddressYes}`);
      await this.checkEmailAddress(page);
      await page.fill(
        `${UniqueSelectors.applicantEmailAddress}`,
        ApplicantDetails1Content.applicantEmail,
      );
      await page.click(`${UniqueSelectors.applicantEmailAddressConfidential}`);
      await page.click(`${PageLoadFields.applicantPhoneNumberConfidentialYes}`);
    } else {
      await page.click(`${PageLoadFields.applicantLivesInRefugeNo}`);
      await page.click(`${PageLoadFields.addressConfidentialNo}`);
      await page.click(`${PageLoadFields.address5YearsNo}`);
      await page.click(`${PageLoadFields.applicantsEmailAddressNo}`);
      await page.click(`${PageLoadFields.applicantPhoneNumberConfidentialNo}`);
    }
    await page.fill(
      `${PageLoadFields.applicantPhoneNumber}`,
      ApplicantDetails1Content.phoneNumber,
    );
    await page.fill(
      `${PageLoadFields.representativeFirstName}`,
      ApplicantDetails1Content.representativeFirstName,
    );
    await page.fill(
      `${PageLoadFields.representativeLastName}`,
      ApplicantDetails1Content.representativeLastName,
    );
    await page.fill(
      `${PageLoadFields.representativeEmail}`,
      ApplicantDetails1Content.representativeEmail,
    );
    await page.fill(
      `${PageLoadFields.representativeReference}`,
      ApplicantDetails1Content.representativeRef,
    );
    await page.fill(
      `${PageLoadFields.searchOrg}`,
      ApplicantDetails1Content.org,
    );
    await page
      .locator(`${Selectors.a}:text-is("${ApplicantDetails1Content.select}")`)
      .first()
      .click();
    await page.fill(
      `${PageLoadFields.dxNumber}`,
      ApplicantDetails1Content.dxNumber,
    );
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
  }

  private static async AddressValidation(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.formLabelSelectAddress}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${ApplicantDetails1Content.formLabelBuildingAndStreet}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${ApplicantDetails1Content.formLabelBuildingAndStreetOptional}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${ApplicantDetails1Content.formLabelAddressLine2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${ApplicantDetails1Content.formLabelAddressLine3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${ApplicantDetails1Content.formLabelTownOrCity}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${ApplicantDetails1Content.formLabelCounty}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${ApplicantDetails1Content.formLabelPostcode}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.addressFields}:text-is("${ApplicantDetails1Content.formLabelCountry}")`,
        2,
      ),
    ]);
    await expect(page.locator(ApplicantAddressFields.line1)).toHaveValue(
      ApplicantDetails1Content.buildingAndStreet,
    );
    await expect(page.locator(ApplicantAddressFields.line2)).toHaveValue("");
    await expect(page.locator(ApplicantAddressFields.line3)).toHaveValue("");
    await expect(page.locator(ApplicantAddressFields.town)).toHaveValue(
      ApplicantDetails1Content.townOrCity,
    );
    await expect(page.locator(ApplicantAddressFields.county)).toHaveValue("");
    await expect(page.locator(ApplicantAddressFields.postcode)).toHaveValue(
      ApplicantDetails1Content.postcode,
    );
    await expect(page.locator(ApplicantAddressFields.country)).toHaveValue(
      ApplicantDetails1Content.country,
    );
    await expect(page.locator(RepresentativeAddressFields.line1)).toHaveValue(
      ApplicantDetails1Content.buildingAndStreet,
    );
    await expect(page.locator(RepresentativeAddressFields.line2)).toHaveValue(
      "",
    );
    await expect(page.locator(RepresentativeAddressFields.line3)).toHaveValue(
      "",
    );
    await expect(page.locator(RepresentativeAddressFields.town)).toHaveValue(
      ApplicantDetails1Content.townOrCity,
    );
    await expect(page.locator(RepresentativeAddressFields.county)).toHaveValue(
      "",
    );
    await expect(
      page.locator(RepresentativeAddressFields.postcode),
    ).toHaveValue(ApplicantDetails1Content.postcode);
    await expect(page.locator(RepresentativeAddressFields.country)).toHaveValue(
      ApplicantDetails1Content.country,
    );
  }

  private static async checkApplicantAddress5Years(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.formLabelApplicant5Years}")`,
      1,
    );
  }

  private static async checkExtraErrorMessages(page: Page): Promise<void> {
    await page.click(`${PageLoadFields.applicantLivesInRefugeYes}`);
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageC8FormUploadRequired}")`,
      1,
    );
    await page.click(`${PageLoadFields.address5YearsYes}`);
    await this.checkApplicantAddress5Years(page);
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessage5YearsDetailsRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessage5YearsDetailsRequired}")`,
        1,
      ),
    ]);
    await page.click(`${PageLoadFields.applicantsEmailAddressYes}`);
    await this.checkEmailAddress(page);
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.errorMessageEmailAddressRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.errorMessageEmailAddressRequired}")`,
        1,
      ),
    ]);
  }

  private static async checkEmailAddress(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.emailAddressFields}:text-is("${ApplicantDetails1Content.formLabelApplicantEmailAddress}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content.formLabelEmailAddressConfidential}")`,
        1,
      ),
    ]);
  }
}
