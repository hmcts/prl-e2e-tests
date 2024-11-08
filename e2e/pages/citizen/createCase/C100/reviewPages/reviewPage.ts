import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CommonReviewContent } from "../../../../../fixtures/citizen/createCase/C100/reviewPages/commonReviewContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Relationship } from "../../../../../common/types";
import { FourthMiroContent } from "../../../../../fixtures/citizen/createCase/C100/reviewPages/fourthMiroContent";
import { MiamChildProtectionConcernsType } from "../MIAM/miamChildProtectionPage";
import { MiamUrgencyType } from "../MIAM/miamUrgencyPage";
import { MiamAttendanceType } from "../MIAM/miamPreviousAttendancePage";
import { MiamOtherReasonForNotAttending } from "../MIAM/miamMiamOtherPage";
import { MiamReasonForNoAccessToMediator } from "../MIAM/miamNoAccessToMediatorPage";
import { existsSync } from "fs";
import { c100ChildrenSupervisionRadios } from "../safetyConcerns/unsupervisedPage";

interface checkTextOptions {
  page: Page;
  accessibilityTest: boolean;
  relationshipType: Relationship;
}

interface fourthMiroOptions {
  page: Page;
  accessibilityTest: boolean;
  relationshipType: Relationship;
  miamAttendanceType: MiamAttendanceType; // Decides which reason there is for previous MIAM attendance.
  miamUrgencyType: MiamUrgencyType; // Decides which reason there is for urgency.
  miamOtherReasonForNotAttending: MiamOtherReasonForNotAttending; // Decides which Other reason there is for not attending
  miamChildProtectionConcernsType: MiamChildProtectionConcernsType; // Decides which child protection concern is listed.
  c100ChildrenSupervision: c100ChildrenSupervisionRadios
}

interface checkCommonTextOptions {
  page: Page;
  accessibilityTest: boolean;
}

const statementOfTruthCheckbox: string = '#statementOfTruth'

