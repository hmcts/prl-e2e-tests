import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { Fl401Home1Content } from "../../../../../fixtures/manageCases/createCase/FL401/theHome/fl401Home1Content";
import { Helpers } from "../../../../../common/helpers";

enum uniqueSelectors {
  intendedHomeDiv = 'div#home_intendToLiveAtTheAddress > fieldset > div',
  homeChildrenDiv = 'div#home_children > div',
}

enum checkboxIDs {
  applicantHome = '#home_peopleLivingAtThisAddress-applicant',
  respondentHome = '#home_peopleLivingAtThisAddress-respondent',
  childrenHome = '#home_peopleLivingAtThisAddress-applicantChildren',
  someoneElseHome = '#home_peopleLivingAtThisAddress-someoneElse',
  applicantWantsToStayHome = '#home_livingSituation-ableToStayInHome',
  applicantWantsToReturnHome = '#home_livingSituation-ableToStayInHome',
  applicantsWantsEntryRestriction = '#home_livingSituation-restrictFromEnteringHome',
  awayFromHome = '#home_livingSituation-awayFromHome',
  limitRespondentInHome = '#home_livingSituation-awayFromHome',
  payForRepairs = '#home_familyHome-payForRepairs',
  payRent = '#home_familyHome-payOrContributeRent',
  needsContents = '#home_familyHome-useHouseholdContents'
}

