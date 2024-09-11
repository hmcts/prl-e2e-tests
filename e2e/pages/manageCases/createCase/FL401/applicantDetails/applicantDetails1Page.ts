import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  ApplicantDetails1Content
} from "../../../../../fixtures/manageCases/createCase/FL401/applicantDetails/applicantDetails1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum uniqueSelectorPaths {
  dobFormLabel = 'div > ccd-field-write > div > ccd-write-complex-type-field > div > fieldset > ccd-field-write > div > ccd-write-date-container-field > ccd-write-date-field > div > fieldset > cut-date-input > div > div',
  applicantFindAddress = `div#applicantsFL401_address_address_postcodeLookup`,
  solicitorFindAddress = `div#applicantsFL401_solicitorAddress_solicitorAddress_postcodeLookup`,
  applicantAddressForm = 'div#applicantsFL401_address_address',
  solicitorAddressForm = 'div#applicantsFL401_solicitorAddress_solicitorAddress'
}

enum applicantInputIDs {
  applicantFirstName = '#applicantsFL401_firstName',
  applicantLastName = '#applicantsFL401_lastName',
  applicantPreviousName = '#applicantsFL401_previousName',
  applicantBirthDay = `${uniqueSelectorPaths.dobFormLabel} > #dateOfBirth-day`,
  applicantBirthMonth = `${uniqueSelectorPaths.dobFormLabel} > #dateOfBirth-month`,
  applicantBirthYear = `${uniqueSelectorPaths.dobFormLabel} > #dateOfBirth-year`,
  applicantGenderFemale = '#applicantsFL401_gender-female',
  applicantGenderMale = '#applicantsFL401_gender-male',
  applicantGenderOther = '#applicantsFL401_gender-other',
  applicantGenderOtherInput = '#applicantsFL401_otherGender',
  applicantInputPostCode = "#applicantsFL401_address_address_postcodeInput",
  applicantSelectAddress = "#applicantsFL401_address_address_addressList",
  applicantBuildingAndStreet = '#applicantsFL401_address__detailAddressLine1',
  applicantAddressLine2 = '#applicantsFL401_address__detailAddressLine2',
  applicantAddressLine3 = '#applicantsFL401_address__detailAddressLine3',
  applicantCity = '#applicantsFL401_address__detailPostTown',
  applicantCounty = '#applicantsFL401_address__detailCounty',
  applicantPostalCode = '#applicantsFL401_address__detailPostCode',
  applicantCountry = '#applicantsFL401_address__detailCountry',
  confidentialAddressYes = '#applicantsFL401_isAddressConfidential_Yes',
  confidentialAddressNo = '#applicantsFL401_isAddressConfidential_No',
  canProvideEmailAddressYes = '#applicantsFL401_canYouProvideEmailAddress_Yes',
  canProvideEmailAddressNo = '#applicantsFL401_canYouProvideEmailAddress_No',
  applicantEmailAddress = '#applicantsFL401_email',
  confidentialEmailYes = '#applicantsFL401_isEmailAddressConfidential_Yes',
  confidentialEmailNo = '#applicantsFL401_isEmailAddressConfidential_No',
  applicantPhoneNumber = '#applicantsFL401_phoneNumber',
  confidentialPhoneNumberYes = '#applicantsFL401_isPhoneNumberConfidential_Yes',
  confidentialPhoneNumberNo = '#applicantsFL401_isPhoneNumberConfidential_No',
  solicitorFirstName = '#applicantsFL401_representativeFirstName',
  solicitorLastName = '#applicantsFL401_representativeLastName',
  solicitorEmailAddress = '#applicantsFL401_solicitorEmail',
  solicitorPhoneNumber = '#applicantsFL401_solicitorTelephone',
  solicitorReference = '#applicantsFL401_solicitorReference',
  organisationSearch = '#search-org-text',
  dxNumber = "#applicantsFL401_dxNumber",
  solicitorPostCode = "#applicantsFL401_solicitorAddress_solicitorAddress_postcodeInput",
  solicitorSelectAddress = '#applicantsFL401_solicitorAddress_solicitorAddress_addressList',
  solicitorBuildingAndStreet = '#applicantsFL401_solicitorAddress__detailAddressLine1',
  solicitorAddressLine2 = '#applicantsFL401_solicitorAddress__detailAddressLine2',
  solicitorAddressLine3 = '#applicantsFL401_solicitorAddress__detailAddressLine3',
  solicitorCity = '#applicantsFL401_solicitorAddress__detailPostTown',
  solicitorCounty = '#applicantsFL401_solicitorAddress__detailCounty',
  solicitorPostalCode = '#applicantsFL401_solicitorAddress__detailPostCode',
  solicitorCountry = '#applicantsFL401_solicitorAddress__detailCountry',
}

export enum buckinghamPalace {
  bpBuildingAndStreet = 'Buckingham Palace',
  bpAddressLine2 = '',
  bpAddressLine3 = '',
  bpCity = 'London',
  bpCounty = '',
  bpPostalCode = 'SW1A 1AA',
  bpCountry = 'United Kingdom',
}