export class ReviewPage {
  private static async checkCommonText({
                                         page,
                                         accessibilityTest
                                       }: checkCommonTextOptions): Promise<void> {
    await page.locator(
      `${Selectors.GovukHeadingXL}:text-is("${CommonReviewContent.pageTitle}")`
    ).waitFor()
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyL}:text-is("${CommonReviewContent.bodyL}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h1}:text-is("${CommonReviewContent.statementTitle}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${CommonReviewContent.confirmationHeading}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CommonReviewContent.insetText}")`,
        1
      ),
      Helpers.checkGroup(
        page,
        2,
        CommonReviewContent,
        'label',
        Selectors.GovukLabel
      ),
      Helpers.checkGroup(
        page,
        2,
        CommonReviewContent,
        'strong',
        Selectors.strong
      ),
    ]);
    // if (accessibilityTest) {
    //   await AccessibilityTestHelper.run(page); #TODO Disabled pending PRL-6619 ticket
    // }
  }

  private static async fillInFields(
    page: Page
  ): Promise<void> {
    await page.check(statementOfTruthCheckbox);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonReviewContent.submitButton}")`
    );
  }

  public static async submitFourthMiro({
    page,
    accessibilityTest,
    relationshipType,
    miamAttendanceType,
    miamUrgencyType,
    miamChildProtectionConcernsType,
    miamOtherReasonForNotAttending,
    c100ChildrenSupervision
  }: fourthMiroOptions): Promise<void> {
    await this.checkCommonText({
      page: page,
      accessibilityTest: accessibilityTest
    });
    let yesCount = 9;
    if (c100ChildrenSupervision === 'yesSpendTime') {
      yesCount += 1
    }
    await Promise.all([
      Helpers.checkGroup(
        page,
        26,
        FourthMiroContent,
        'h2_',
        Selectors.h2
      ),
      Helpers.checkGroup(
        page,
        75,
        FourthMiroContent,
        'dt_',
        Selectors.dt
      ),
      Helpers.checkGroup(
        page,
        15,
        FourthMiroContent,
        'dd_',
        Selectors.dd
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_Swansea}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_DontKnow}")`,
        2
      ),
      Helpers.checkGroup(
        page,
        75,
        FourthMiroContent,
        'span_',
        Selectors.Span
      ),
      // Using Selectors.dt for dt_ prefixed items
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${FourthMiroContent.dt_whatTypeOfBehaviourHaveTheChildrenExperiencedOrAreAtRiskOfExperiencing}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${FourthMiroContent.dt_relationshipToExampletextExampletext}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${FourthMiroContent.dt_addressDetails}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${FourthMiroContent.dt_fullName}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${FourthMiroContent.dt_dateOfBirth}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dt}:text-is("${FourthMiroContent.dt_gender}")`,
        3
      ),

// Using Selectors.dd for dd_ prefixed items
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_yes}")`,
        yesCount
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_janeDoe}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_8November2002}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_other}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_exampletextExampletext}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_no}")`,
        29
      ),
      Helpers.checkGroup(
        page,
        40,
        FourthMiroContent,
        'li_',
        Selectors.li
      ),
      // Using Selectors.Span for span_ prefixed items
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${FourthMiroContent.span_whatTypeOfBehaviourHaveTheChildrenExperiencedOrAreAtRiskOfExperiencing}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${FourthMiroContent.span_fullName}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${FourthMiroContent.span_dateOfBirth}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${FourthMiroContent.span_gender}")`,
        3
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${FourthMiroContent.span_relationshipToExampletextExampletext}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${FourthMiroContent.span_addressDetails}")`,
        2
      ),
      Helpers.checkGroup(
        page,
        2,
        FourthMiroContent,
        'b_',
        Selectors.b
      ),
      Helpers.checkGroup(
        page,
        5,
        FourthMiroContent,
        'ul_',
        Selectors.ul
      ),
      Helpers.checkGroup(
        page,
        9,
        FourthMiroContent,
        'h4_',
        Selectors.h4
      ),
      // Using Selectors.h4 for h4_ prefixed items
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${FourthMiroContent.h4_whichChildrenAreYouConcernedAboutoptional}")`,
        5
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${FourthMiroContent.h4_describeTheBehavioursYouWouldLikeTheCourtToBeAwareOfoptional}")`,
        11
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${FourthMiroContent.h4_whenDidThisBehaviourStartAndHowLongDidItContinueoptional}")`,
        11
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${FourthMiroContent.h4_isTheBehaviourOngoingoptional}")`,
        11
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h4}:text-is("${FourthMiroContent.h4_haveYouEverAskedForHelpFromAProfessionalPersonOrAgencyoptional}")`,
        11
      ),
      // Using Selectors.li for li_ prefixed items
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_somethingElse}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_physicalAbuse}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_psychologicalAbuse}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_emotionalAbuse}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_sexualAbuse}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_financialAbuse}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_aSpecificHolidayOrArrangement}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_whatSchoolTheChildrenWillGoTo}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_aReligiousIssue}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_medicalTreatment}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_changingTheChildrensNamesOrSurname}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_allowingMedicalTreatmentToBeCarriedOutOnTheChildren}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_decideWhoTheChildrenLiveWithAndWhen}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_decideHowMuchTimeTheChildrenSpendWithEachPerson}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_takingTheChildrenOnHoliday}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_relocatingTheChildrenToADifferentAreaInEnglandAndWales}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_relocatingTheChildrenOutsideOfEnglandAndWalesincludingScotlandAndNorthernIreland}")`,
        4
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_returningTheChildrenToYourCare}")`,
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${FourthMiroContent.li_exampletextExampletext}")`,
        6
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${FourthMiroContent.div_no}")`,
        11
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${FourthMiroContent.div_1}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${FourthMiroContent.p_no}")`,
        4
      )
    ]);
    if (c100ChildrenSupervision === 'yesButSupervised') {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_YesSupervised}")`,
        1
      )
    }
    if (miamAttendanceType === 'Previous 4 months') {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_FourMonths}")`,
        1
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.b}:text-is("${FourthMiroContent.b_evidence}")`,
        1
      )
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_none}")`,
        3
      )
    }
    switch (miamUrgencyType) {
      case "Risk to life":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${FourthMiroContent.dd_riskToLife}")`,
          1,
        );
        break;
      case "Risk to family life":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${FourthMiroContent.dd_RiskToFamily}")`,
          1,
        );
        break;
      case "Risk to safety of home":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${FourthMiroContent.dd_RiskToHome}")`,
          1,
        );
        break;
      case "Delay causing risk of harm":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${FourthMiroContent.dd_CauseHarm}")`,
          1,
        );
        break;
      case "Delay causing risk of financial hardship":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${FourthMiroContent.dd_FinancialHardship}")`,
          1
        )
        break
      case "Delay causing risk of irretrievable problems":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${FourthMiroContent.dd_Irretrievable}")`,
          1
        )
        break
      case 'Delay dispute starting in another country':
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${FourthMiroContent.dd_AbroadCourt}")`,
          1
        )
        break
      case 'Delay causing risk of unfair court decision':
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${FourthMiroContent.dd_UnfairCourt}")`,
          1
        )
        break
      case 'Delay causing risk of removal':
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.dd}:text-is("${FourthMiroContent.dd_ChildrenRemoved}")`,
          1
        )
        break
      default:
        if (existsSync('.env')) {
          console.log(
            `Unrecognised urgency type: ${miamUrgencyType}`
          )
        }
    }
    if (miamChildProtectionConcernsType === 'Child protection plan') {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_ChildProtection}")`,
        1
      )
    }
    if (miamOtherReasonForNotAttending === 'Applying for without notice') {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.dd}:text-is("${FourthMiroContent.dd_WithoutNotice}")`,
        1
      )
    }
    await this.fillInFields(page)
  }
}