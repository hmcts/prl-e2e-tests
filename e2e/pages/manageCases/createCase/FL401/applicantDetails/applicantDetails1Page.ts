import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  ApplicantDetails1Content
} from "../../../../../fixtures/manageCases/createCase/FL401/applicantDetails/applicantDetails1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum applicantDoBInputs {
  dayInput = '#dateOfBirth-day'
}

enum applicantInputIDs {
  applicantFirstName = '#applicantsFL401_firstName',
  applicantLastName = '#applicantsFL401_lastName',
  applicantPreviousName = '#applicantsFL401_previousName',

  applicantGenderFemale = '#applicantsFL401_gender-female',
  applicantGenderMale = '#applicantsFL401_gender-male',
  applicantGenderOther = '#applicantsFL401_gender-female',
  applicantGenderOtherInput = '#applicantsFL401_otherGender',
  applicantPostcodeInput = "#applicantsFL401_address_address_postcodeInput",
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

enum buckinghamPalace {
  _BuildingAndStreet = 'Buckingham Palace',
  _AddressLine2 = '',
  _AddressLine3 = '',
  _City = 'London',
  _County = '',
  _PostalCode = 'SW1A 1AA',
  _Country = 'United Kingdom'
}

enum applicantDetailsTextValues {
  applicantFirstName = 'Charlie',
  applicantLastName = 'Alpha',
  applicantPreviousName = 'Morgan',
  applicantGenderOtherInput = 'Non-Binary',
  applicantPostcodeInput = buckinghamPalace._PostalCode,
  applicantEmailAddress = 'name@email.com',
  applicantPhoneNumber = '+44123456789',
  solicitorFirstName = 'Tony',
  solicitorLastName = 'Stark',
  solicitorEmailAddress = 'iron@man.com',
  solicitorPhoneNumber = '123456789',
  solicitorReference = 'Some kind of reference',
  organisationSearch = 'My New Org',
  dxNumber = "0000000000000000",
  solicitorPostCode = buckinghamPalace._PostalCode,
}

export class ApplicantDetails1Page{
  public static async applicantDetails1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean
  ): Promise <void> {
    await this.checkPageLoads(page, accessibilityTest)
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
        // ...[
        //   ['day', 'month', 'year'].map(
        //     (el) => {
        //       let formKey = `${el}FormLabel`
        //       Helpers.checkVisibleAndPresent(
        //         page,
        //         `${Selectors.GovukFormLabel}:text-is("${ApplicantDetails1Content[formKey as keyof typeof ApplicantDetails1Content]}")`,
        //         1
        //       )
        //     }
        //   )
        // ],
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
        // expect.soft(
        //   page.locator('#dateOfBirth-day').locator('preceding-sibling::label')
        // ).toBeVisible()
    // getByRole('group', { name: '*Date of birth' }).locator('label').first()
      ]
    );
    const element = page.locator('.form-label:text-is("*Date of birth")')
      .locator('..')
      .locator('..')
      .locator('.form-label:text-is("Day")');

    // Get the outer HTML of the element
    const outerHTML = await element.evaluate(el => el.outerHTML);

    // Print the outer HTML to the console
    console.log('Element outer HTML:', outerHTML);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
    errorMessaging: boolean
  ): Promise<void> {

  }

  // private static async
}