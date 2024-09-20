import { Page, expect } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { Fl401Home1Content } from "../../../../../fixtures/manageCases/createCase/FL401/theHome/fl401Home1Content";
import { Helpers } from "../../../../../common/helpers";
import { FL401 } from "../../../../../journeys/manageCases/createCase/FL401";

enum uniqueSelectors {
  intendedHomeDiv = 'div#home_intendToLiveAtTheAddress > fieldset > div > ',
  homeChildrenDiv = 'div#home_children > div > ',
  homeAddressLookupDiv = 'div#home_address_address ',
  homePeopleLiveAtAddress = 'div#home_peopleLivingAtThisAddress > fieldset > div > ',
  homeEverLivedAtAddress = 'div#home_everLivedAtTheAddress > fieldset > div > ',
  topLevelSelectors = 'div#home_home.form-group > fieldset > ccd-field-write > div:visible ',
  homeMortgageLookupDiv = 'div#home_mortgages_mortgages ',
  homeLandlordLookupDiv = 'div#home_landlords_landlords '
}

enum checkboxIDs {
  applicantHome = '#home_peopleLivingAtThisAddress-applicant',
  respondentHome = '#home_peopleLivingAtThisAddress-respondent',
  childrenHome = '#home_peopleLivingAtThisAddress-applicantChildren',
  someoneElseHome = '#home_peopleLivingAtThisAddress-someoneElse',
  applicantWantsToStayHome = '#home_livingSituation-ableToStayInHome',
  applicantWantsToReturnHome = '#home_livingSituation-ableToReturnHome',
  applicantsWantsEntryRestriction = '#home_livingSituation-restrictFromEnteringHome',
  awayFromHome = '#home_livingSituation-awayFromHome',
  limitRespondentInHome = '#home_livingSituation-limitRespondentInHome',
  payForRepairs = '#home_familyHome-payForRepairs',
  payRent = '#home_familyHome-payOrContributeRent',
  needsContents = '#home_familyHome-useHouseholdContents'
}

enum secondLevelCheckboxIDs {
  applicantMortgage = '#home_mortgages_mortgageNamedAfter-applicant',
  respondentMortgage = '#home_mortgages_mortgageNamedAfter-respondent',
  someoneElseMortgage = '#home_mortgages_mortgageNamedAfter-someoneElse',
  applicantLandlord = '#home_landlords_mortgageNamedAfterList-applicant',
  respondentLandlord = '#home_landlords_mortgageNamedAfterList-respondent',
  someoneElseLandlord = '#home_landlords_mortgageNamedAfterList-someoneElse',
}