enum inputIDs {
  postcodeInput = '#home_address_address_postcodeInput',
  selectAddress = '#home_address_address_addressList',
  buildingAndStreet = '#home_address__detailAddressLine1',
  addressLine2 = '#home_address__detailAddressLine2',
  addressLine3 = '#home_address__detailAddressLine3',
  townOrCity = '#home_address__detailPostTown',
  addressCounty = '#home_address__detailCounty',
  postalCode = '#home_address__detailPostCode',
  addressCountry = '#home_address__detailCountry',
  topLevelYesBothOfThem = '#home_everLivedAtTheAddress-yesBothOfThem',
  topLevelYesApplicant = '#home_everLivedAtTheAddress-yesApplicant',
  topLevelYesRespondent = '#home_everLivedAtTheAddress-yesRespondent',
  topLevelNotHomeAddress = '#home_everLivedAtTheAddress-No',
  secondLevelYesBothOfThem = '#home_intendToLiveAtTheAddress-yesBothOfThem',
  secondLevelYesApplicant = '#home_intendToLiveAtTheAddress-yesApplicant',
  secondLevelYesRespondent = '#home_intendToLiveAtTheAddress-yesRespondent',
  secondLevelNotHomeAddress = '#home_intendToLiveAtTheAddress-No',
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
  'Yes, both of them'
  | 'Yes, the applicant'
  | 'Yes, the respondent'
  | 'No'

interface FL401HomePageOptions {
  page: Page;
  accessibilityTest: boolean;
  fl401HomeYesNo: boolean;
  fl401ApplicantOrRespondentNotCurrentlyHome: addressRadios;
  fl401ApplicantOrRespondentIntendedHome?: addressRadios;
}

interface FillInFieldsOptions {
  page: Page;
  fl401HomeYesNo: boolean;
  fl401ApplicantOrRespondentNotCurrentlyHome: addressRadios;
  fl401ApplicantOrRespondentIntendedHome?: addressRadios;
}

interface CheckPageLoadsOptions {
  page: Page,
  accessibilityTest: boolean,
  fl401HomeYesNo: boolean
}

interface FillInTopLevelFieldsOptions {
  page: Page,
  fl401HomeYesNo: boolean,
  fl401ApplicantOrRespondentNotCurrentlyHome: addressRadios,
  fl401ApplicantOrRespondentIntendedHome?: addressRadios;
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

export class Fl401Home1Page {
  public static async fl401Home1Page({
     page,
     accessibilityTest,
     fl401HomeYesNo,
     fl401ApplicantOrRespondentNotCurrentlyHome,
     fl401ApplicantOrRespondentIntendedHome
   }: FL401HomePageOptions): Promise<void> {
    page
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    fl401HomeYesNo
  }: CheckPageLoadsOptions): Promise<void> {
    await this.checkTopLevelPageLoads(page);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkTopLevelPageLoads(
    page: Page
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
          26,
          Fl401Home1Content,
          'topFormLabel',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkGroup(
          page,
          5,
          Fl401Home1Content,
          'labelYes',
          `${Selectors.GovukFormLabel}`
        ),
        Helpers.checkGroup(
          page,
          6,
          Fl401Home1Content,
          'labelNo',
          `${Selectors.GovukFormLabel}`
        ),
      ]
    )
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
          `${uniqueSelectors.homeChildrenDiv} > ${Selectors.GovukFormLabel}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homeChildrenDiv} > ${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelYes}")`,
          2
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homeChildrenDiv} > ${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelNo}")`,
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
    fl401ApplicantOrRespondentNotCurrentlyHome,
    fl401ApplicantOrRespondentIntendedHome
  }: FillInFieldsOptions): Promise<void> {
    await this.fillAndCheckAddressFields(page);
    await this.fillInTopLevelFields({
      page, fl401HomeYesNo, fl401ApplicantOrRespondentNotCurrentlyHome, fl401ApplicantOrRespondentIntendedHome
    })
  }

  private static async fillInAddressRadios({
    page,
    applicantOrRespondentResponse,
    isTopLevel
   }: FillInAddressRadiosOptions): Promise<void> { 
    const keyPrefix = (isTopLevel) ? 'topLevel' : 'secondLevel';
    let homeAddressRadioKey: keyof typeof inputIDs
    switch (applicantOrRespondentResponse) {
      case 'Yes, both of them':
         homeAddressRadioKey = `${keyPrefix}YesBothOfThem`
        await page.click(
          inputIDs[homeAddressRadioKey]
        );
        break
      case 'Yes, the applicant':
        homeAddressRadioKey = `${keyPrefix}YesBothOfThem`
        await page.click(
          inputIDs[homeAddressRadioKey]
        );
        break
      case 'Yes, the respondent':
        homeAddressRadioKey = `${keyPrefix}YesBothOfThem`
        await page.click(
          inputIDs[homeAddressRadioKey]
        );
        break
      case 'No':
        homeAddressRadioKey = `${keyPrefix}YesBothOfThem`
        await page.click(
          inputIDs[homeAddressRadioKey]
        );
        break
      default:
        console.log(
          `Unexpected value for applicantOrRespondentResponse: ${applicantOrRespondentResponse}`
        );
        break
    }
  }

  private static async fillInTopLevelFields({
    page,
    fl401HomeYesNo,
    fl401ApplicantOrRespondentNotCurrentlyHome,
  }: FillInTopLevelFieldsOptions): Promise<void> {
    for (let checkboxID of Object.values(checkboxIDs)) {
      await page.check(checkboxID);
    }
    const applicantOrRespondentResponse = fl401ApplicantOrRespondentNotCurrentlyHome
    const isTopLevel = true
    await this.fillInAddressRadios({
      page,
      applicantOrRespondentResponse,
      isTopLevel
    });
    if (fl401HomeYesNo) {
      await page.click(
        inputIDs.childrenAtAddressYes
      );
      await page.click(
        inputIDs.propertyAdaptedYes
      );
      await page.click(
        inputIDs.mortgagePropertyYes
      );
      await page.click(
        inputIDs.rentedPropertyYes
      );
      await page.click(
        inputIDs.applicantHomeRightsYes
      );
    } else {
      await page.click(
        inputIDs.childrenAtAddressNo
      );
      await page.click(
        inputIDs.propertyAdaptedNo
      );
      await page.click(
        inputIDs.mortgagePropertyNo
      );
      await page.click(
        inputIDs.rentedPropertyNo
      );
      await page.click(
        inputIDs.applicantHomeRightsNo
      );
    }
  }

  private static async fillInSecondLevelFields(
    page: Page
  ): Promise<void> {

  }

  private static async fillAndCheckAddressFields(page: Page): Promise<void> {
    await page.click(
      `button:text-is("${Fl401Home1Content.findAddress}")`,
    );
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.selectAddress}")`,
    );
    await page
      .locator(inputIDs.selectAddress)
      .selectOption({ index: 1 });
    await this.addressLabelValidation(page);
    await this.addressValueValidation(page);
  }

  private static async addressLabelValidation(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.buildingAndStreet}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${FL401Home1Content.buildingAndStreetOptional}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${FL401Home1Content.addressLine2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${FL401Home1Content.addressLine3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${FL401Home1Content.townOrCity}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${FL401Home1Content.addressCounty}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${FL401Home1Content.postalCode}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${FL401Home1Content.addressCountry}")`,
        1,
      ),
    ]);
  }

  private static async addressValueValidation(page: Page): Promise<void> {
    await Promise.all([
      expect(
        page.locator(inputIDs.buildingAndStreet),
      ).toHaveValue(FL401Home1Content.bpBuildingAndStreet),
      expect(page.locator(inputIDs.addressLine2)).toHaveValue(
        FL401Home1Content.bpAddressLine2,
      ),
      expect(page.locator(inputIDs.addressLine3)).toHaveValue(
        FL401Home1Content.bpAddressLine3,
      ),
      expect(page.locator(inputIDs.townOrCity)).toHaveValue(
        FL401Home1Content.bpCity,
      ),
      expect(page.locator(inputIDs.addressCounty)).toHaveValue(
        FL401Home1Content.bpCounty,
      ),
      expect(page.locator(inputIDs.postalCode)).toHaveValue(
        FL401Home1Content.bpPostalCode,
      ),
      expect(page.locator(inputIDs.addressCountry)).toHaveValue(
        FL401Home1Content.bpCountry,
      ),
    ]);
  }
}