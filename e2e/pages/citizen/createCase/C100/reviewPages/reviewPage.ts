import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CommonReviewContent } from "../../../../../fixtures/citizen/createCase/C100/reviewPages/commonReviewContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CaJourneyWrittenConsentReviewContent } from "../../../../../fixtures/citizen/createCase/C100/reviewPages/caJourneyWrittenConsentReviewContent";
import { CaJourneyEmergencyProtectionReviewContent } from "../../../../../fixtures/citizen/createCase/C100/reviewPages/caJourneyEmergencyProtectionReviewContent";
import {
  CapitalizedRelationship,
  Relationship,
} from "../../../../../common/types";
import { CaJourneyMIAMHearingUrgencyReviewContent } from "../../../../../fixtures/citizen/createCase/C100/reviewPages/caJourneyMIAMHearingUrgencyReviewContent";
import { existsSync } from "fs";
import { MiamAttendanceType } from "../MIAM/miamPreviousAttendancePage";
import { MiamUrgencyType } from "../MIAM/miamUrgencyPage";
import { MiamOtherReasonForNotAttending } from "../MIAM/miamMiamOtherPage";
import { MiamChildProtectionConcernsType } from "../MIAM/miamChildProtectionPage";
import { c100ChildrenSupervisionRadios } from "../safetyConcerns/unsupervisedPage";

interface caJourneyEmergencyProtectionOptions {
  page: Page;
  accessibilityTest: boolean;
  relationshipType: CapitalizedRelationship;
  c100YesNoNeedHelpWithFees: boolean;
}

interface checkCommonTextOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface caJourneyMIAMUrgencyOptions {
  page: Page;
  accessibilityTest: boolean;
  relationshipType: Relationship;
  miamAttendanceType: MiamAttendanceType; // Decides which reason there is for previous MIAM attendance.
  miamUrgencyType: MiamUrgencyType; // Decides which reason there is for urgency.
  miamOtherReasonForNotAttending: MiamOtherReasonForNotAttending; // Decides which Other reason there is for not attending
  miamChildProtectionConcernsType: MiamChildProtectionConcernsType; // Decides which child protection concern is listed.
  c100ChildrenSupervision: c100ChildrenSupervisionRadios;
  c100YesNoNeedHelpWithFees: boolean;
}

interface caWrittenConsentJourneyOptions {
  page: Page;
  accessibilityTest: boolean;
  reviewPageTopJourneyMotherFather: reviewPageTopJourneyMotherFather;
  relationshipType: CapitalizedRelationship;
  c100YesNoNeedHelpWithFees: boolean;
}

export type reviewPageTopJourneyMotherFather = "mother" | "father";

const statementOfTruthCheckbox: string = "#statementOfTruth";