enum inputIDs {
  homeAddressPostcodeInput = '#home_address_address_postcodeInput',
  homeAddressSelectAddress = '#home_address_address_addressList',
  homeAddressBuildingAndStreet = '#home_address__detailAddressLine1',
  homeAddressAddressLine2 = '#home_address__detailAddressLine2',
  homeAddressAddressLine3 = '#home_address__detailAddressLine3',
  homeAddressTownOrCity = '#home_address__detailPostTown',
  homeAddressAddressCounty = '#home_address__detailCounty',
  homeAddressPostalCode = '#home_address__detailPostCode',
  homeAddressCountry = '#home_address__detailCountry',
  homeMortgagePostcodeInput = '#home_mortgages_address_address_postcodeInput',
  homeMortgageSelectAddress = '#home_mortgages_address_address_addressList',
  homeMortgageBuildingAndStreet = '#home_mortgages__detailAddressLine1',
  homeMortgageAddressLine2 = '#home_mortgages__detailAddressLine2',
  homeMortgageAddressLine3 = '#home_mortgages__detailAddressLine3',
  homeMortgageTownOrCity = '#home_mortgages__detailPostTown',
  homeMortgageAddressCounty = '#home_mortgages__detailCounty',
  homeMortgagePostalCode = '#home_mortgages__detailPostCode',
  homeMortgageAddressCountry = '#home_mortgages__detailCountry',
  homeLandlordPostcodeInput = '#home_landlords_address_address_postcodeInput',
  homeLandlordSelectAddress = '#home_landlords_address_address_addressList',
  homeLandlordBuildingAndStreet = '#home_landlords__detailAddressLine1',
  homeLandlordAddressLine2 = '#home_landlords__detailAddressLine2',
  homeLandlordAddressLine3 = '#home_landlords__detailAddressLine3',
  homeLandlordTownOrCity = '#home_landlords__detailPostTown',
  homeLandlordAddressCounty = '#home_landlords__detailCounty',
  homeLandlordPostalCode = '#home_landlords__detailPostCode',
  homeLandlordAddressCountry = '#home_landlords__detailCountry',
  secondLevelOccupantDetails = 'home_textAreaSomethingElse',
  everLivedAtAddress = '#home_everLivedAtTheAddress-',
  intendToLiveAtAddress = '#home_intendToLiveAtTheAddress-',
  childrenAtAddressYes = '#home_doAnyChildrenLiveAtAddress_Yes',
  childrenAtAddressNo = '#home_doAnyChildrenLiveAtAddress_No',
  propertyAdaptedYes = '#home_isPropertyAdapted_Yes',
  propertyAdaptedNo = '#home_isPropertyAdapted_No',
  mortgagePropertyYes = '#home_isThereMortgageOnProperty_Yes',
  mortgagePropertyNo = '#home_isThereMortgageOnProperty_No',
  rentedPropertyYes = '#home_isPropertyRented_Yes',
  rentedPropertyNo = '#home_isPropertyRented_No',
  applicantHomeRightsYes = '#home_doesApplicantHaveHomeRights_Yes',
  applicantHomeRightsNo = '#home_doesApplicantHaveHomeRights_No',
  confidentialInfoYes = '#home_children_0_keepChildrenInfoConfidential_Yes',
  confidentialInfoNo = '#home_children_0_keepChildrenInfoConfidential_No',
  childFullName = '#home_children_0_childFullName',
  childAge = '#home_children_0_childsAge',
  respondentResponsibleForChildYes = '#home_children_0_isRespondentResponsibleForChild_Yes',
  respondentResponsibleForChildNo = '#home_children_0_isRespondentResponsibleForChild_No',
}

export type addressRadios =
  'yesBothOfThem'
  | 'yesApplicant'
  | 'yesRespondent'
  | 'No'

interface FL401HomePageOptions {
  page: Page;
  accessibilityTest: boolean;
  fl401HomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
}

interface FillInFieldsOptions {
  page: Page;
  fl401HomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
}

interface CheckPageLoadsOptions {
  page: Page,
  accessibilityTest: boolean,
  fl401HomeYesNo: boolean
}

interface FillInTopLevelFieldsOptions {
  page: Page,
  fl401HomeYesNo: boolean,
}

interface AddNewChildOptions {
  page: Page,
  fl401HomeYesNo: boolean,
}

interface FillInAddressRadiosOptions {
  page: Page;
  applicantOrRespondentResponse: addressRadios;
  isTopLevel: boolean
}

interface CheckTopLevelPageLoadsOptions {
  page: Page,
  accessibilityTest: boolean
}

interface FillAllAddressRadiosOptions {
  page: Page,
  fl401EverLivedAtAddress: addressRadios,
  fl401IntendToLiveAtAddress?: addressRadios
}

interface FillInAddressFieldsOptions {
  page: Page;
  fl401HomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
}

export class Fl401Home1Page {
  public static async fl401Home1Page({
     page,
     accessibilityTest,
     fl401HomeYesNo,
     fl401EverLivedAtAddress,
     fl401IntendToLiveAtAddress
   }: FL401HomePageOptions): Promise<void> {
    await this.checkTopLevelPageLoads({
      page, accessibilityTest
    });
    await this.fillInTopLevelFields({
      page, fl401HomeYesNo
    })
    console.log('pause')
    await this.fillInAddressFields({
      page,
      fl401HomeYesNo,
      fl401EverLivedAtAddress,
      fl401IntendToLiveAtAddress
    })
    console.log('Filled In')
  }

