import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { Fl401Home1Content } from "../../../../../fixtures/manageCases/createCase/FL401/theHome/fl401Home1Content";
import { Helpers } from "../../../../../common/helpers";

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

enum radioIDs {
  livedAtHomeYesBothOfThem = '#home_everLivedAtTheAddress-yesBothOfThem',
  livedAtHomeYesApplicant = '#home_everLivedAtTheAddress-yesApplicant',
  livedAtHomeYesRespondent = '#home_everLivedAtTheAddress-yesRespondent',
  neverLivedAtAddress = '#home_everLivedAtTheAddress-No',
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
  intendToLiveAtHomeYesBoth = '#home_intendToLiveAtTheAddress-yesBothOfThem',
  intendToLiveAtHomeYesApplicant = '#home_intendToLiveAtTheAddress-yesApplicant',
  intendToLiveAtHomeYesRespondent = '#home_intendToLiveAtTheAddress-yesRespondent',
  intendToLiveAtHomeNo = '#home_intendToLiveAtTheAddress-No',
}

export type FL401ApplicantOrRespondentNotCurrentlyHome =
  'Yes, both of them'
  | 'Yes, the applicant'
  | 'Yes, the respondent'
  | 'No'

interface FL401HomePageOptions {
  page: Page,
  accessibilityTest: boolean,
  errorMessaging: boolean,
  fl401HomeYesNo: boolean,
  fl401ApplicantOrRespondentNotCurrentlyHome: FL401ApplicantOrRespondentNotCurrentlyHome
}

interface CheckPageLoadsOptions {
  page: Page,
  accessibilityTest: boolean,
  fl401HomeYesNo: boolean
}

interface FillInTopLevelFieldsOptions {
  page: Page,
  fl401HomeYesNo: boolean,
  fl401ApplicantOrRespondentNotCurrentlyHome: FL401ApplicantOrRespondentNotCurrentlyHome
}


export class Fl401Home1Page {
  public static async fl401Home1Page({
     page,
     accessibilityTest,
     errorMessaging,
     fl401HomeYesNo,
     fl401ApplicantOrRespondentNotCurrentlyHome
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

  private static async fillInTopLevelFields({
    page,
    fl401HomeYesNo,
    fl401ApplicantOrRespondentNotCurrentlyHome
  }: FillInTopLevelFieldsOptions): Promise<void> {
    for (let checkboxID of Object.values(checkboxIDs)) {
      await page.check(checkboxID);
    }
    switch (fl401ApplicantOrRespondentNotCurrentlyHome) {
      case 'Yes, the respondent':

    }
  }
}