export class ReviewPage {
  private static async checkCommonText({
    page,
    accessibilityTest,
  }: checkCommonTextOptions): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page
      .locator(
        `${Selectors.GovukHeadingXL}:text-is("${CommonReviewContent.pageTitle}")`,
      )
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyL}:text-is("${CommonReviewContent.bodyL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h1}:text-is("${CommonReviewContent.statementTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${CommonReviewContent.confirmationHeading}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        CommonReviewContent,
        "label",
        Selectors.GovukLabel,
      ),
      Helpers.checkGroup(
        page,
        2,
        CommonReviewContent,
        "strong",
        Selectors.strong,
      ),
    ]);
    // if (accessibilityTest) {
    //   await AccessibilityTestHelper.run(page); #TODO Disabled pending PRL-6619 ticket
    // }
  }

  private static async fillInFields(
    page: Page,
    c100YesNoNeedHelpWithFees: boolean,
  ): Promise<void> {
    await page.check(statementOfTruthCheckbox);
    await page.click(
      `${Selectors.GovukButton}:text-is("${c100YesNoNeedHelpWithFees ? CommonReviewContent.submitButton : CommonReviewContent.submitButtonPay}")`,
    );
  }

  public static async c100CAWithWrittenConsentFromOtherPeople({
    page,
    accessibilityTest,
    reviewPageTopJourneyMotherFather,
    relationshipType,
    c100YesNoNeedHelpWithFees,
  }: caWrittenConsentJourneyOptions): Promise<void> {
    await this.checkCommonText({
      page,
      accessibilityTest,
    });
    const relationshipKey =
      `dd_${relationshipType}` as keyof typeof CaJourneyWrittenConsentReviewContent;
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyWrittenConsentReviewContent[relationshipKey]}")`,
        3,
      ),
      Helpers.checkGroup(
        page,
        21,
        CaJourneyWrittenConsentReviewContent,
        "h2_",
        `${Selectors.h2}`,
      ),
      Helpers.checkGroup(
        page,
        81,
        CaJourneyWrittenConsentReviewContent,
        "dt_",
        `${Selectors.dt}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyWrittenConsentReviewContent.dt_whatTypeOfBehaviourHaveTheChildrenExperiencedOrAreAtRiskOfExperiencing}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyWrittenConsentReviewContent.dt_haveTheyChangedTheirName}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyWrittenConsentReviewContent.dt_placeOfBirth}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyWrittenConsentReviewContent.dt_relationshipToExampletextExampletext}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyWrittenConsentReviewContent.dt_fullName}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyWrittenConsentReviewContent.dt_dateOfBirth}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyWrittenConsentReviewContent.dt_gender}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyWrittenConsentReviewContent.dt_addressDetails}")`,
        3,
      ),
      Helpers.checkGroup(
        page,
        c100YesNoNeedHelpWithFees ? 14 : 13,
        CaJourneyWrittenConsentReviewContent,
        "dd_",
        `${Selectors.dd}`,
      ),
      // Using Selectors.dd for dd_ prefixed items in CaJourneyWrittenConsentReviewContent
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyWrittenConsentReviewContent.dd_swansea}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyWrittenConsentReviewContent.dd_exampletextExampletext}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyWrittenConsentReviewContent.dd_12October2008}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyWrittenConsentReviewContent.dd_yes}")`,
        36,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyWrittenConsentReviewContent.dd_male}")`,
        5,
      ),
      Helpers.checkGroup(
        page,
        c100YesNoNeedHelpWithFees ? 81 : 80,
        CaJourneyWrittenConsentReviewContent,
        "span_",
        Selectors.Span,
      ),
      // Using Selectors.Span for span_ prefixed items in CaJourneyWrittenConsentReviewContent
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyWrittenConsentReviewContent.span_whatTypeOfBehaviourHaveTheChildrenExperiencedOrAreAtRiskOfExperiencing}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyWrittenConsentReviewContent.span_haveTheyChangedTheirName}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyWrittenConsentReviewContent.span_placeOfBirth}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyWrittenConsentReviewContent.span_fullName}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyWrittenConsentReviewContent.span_dateOfBirth}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyWrittenConsentReviewContent.span_gender}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyWrittenConsentReviewContent.span_relationshipToExampletextExampletext}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyWrittenConsentReviewContent.span_addressDetails}")`,
        3,
      ),
      Helpers.checkGroup(
        page,
        80,
        CaJourneyWrittenConsentReviewContent,
        "li_",
        Selectors.li,
      ),
      // Using Selectors.li for li_ prefixed items in CaJourneyWrittenConsentReviewContent
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_otherLoremIpsumOther}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_visitToCourtBeforeTheHearing}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_somethingElse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_physicalAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_psychologicalAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_emotionalAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_sexualAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_financialAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_aSpecificHolidayOrArrangement}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_whatSchoolTheChildrenWillGoTo}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_aReligiousIssue}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_medicalTreatment}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_returningTheChildrenToYourCare}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_changingTheChildrensNamesOrSurname}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_allowingMedicalTreatmentToBeCarriedOutOnTheChildren}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_takingTheChildrenOnHoliday}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_decideWhoTheChildrenLiveWithAndWhen}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_decideHowMuchTimeTheChildrenSpendWithEachPerson}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_relocatingTheChildrenToADifferentAreaInEnglandAndWales}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyWrittenConsentReviewContent.li_relocatingTheChildrenOutsideOfEnglandAndWalesincludingScotlandAndNorthernIreland}")`,
        4,
      ),
      Helpers.checkGroup(
        page,
        17,
        CaJourneyWrittenConsentReviewContent,
        "h4_",
        Selectors.h4,
      ),
      // Using Selectors.h4 for h4_ prefixed items in CaJourneyWrittenConsentReviewContent
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_whichCourtIssuedTheOrderoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_caseNumberoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_whatDateWasItMadeoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_child1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_details}")`,
        24,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_isThisACurrentOrderoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_whatDateDidItEndoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_doYouHaveACopyOfTheOrderoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_whichChildrenAreYouConcernedAboutoptional}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_describeTheBehavioursYouWouldLikeTheCourtToBeAwareOfoptional}")`,
        11,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_whenDidThisBehaviourStartAndHowLongDidItContinueoptional}")`,
        11,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_isTheBehaviourOngoingoptional}")`,
        11,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyWrittenConsentReviewContent.h4_haveYouEverAskedForHelpFromAProfessionalPersonOrAgencyoptional}")`,
        11,
      ),
      Helpers.checkGroup(
        page,
        21,
        CaJourneyWrittenConsentReviewContent,
        "p_",
        Selectors.p,
      ),
      // Using Selectors.p for p_ prefixed items in CaJourneyWrittenConsentReviewContent
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_loremIpsumStartDetails}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_10July2014}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_10July2018}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_automatedOccupationOrderCourt}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_18August2015}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_18August2018}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_automatedChildAbductionOrderCourt}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_10June2015}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_bs19f99999}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_10July2016}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_10July2017}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_yes}")`,
        39,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyWrittenConsentReviewContent.p_10June2017}")`,
        3,
      ),
      Helpers.checkGroup(
        page,
        13,
        CaJourneyWrittenConsentReviewContent,
        "div_",
        Selectors.div,
      ),
      // Using Selectors.div for div_ prefixed items in CaJourneyWrittenConsentReviewContent
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${CaJourneyWrittenConsentReviewContent.div_automatedEmotionalSeekHelpDetails}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${CaJourneyWrittenConsentReviewContent.div_automatedPhysicalSeekHelpDetails}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${CaJourneyWrittenConsentReviewContent.div_yes}")`,
        12,
      ),
    ]);
    await this.fillInFields(page, c100YesNoNeedHelpWithFees);
  }

  public static async c100CAEmergencyProtection({
    page,
    accessibilityTest,
    relationshipType,
    c100YesNoNeedHelpWithFees,
  }: caJourneyEmergencyProtectionOptions): Promise<void> {
    await this.checkCommonText({
      page,
      accessibilityTest,
    });
    await Promise.all([
      Helpers.checkGroup(
        page,
        25,
        CaJourneyEmergencyProtectionReviewContent,
        "h2_",
        Selectors.h2,
      ),
      Helpers.checkGroup(
        page,
        86,
        CaJourneyEmergencyProtectionReviewContent,
        "dt_",
        Selectors.dt,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyEmergencyProtectionReviewContent.dt_whatTypeOfBehaviourHaveTheChildrenExperiencedOrAreAtRiskOfExperiencing}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyEmergencyProtectionReviewContent.dt_haveTheyChangedTheirName}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyEmergencyProtectionReviewContent.dt_placeOfBirth}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyEmergencyProtectionReviewContent.dt_relationshipToExampletextExampletext}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyEmergencyProtectionReviewContent.dt_addressDetails}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyEmergencyProtectionReviewContent.dt_fullName}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyEmergencyProtectionReviewContent.dt_dateOfBirth}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyEmergencyProtectionReviewContent.dt_gender}")`,
        5,
      ),
      Helpers.checkGroup(
        page,
        13,
        CaJourneyEmergencyProtectionReviewContent,
        "dd_",
        Selectors.dd,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyEmergencyProtectionReviewContent.dd_example}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyEmergencyProtectionReviewContent.dd_Other}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyEmergencyProtectionReviewContent.dd_janeDoe}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyEmergencyProtectionReviewContent.dd_swansea}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:has-text("${relationshipType}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyEmergencyProtectionReviewContent.dd_exampletextExampletext}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyEmergencyProtectionReviewContent.dd_12October2008}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyEmergencyProtectionReviewContent.dd_male}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyEmergencyProtectionReviewContent.dd_no}")`,
        c100YesNoNeedHelpWithFees ? 2 : 3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyEmergencyProtectionReviewContent.dd_yes}")`,
        c100YesNoNeedHelpWithFees ? 38 : 37,
      ),
      Helpers.checkGroup(
        page,
        c100YesNoNeedHelpWithFees ? 87 : 86,
        CaJourneyEmergencyProtectionReviewContent,
        "span_",
        Selectors.Span,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyEmergencyProtectionReviewContent.span_whatTypeOfBehaviourHaveTheChildrenExperiencedOrAreAtRiskOfExperiencing}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyEmergencyProtectionReviewContent.span_haveTheyChangedTheirName}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyEmergencyProtectionReviewContent.span_placeOfBirth}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyEmergencyProtectionReviewContent.span_relationshipToExampletextExampletext}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyEmergencyProtectionReviewContent.span_addressDetails}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyEmergencyProtectionReviewContent.span_fullName}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyEmergencyProtectionReviewContent.span_dateOfBirth}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyEmergencyProtectionReviewContent.span_gender}")`,
        5,
      ),
      Helpers.checkGroup(
        page,
        83,
        CaJourneyEmergencyProtectionReviewContent,
        "li_",
        Selectors.li,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_otherLoremIpsumOther}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_visitToCourtBeforeTheHearing}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_somethingElse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_physicalAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_psychologicalAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_emotionalAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_sexualAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_financialAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_exampletextExampletext}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_aSpecificHolidayOrArrangement}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_whatSchoolTheChildrenWillGoTo}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_aReligiousIssue}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_medicalTreatment}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_changingTheChildrensNamesOrSurname}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_allowingMedicalTreatmentToBeCarriedOutOnTheChildren}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_takingTheChildrenOnHoliday}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_relocatingTheChildrenToADifferentAreaInEnglandAndWales}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_relocatingTheChildrenOutsideOfEnglandAndWalesincludingScotlandAndNorthernIreland}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_decideWhoTheChildrenLiveWithAndWhen}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_decideHowMuchTimeTheChildrenSpendWithEachPerson}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyEmergencyProtectionReviewContent.li_returningTheChildrenToYourCare}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        17,
        CaJourneyEmergencyProtectionReviewContent,
        "h4_",
        Selectors.h4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_child1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_details}")`,
        26,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_whichCourtIssuedTheOrderoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_caseNumberoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_whatDateWasItMadeoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_isThisACurrentOrderoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_whatDateDidItEndoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_doYouHaveACopyOfTheOrderoptional}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_whichChildrenAreYouConcernedAboutoptional}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_describeTheBehavioursYouWouldLikeTheCourtToBeAwareOfoptional}")`,
        11,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_whenDidThisBehaviourStartAndHowLongDidItContinueoptional}")`,
        11,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_isTheBehaviourOngoingoptional}")`,
        11,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyEmergencyProtectionReviewContent.h4_haveYouEverAskedForHelpFromAProfessionalPersonOrAgencyoptional}")`,
        11,
      ),
      Helpers.checkGroup(
        page,
        20,
        CaJourneyEmergencyProtectionReviewContent,
        "p_",
        Selectors.p,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_21} '${c100YesNoNeedHelpWithFees ? CommonReviewContent.submitButton : CommonReviewContent.submitButtonPay}' ${CaJourneyEmergencyProtectionReviewContent.p_21_2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        13,
        CaJourneyEmergencyProtectionReviewContent,
        "div_",
        Selectors.div,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_exampletext}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_loremIpsumStartDetails}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_10July2014}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_automatedOccupationOrderCourt}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_10July2018}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_18August2015}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_automatedChildAbductionOrderCourt}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_10June2015}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_10June2017}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_bs19f99999}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_10July2016}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_yes}")`,
        39,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_10July2017}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyEmergencyProtectionReviewContent.p_18August2018}")`,
        2,
      ),
    ]);
    if (c100YesNoNeedHelpWithFees) {
      console.log("IF STATEMENT RUN");
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dt}:text-is("${CaJourneyEmergencyProtectionReviewContent.dt_87}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${CaJourneyEmergencyProtectionReviewContent.dd_14}")`,
          1,
        ),
      ]);
    }
    await this.fillInFields(page, c100YesNoNeedHelpWithFees);
  }

  public static async c100CAMIAMHearingUrgency({
    page,
    accessibilityTest,
    miamAttendanceType,
    miamUrgencyType,
    miamChildProtectionConcernsType,
    miamOtherReasonForNotAttending,
    c100ChildrenSupervision,
    c100YesNoNeedHelpWithFees,
  }: caJourneyMIAMUrgencyOptions): Promise<void> {
    await this.checkCommonText({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    let yesCount = 9;
    if (c100ChildrenSupervision === "yesSpendTime") {
      yesCount += 1;
    }
    await Promise.all([
      Helpers.checkGroup(
        page,
        26,
        CaJourneyMIAMHearingUrgencyReviewContent,
        "h2_",
        Selectors.h2,
      ),
      Helpers.checkGroup(
        page,
        75,
        CaJourneyMIAMHearingUrgencyReviewContent,
        "dt_",
        Selectors.dt,
      ),
      Helpers.checkGroup(
        page,
        15,
        CaJourneyMIAMHearingUrgencyReviewContent,
        "dd_",
        Selectors.dd,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_Swansea}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_DontKnow}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        75,
        CaJourneyMIAMHearingUrgencyReviewContent,
        "span_",
        Selectors.Span,
      ),
      // Using Selectors.dt for dt_ prefixed items
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dt_whatTypeOfBehaviourHaveTheChildrenExperiencedOrAreAtRiskOfExperiencing}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dt_relationshipToExampletextExampletext}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dt_addressDetails}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dt_fullName}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dt_dateOfBirth}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dt_gender}")`,
        3,
      ),

      // Using Selectors.dd for dd_ prefixed items
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_yes}")`,
        yesCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_janeDoe}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_other}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_no}")`,
        29,
      ),
      Helpers.checkGroup(
        page,
        40,
        CaJourneyMIAMHearingUrgencyReviewContent,
        "li_",
        Selectors.li,
      ),
      // Using Selectors.Span for span_ prefixed items
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.span_whatTypeOfBehaviourHaveTheChildrenExperiencedOrAreAtRiskOfExperiencing}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.span_fullName}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.span_dateOfBirth}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.span_gender}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.span_relationshipToExampletextExampletext}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.span_addressDetails}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        2,
        CaJourneyMIAMHearingUrgencyReviewContent,
        "b_",
        Selectors.b,
      ),
      Helpers.checkGroup(
        page,
        5,
        CaJourneyMIAMHearingUrgencyReviewContent,
        "ul_",
        Selectors.li,
      ),
      Helpers.checkGroup(
        page,
        9,
        CaJourneyMIAMHearingUrgencyReviewContent,
        "h4_",
        Selectors.h4,
      ),
      // Using Selectors.h4 for h4_ prefixed items
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.h4_whichChildrenAreYouConcernedAboutoptional}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.h4_describeTheBehavioursYouWouldLikeTheCourtToBeAwareOfoptional}")`,
        11,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.h4_whenDidThisBehaviourStartAndHowLongDidItContinueoptional}")`,
        11,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.h4_isTheBehaviourOngoingoptional}")`,
        11,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.h4_haveYouEverAskedForHelpFromAProfessionalPersonOrAgencyoptional}")`,
        11,
      ),
      // Using Selectors.li for li_ prefixed items
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_somethingElse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_physicalAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_psychologicalAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_emotionalAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_sexualAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_financialAbuse}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_aSpecificHolidayOrArrangement}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_whatSchoolTheChildrenWillGoTo}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_aReligiousIssue}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_medicalTreatment}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_changingTheChildrensNamesOrSurname}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_allowingMedicalTreatmentToBeCarriedOutOnTheChildren}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_decideWhoTheChildrenLiveWithAndWhen}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_decideHowMuchTimeTheChildrenSpendWithEachPerson}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_takingTheChildrenOnHoliday}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_relocatingTheChildrenToADifferentAreaInEnglandAndWales}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_relocatingTheChildrenOutsideOfEnglandAndWalesincludingScotlandAndNorthernIreland}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_returningTheChildrenToYourCare}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.li_exampletextExampletext}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.div_no}")`,
        11,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.div_1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.p_no}")`,
        4,
      ),
    ]);
    if (c100ChildrenSupervision === "yesButSupervised") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_YesSupervised}")`,
        1,
      );
    }
    if (miamAttendanceType === "Previous 4 months") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_FourMonths}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.b}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.b_evidence}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_none}")`,
        3,
      );
    }
    switch (miamUrgencyType) {
      case "Risk to life":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_riskToLife}")`,
          1,
        );
        break;
      case "Risk to family life":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_RiskToFamily}")`,
          1,
        );
        break;
      case "Risk to safety of home":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_RiskToHome}")`,
          1,
        );
        break;
      case "Delay causing risk of harm":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_CauseHarm}")`,
          1,
        );
        break;
      case "Delay causing risk of financial hardship":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_FinancialHardship}")`,
          1,
        );
        break;
      case "Delay causing risk of irretrievable problems":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_Irretrievable}")`,
          1,
        );
        break;
      case "Delay dispute starting in another country":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_AbroadCourt}")`,
          1,
        );
        break;
      case "Delay causing risk of unfair court decision":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_UnfairCourt}")`,
          1,
        );
        break;
      case "Delay causing risk of removal":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_ChildrenRemoved}")`,
          1,
        );
        break;
      default:
        if (existsSync(".env")) {
          console.log(`Unrecognised urgency type: ${miamUrgencyType}`);
        }
    }
    if (miamChildProtectionConcernsType === "Child protection plan") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_ChildProtection}")`,
        1,
      );
    }
    if (miamOtherReasonForNotAttending === "Applying for without notice") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${CaJourneyMIAMHearingUrgencyReviewContent.dd_WithoutNotice}")`,
        1,
      );
    }
    await this.fillInFields(page, c100YesNoNeedHelpWithFees);
  }
}