  private static async fillInAddressFields({
    page,
    fl401HomeYesNo,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress
  }: FillInAddressFieldsOptions): Promise<void> {
    await this.fillAllAddressRadios({
      page,
      fl401EverLivedAtAddress,
      fl401IntendToLiveAtAddress
    });
    const addressTypeLoop = fl401HomeYesNo ? ['homeAddress', 'homeMortgage', 'homeLandlord'] : ['homeAddress'];
    for (let addressType of addressTypeLoop) {
      let postcodeInput = `${addressType}PostcodeInput` as keyof typeof inputIDs;
      await page.fill(
        `${inputIDs[postcodeInput]}`,
        `${Fl401Home1Content.bpPostalCode}`
      );
      let uniqueSelectorKey = `${addressType}LookupDiv` as keyof typeof uniqueSelectors;
      await page.click(
        `${uniqueSelectors[uniqueSelectorKey]}${Selectors.button}:text-is("${Fl401Home1Content.findAddress}")`
      );
      await page.waitForSelector(
        `${uniqueSelectors[uniqueSelectorKey]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.selectAddress}")`,
      );
      let selectAddressInput = `${addressType}SelectAddress` as keyof typeof inputIDs;
      await page
        .locator(inputIDs[selectAddressInput])
        .selectOption({ index: 1 });
      await this.addressLabelValidation(
        page, uniqueSelectorKey
      );
      await this.addressValueValidation(
        page, addressType
      )
    }
    // await page.fill(
    //   `${inputIDs.homeAddressPostcodeInput}`,
    //   `${Fl401Home1Content.bpPostalCode}`
    // );
    // await page.click(
    //   `${uniqueSelectors.homeAddressLookupDiv}${Selectors.button}:text-is("${Fl401Home1Content.findAddress}")`
    // );
    // if (fl401HomeYesNo) {
    //   await page.fill(
    //     `${inputIDs.homeMortgagePostcodeInput}`,
    //     `${Fl401Home1Content.bpPostalCode}`
    //   );
    //   await page.click(
    //     `${uniqueSelectors.mortgagesDiv}${Selectors.button}:text-is("${Fl401Home1Content.findAddress}")`
    //   );
    //   await page.fill(
    //     `${inputIDs.homeLandlordPostcodeInput}`,
    //     `${Fl401Home1Content.bpPostalCode}`
    //   );
    //   await page.click(
    //     `${uniqueSelectors.landlordDiv}${Selectors.button}:text-is("${Fl401Home1Content.findAddress}")`
    //   );
    // }
  }

  // private static async checkPageLoads({
  //   page,
  //   accessibilityTest,
  //   fl401HomeYesNo
  // }: CheckPageLoadsOptions): Promise<void> {
  //   await this.checkTopLevelPageLoads(page);
  //   if (!fl401HomeYesNo) {
  //     await this.fillInTopLevelFields({
  //       page, fl401HomeYesNo, fl401EverLivedAtAddress
  //     })
  //   }
  //   if (accessibilityTest) {
  //     await AccessibilityTestHelper.run(page);
  //   }
  // }