export enum topLevelInputFields {
  applicantFirstName = 'Charlie',
  applicantLastName = 'Alpha',
  applicantPreviousName = 'Morgan',
  applicantBirthDay = '12',
  applicantBirthMonth = '12',
  applicantBirthYear = '1980',
  applicantInputPostCode = buckinghamPalace.bpPostalCode,
  applicantPhoneNumber = '+44123456789',
  solicitorFirstName = 'Tony',
  solicitorLastName = 'Stark',
  solicitorEmailAddress = 'iron@man.com',
  solicitorPhoneNumber = '123456789',
  solicitorReference = 'Some kind of reference',
  organisationSearch = 'My New Org',
  dxNumber = "0000000000000000",
  solicitorPostCode = buckinghamPalace.bpPostalCode,
}

enum invalidPhoneNumbers {
  nonNumeric = 'abcdef',
  tooShort = '12345678'
}

enum invalidEmailAddress {
  applicantEmailAddress = 'noEmailHere.com'
}

enum invalidDoB {
  applicantBirthDay = '0',
  applicantBirthMonth = '10',
  applicantBirthYear = '1990',
}

export enum secondLevelInputFields {
  applicantGenderOtherInput = 'Non-Binary',
  applicantEmailAddress = 'name@email.com',
}

export class ApplicantDetails1Page{
  public static async applicantDetails1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean
  ): Promise <void> {
    await this.checkPageLoads(page, accessibilityTest)
    if (errorMessaging) {
      console.log('Checking Errors')
      await this.checkTopLevelErrors(page)
    }
    await this.fillInFields(page)
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ApplicantDetails1Content.headingL}")`
    )
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormHint}:text-is("${ApplicantDetails1Content.formHintDoB}")`,
          1
        ),
        ...['day', 'month', 'year'].map(
            (el) => {
              let formKey = `${el}FormLabel`
              Helpers.checkVisibleAndPresent(
                page,
                `${uniqueSelectorPaths.dobFormLabel} > ${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content[formKey as keyof typeof ApplicantDetails1Content]}")`,
                1
              )
            }
          )
        ,
        Helpers.checkGroup(
          page,
          3,
          ApplicantDetails1Content,
          'h2Heading',
          `${Selectors.h2}`
        ),
        Helpers.checkGroup(
          page,
          2,
          ApplicantDetails1Content,
          'govParagraph',
          `${Selectors.p}`
        ),
        Helpers.checkGroup(
          page,
          18,
          ApplicantDetails1Content,
          'formLabel',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${ApplicantDetails1Content.cantEnterPostcode_2}")`,
          2
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.button}:text-is("${ApplicantDetails1Content.postcodeButton_2}")`,
          2
        ),
      ]
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {
    await this.fillInTopLevelFields(page);
    await this.fillInRadios(page);
    await this.fillInSecondLevelFields(page);
    await this.fillAndCheckAddressFields(page);
    await this.selectOrganisation(page);
    console.log('Clicking Continue')
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`
    );
  }

  private static async fillInTopLevelFields(
    page:Page,
  ): Promise<void> {
    for (let [key, input_value] of Object.entries(topLevelInputFields)) {
      let input_id: string = applicantInputIDs[key as keyof typeof applicantInputIDs]
      await page.fill(input_id, '');
      await page.fill(input_id, input_value);
    }
  }

  private static async fillInRadios(
    page:Page,
  ): Promise<void> {
    const radiosToClick = [
      applicantInputIDs.applicantGenderOther,
      applicantInputIDs.confidentialAddressYes,
      applicantInputIDs.canProvideEmailAddressYes,
      applicantInputIDs.confidentialEmailYes,
      applicantInputIDs.confidentialPhoneNumberYes,
    ]
    for (let radioID of radiosToClick) {
      await page.click(
        radioID
      );
    }
  }

  private static async fillInSecondLevelFields(
    page:Page,
  ): Promise<void> {
    for (let [key, input_value] of Object.entries(secondLevelInputFields)) {
      let input_id: string = applicantInputIDs[key as keyof typeof applicantInputIDs]
      await page.fill(input_id, '')
      await page.fill(input_id, input_value)
    }
  }

  private static async fillAndCheckAddressFields(
    page: Page,
  ): Promise<void> {
    for (let person of ['applicant', 'solicitor']) {
      let findAddressUniqueKey = `${person}FindAddress` as keyof typeof uniqueSelectorPaths
      await page.click(
        `${uniqueSelectorPaths[findAddressUniqueKey]} > button:text-is("${ApplicantDetails1Content.postcodeButton_2}")`
      );
      let selectAddressID = `${person}SelectAddress` as keyof typeof applicantInputIDs
      await page.locator(
        applicantInputIDs[selectAddressID]
      ).selectOption(
        { index: 1 }
      )
    }
  }

  private static async selectOrganisation(
    page: Page
  ): Promise<void> {
    const orgSelector = `${Selectors.a}[title="Select the organisation ${topLevelInputFields.organisationSearch}"]`;
    await page.click(orgSelector)
  }

  private static async checkTopLevelErrors(
    page: Page,
  ): Promise<void> {
    await this.checkTopLevelInputErrors(page);
    await this.checkSecondLevelInputErrors(page);
    await this.checkValidationErrors(page);
  }

  private static async checkTopLevelInputErrors(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`
    );
    await page.waitForSelector(
      `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorSummaryTitle}")`,
    )
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.postcodeErrorMessage_2}")`,
          2
        ),
        Helpers.checkGroup(
          page,
          9,
          ApplicantDetails1Content,
          'topLevelInputErrorSummary',
          `${Selectors.GovukErrorValidation}`
        ),
        Helpers.checkGroup(
          page,
          8,
          ApplicantDetails1Content,
          `topLevelInputErrorMessage`,
          `${Selectors.GovukErrorMessage}`
        )
      ]
    );
  }

  private static async checkSecondLevelInputErrors(
    page: Page
  ): Promise<void> {
    await page.click(
      applicantInputIDs.applicantGenderOther
    );
    await page.click(
      applicantInputIDs.canProvideEmailAddressYes
    );
    await this.delayedClickContinue(page)
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorSummaryTitle}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          3,
          ApplicantDetails1Content,
          'secondLevelInputErrorSummary',
          `${Selectors.GovukErrorValidation}`
        ),
        Helpers.checkGroup(
          page,
          3,
          ApplicantDetails1Content,
          'secondLevelInputErrorMessage',
          `${Selectors.GovukErrorMessage}`
        ),
      ]
    )
  }

  private static async checkInvalidDoB(
    page: Page
  ): Promise<void> {
    for (let [key, inputData] of Object.entries(invalidDoB)) {
      let inputKeyID = key as keyof typeof applicantInputIDs;
      await page.fill(
        applicantInputIDs[inputKeyID],
        ''
      );
      await page.fill(
        applicantInputIDs[inputKeyID],
        inputData
      );
    }

  }

  private static async checkInvalidPhoneNumbers(
    page: Page
  ): Promise<void> {
    await page.fill(
      applicantInputIDs.applicantPhoneNumber,
      invalidPhoneNumbers.nonNumeric
    );
    await this.delayedClickContinue(page);
    await this.checkPhoneNumberValidationError(page);
    await page.fill(
      applicantInputIDs.applicantPhoneNumber,
      ''
    );
    await page.fill(
      applicantInputIDs.applicantPhoneNumber,
      invalidPhoneNumbers.tooShort
    );
    await this.delayedClickContinue(page)
    await this.checkPhoneNumberValidationError(page);
  }

  private static async checkPhoneNumberValidationError(
    page: Page
  ): Promise<void> {
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorSummaryTitle}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.invalidApplicantPhoneSummary}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.invalidApplicantPhoneMessage}")`,
          1
        )
      ]
    )
  }

  private static async checkValidationErrors(
    page: Page
  ): Promise<void> {
    for (let [key, inputData] of Object.entries(invalidTopLevelFields)) {
      let inputKeyID = key as keyof typeof applicantInputIDs;
      await page.fill(
        applicantInputIDs[inputKeyID],
        ''
      );
      await page.fill(
        applicantInputIDs[inputKeyID],
        inputData
      );
    }
    await this.delayedClickContinue(page)
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorSummaryTitle}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.invalidApplicantPhoneSummary}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.invalidApplicantPhoneMessage}")`,
          1
        )
      ]
    )
    for (let [key, input_value] of Object.entries({ ...topLevelInputFields, ...secondLevelInputFields })) {
      if (key !== "applicantEmailAddress") {
        let input_id: string =
          applicantInputIDs[key as keyof typeof applicantInputIDs];
        await page.fill(input_id, '');
        await page.fill(input_id, input_value);
      }
    }
    console.log('email should be blank')
    for (let [key, input_value] of Object.entries(secondInvalidPhoneNumber)) {
      let input_id: string = applicantInputIDs[key as keyof typeof applicantInputIDs]
      await page.fill(input_id, '');
      await page.fill(input_id, input_value);
    }
    await this.fillInRadios(page)
    await this.fillAndCheckAddressFields(page)
    console.log('Filled new invalid inputs')
    await this.delayedClickContinue(page)
    console.log('Last Check')
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorSummaryTitle}:text-is("${ApplicantDetails1Content.errorSummaryTitle}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.invalidApplicantPhoneSummary}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.invalidApplicantPhoneMessage}")`,
          1
        ),
      ]
    )
    await page.fill(
      applicantInputIDs.applicantPhoneNumber,
      topLevelInputFields.applicantPhoneNumber
    );
    await page.fill(
      applicantInputIDs.applicantEmailAddress,
      invalidEmailAddress.applicantEmailAddress
    );
    await this.delayedClickContinue(page)
    console.log('Finally the last check')
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorValidation}:text-is("${ApplicantDetails1Content.invalidEmailSummary}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessage}:text-is("${ApplicantDetails1Content.invalidEmailMessage}")`,
          1
        )
      ]
    )
  }

  private static async delayedClickContinue(
    page: Page,
    msDelay: number = 2000
  ): Promise<void> {
    await page.waitForTimeout(msDelay);
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetails1Content.continue}")`
    );
  }
}