  private static async checkTopLevelPageLoads(
    {page, accessibilityTest}: CheckTopLevelPageLoadsOptions
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${Fl401Home1Content.pageTitle}")`
    );
    await Promise.all(
      [
        Helpers.checkGroup(
          page,
          2,
          Fl401Home1Content,
          'p',
          `${Selectors.p}`
        ),
        Helpers.checkGroup(
          page,
          19,
          Fl401Home1Content,
          'topFormLabel',
          `${uniqueSelectors.topLevelSelectors}${Selectors.GovukFormLabel}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.topLevelSelectors}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelYes}")`,
          5
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.topLevelSelectors}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelNo}")`,
          6
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homeAddressLookupDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.enterUKPostcode}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homePeopleLiveAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.theApplicant}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homePeopleLiveAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.theRespondent}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homePeopleLiveAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.someoneElsePleaseSpecify}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homeEverLivedAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesTheApplicant}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homeEverLivedAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesTheRespondent}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homeEverLivedAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesBothOfThem}")`,
          1
        ),
      ]
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async addNewChild({
    page,
    fl401HomeYesNo
 }: AddNewChildOptions) : Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${Fl401Home1Content.childAddNewButton}")`
    );
    await Promise.all(
      [
        Helpers.checkGroup(
          page,
          4,
          Fl401Home1Content,
          'childLabel',
          `${uniqueSelectors.homeChildrenDiv}${Selectors.GovukFormLabel}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homeChildrenDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelYes}")`,
          2
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homeChildrenDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelNo}")`,
          2
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h3}:text-is("${Fl401Home1Content.childHeading3}")`,
          1
        )
      ]
    );
    if (fl401HomeYesNo) {
      await page.click(
        inputIDs.confidentialInfoYes
      );
      await page.click(
        inputIDs.respondentResponsibleForChildYes
      );
    } else {
      await page.click(
        inputIDs.confidentialInfoNo
      );
      await page.click(
        inputIDs.respondentResponsibleForChildNo
      );
    }
    await page.fill(
      inputIDs.childFullName,
      Fl401Home1Content.childFullName
    );
    await page.fill(
      inputIDs.childAge,
      Fl401Home1Content.childAge
    );
  }

  private static async fillInFields({
    page,
    fl401HomeYesNo,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress
  }: FillInFieldsOptions): Promise<void> {
    await this.fillAndCheckAddressFields(page);
    await this.fillInTopLevelFields({
      page,
      fl401HomeYesNo,
    });
    await this.fillAllAddressRadios({
      page,
      fl401EverLivedAtAddress,
      fl401IntendToLiveAtAddress
    })
  }

  private static async fillAllAddressRadios({
    page,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress
  }: FillAllAddressRadiosOptions): Promise<void> {
    let applicantOrRespondentResponse = fl401EverLivedAtAddress
    let isTopLevel: boolean = true
    await this.fillInAddressRadios({
      page,
      applicantOrRespondentResponse,
      isTopLevel
    });
    if (fl401EverLivedAtAddress === 'No') {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.intendedAddressLabel}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.intendedHomeDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelNo}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.intendedHomeDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesTheApplicant}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.intendedHomeDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesTheRespondent}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.intendedHomeDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesBothOfThem}")`,
          1
        ),
      ])
      applicantOrRespondentResponse = fl401IntendToLiveAtAddress
      isTopLevel = false
      await this.fillInAddressRadios({
        page,
        applicantOrRespondentResponse,
        isTopLevel
      });
    }
  }

  private static async fillInAddressRadios({
    page,
    applicantOrRespondentResponse,
    isTopLevel
   }: FillInAddressRadiosOptions): Promise<void> { 
    const multipleChoiceID = (isTopLevel) ? inputIDs.everLivedAtAddress : inputIDs.intendToLiveAtAddress;
    await page.click(
      `${multipleChoiceID}${applicantOrRespondentResponse}`
    );
  }

  private static async fillInTopLevelFields({
    page,
    fl401HomeYesNo,
  }: FillInTopLevelFieldsOptions): Promise<void> {
    for (let checkboxID of Object.values(checkboxIDs)) {
      await page.check(checkboxID);
    }
    const yesNoString = fl401HomeYesNo ? 'Yes' : 'No'
    const childrenAtAddressKey = `childrenAtAddress${yesNoString}` as keyof typeof inputIDs;
    await page.click(inputIDs[childrenAtAddressKey]);
    const propertyAdaptedKey = `propertyAdapted${yesNoString}` as keyof typeof inputIDs;
    await page.click(inputIDs[propertyAdaptedKey]);
    const mortgagePropertyKey = `mortgageProperty${yesNoString}` as keyof typeof inputIDs;
    await page.click(inputIDs[mortgagePropertyKey]);
    const rentedPropertyKey = `rentedProperty${yesNoString}` as keyof typeof inputIDs;
    await page.click(inputIDs[rentedPropertyKey]);
    const applicantHomeRightsKey = `applicantHomeRights${yesNoString}` as keyof typeof inputIDs;
    await page.click(inputIDs[applicantHomeRightsKey]);
  }

  private static async checkSecondLevelLoads(
    page: Page, fl401HomeYesNo: boolean, fl401
  ): Promise<void> {
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h2}:text-is("${Fl401Home1Content.childHeading2}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          6,
          Fl401Home1Content,
          'secondLevelFormLabel',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkGroup(
          page,
          2,
          Fl401Home1Content,
          'secondLevelFormHint',
          `${Selectors.GovukFormHint}`
        ),
      ]
    )
  }

  // private static async fillInSecondLevelFields(
  //   page: Page
  // ): Promise<void> {
  //   await page.fill(
  //     `${inputIDs.som}`
  //   )
  // }

  private static async fillAndCheckAddressFields(
    page: Page,
    uniqueSelector: keyof typeof uniqueSelectors
  ): Promise<void> {
    await page.click(
      `button:text-is("${Fl401Home1Content.findAddress}")`,
    );
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.selectAddress}")`,
    );
    await page
      .locator(inputIDs.homeSelectAddress)
      .selectOption({ index: 1 });
    await this.addressLabelValidation(page);
    await this.addressValueValidation(page);
  }

  private static async addressLabelValidation(
    page: Page,
    uniqueSelector: keyof typeof uniqueSelectors
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelector]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.buildingAndStreet}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelector]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.addressLine2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelector]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.addressLine3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelector]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.townOrCity}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelector]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.addressCounty}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelector]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.postalCode}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelector]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.addressCountry}")`,
        1,
      ),
    ]);
  }

  private static async addressValueValidation(
    page: Page, addressType: string
  ): Promise<void> {
    const buildingKey = `${addressType}BuildingAndStreet` as keyof typeof inputIDs;
    const addressLine2Key = `${addressType}AddressLine2` as keyof typeof inputIDs;
    const addressLine3Key = `${addressType}AddressLine3` as keyof typeof inputIDs;
    const townOrCityKey = `${addressType}TownOrCity` as keyof typeof inputIDs;
    const addressCountyKey = `${addressType}AddressCounty` as keyof typeof inputIDs;
    const postalCodeKey = `${addressType}PostalCode` as keyof typeof inputIDs;
    const addressCountryKey = `${addressType}AddressCountry` as keyof typeof inputIDs;
    console.log(addressType)
    await Promise.all([
      expect(
        page.locator(inputIDs[buildingKey]),
      ).toHaveValue(
        Fl401Home1Content.bpBuildingAndStreet
      ),
      expect(page.locator(inputIDs[addressLine2Key])).toHaveValue(
        Fl401Home1Content.bpAddressLine2,
      ),
      expect(page.locator(inputIDs[addressLine3Key])).toHaveValue(
        Fl401Home1Content.bpAddressLine3,
      ),
      expect(page.locator(inputIDs[townOrCityKey])).toHaveValue(
        Fl401Home1Content.bpCity,
      ),
      expect(page.locator(inputIDs[addressCountyKey])).toHaveValue(
        Fl401Home1Content.bpCounty,
      ),
      expect(page.locator(inputIDs[postalCodeKey])).toHaveValue(
        Fl401Home1Content.bpPostalCode,
      ),
      expect(page.locator(inputIDs[addressCountryKey])).toHaveValue(
        Fl401Home1Content.bpCountry,
      ),
    ]);
    console.log('done validat')
  }
}