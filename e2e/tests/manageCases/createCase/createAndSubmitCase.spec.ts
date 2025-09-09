import { test } from "@playwright/test";
import Config from "../../../utils/config.utils.js";
import { FL401ApplicantDetails } from "../../../journeys/manageCases/createCase/FL401ApplicantDetails/FL401ApplicantDetails.js";
import { SolicitorCreateInitial } from "../../../journeys/manageCases/createCase/solicitorCreateInitial.js";
import { FL401TypeOfApplication } from "../../../journeys/manageCases/createCase/FL401TypeOfApplication/FL401TypeOfApplication.js";
import { FL401WithoutNoticeOrder } from "../../../journeys/manageCases/createCase/FL401WithoutNoticeOrder/FL401WIthoutNoticeOrder.js";
import { FL401RespondentDetails } from "../../../journeys/manageCases/createCase/FL401RespondentDetails/FL401RespondentDetails.js";
import { FL401ApplicantsFamily } from "../../../journeys/manageCases/createCase/FL401ApplicantsFamily/FL401ApplicantsFamily.js";
import { FL401RelationshipToRespondent } from "../../../journeys/manageCases/createCase/FL401RelationshipToRespondent/FL401RelationshipToRespondent.js";
import { FL401RespondentsBehaviour } from "../../../journeys/manageCases/createCase/FL401RespondentsBehaviour/FL401RespondentsBehaviour.js";
import { FL401TheHome } from "../../../journeys/manageCases/createCase/FL401TheHome/fl401TheHome.js";
import { FL401OtherProceedings } from "../../../journeys/manageCases/createCase/FL401OtherProceedings/FL401OtherProceedings.js";
import { Fl401AttendingTheHearing } from "../../../journeys/manageCases/createCase/FL401AttendingTheHearing/fl401AttendingTheHearing.js";
import { FL401WelshLanguageRequirements } from "../../../journeys/manageCases/createCase/FL401WelshLanguageRequirements/FL401WelshLanguageRequirements.js";
import { Fl401StatementOfTruth } from "../../../journeys/manageCases/createCase/FL401StatementOfTruth/fl401StatementOfTruth.js";
import { Helpers } from "../../../common/helpers.js";
import {
  C100TypeOfApplication
} from "../../../journeys/manageCases/createCase/C100TypeOfApplication/C100TypeOfAplication.js";
import { C100HearingUrgency } from "../../../journeys/manageCases/createCase/C100HearingUrgency/C100HearingUrgency.js";
import {
  C100ApplicantDetails
} from "../../../journeys/manageCases/createCase/C100ApplicantDetails/c100ApplicantDetails.js";
import {
  C100RespondentDetails
} from "../../../journeys/manageCases/createCase/C100RespondentDetails/C100RespondentDetails.js";
import {
  C100OtherPeopleInTheCase
} from "../../../journeys/manageCases/createCase/C100OtherPeopleInTheCase/C100OtherPeopleInTheCase.js";
import { C100ChildDetails } from "../../../journeys/manageCases/createCase/C100ChildDetails/c100ChildDetails.js";
import {
  C100OtherChildrenNotInTheCase
} from "../../../journeys/manageCases/createCase/C100OtherChildrenNotInTheCase/C100OtherChildrenNotInTheCase.js";
import {
  C100ChildrenAndApplicants
} from "../../../journeys/manageCases/createCase/C100ChildrenAndApplicants/C100ChildrenAndApplicants.js";
import {
  C100ChildAndRespondents
} from "../../../journeys/manageCases/createCase/C100ChildrenAndRespondents/c100ChildrenAndRespondents.js";
import {
  C100ChildrenAndOtherPeople
} from "../../../journeys/manageCases/createCase/C100ChildrenAndOtherPeople/c100ChildrenAndOtherPeople.js";
import {
  C100AllegationsOfHarm
} from "../../../journeys/manageCases/createCase/C100AllegationsOfHarm/c100AllegationsOfHarm.js";
import {
  C100MiamPolicyUpgrade
} from "../../../journeys/manageCases/createCase/C100MiamPolicyUpgrade/C100MiamPolicyUpgrade.js";
import {
  C100OtherProceedings
} from "../../../journeys/manageCases/createCase/C100OtherProceedings/C100OtherProceedings.js";
import {
  C100AttendingTheHearing
} from "../../../journeys/manageCases/createCase/C100AttendingTheHearing/c100AttendingTheHearing.js";
import {
  C100InternationalElement
} from "../../../journeys/manageCases/createCase/C100InternationalElement/C100InternationalElement.js";
import {
  C100LitigationCapacity
} from "../../../journeys/manageCases/createCase/C100LitigationCapacity/C100LitigationCapacity.js";
import {
  C100WelshLanguageRequirements
} from "../../../journeys/manageCases/createCase/C100welshLanguageRequirements/C100welshLanguageRequirements.js";
import { C100SubmitAndPay } from "../../../journeys/manageCases/createCase/C100SubmitAndPay/C100SubmitAndPay.js";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

// Class to create a non-TS-Support case locally
test.describe("Create and submit a case", (): void => {
  test(`Create and submit an FL401 case`, async ({
    page,
  }): Promise<void> => {
    await SolicitorCreateInitial.createInitialCase({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      solicitorCaseType: "FL401",
      errorMessaging: false,
    });
    await FL401TypeOfApplication.fl401TypeOfApplication({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      isLinkedToC100: false,
      subJourney: false,
    });
    await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: false,
      isWithoutNoticeDetailsYes: true,
      isWithoutNoticeDetailsBailConditions: "Yes",
    });
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoFL401ApplicantDetails: true,
      applicantGender: "male",
      subJourney: false,
    });
    await FL401RespondentDetails.fl401RespondentDetails({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: false,
      respondentDetailsAllOptionsYes: true,
    });
    await FL401ApplicantsFamily.fl401ApplicantsFamily({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: false,
      applicantHasChildren: false,
    });
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: false,
      relationshipToRespondent: "marriedOrCivil",
    });
    await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
      page: page,
      accessibilityTest: false,
      subJourney: false,
    });
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      subJourney: false,
      applicantHasChildren: false,
      fl401TheHomeYesNo: true,
      fl401EverLivedAtAddress: "yesBothOfThem",
      fl401IntendToLiveAtAddress: "yesBothOfThem",
    });
    await FL401OtherProceedings.fl401OtherProceedings({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: false,
      otherProceedingsRadios: "No",
    });
    await Fl401AttendingTheHearing.fl401AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: false,
      fl401AttendingTheHearingYesNo: true,
    });
    await FL401WelshLanguageRequirements.fl401WelshLanguageRequirements({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: false,
      welshLanguageRequirementsAllOptionsYes: true,
      welshLanguageRequirementsSelectWelsh: true,
    });
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      subJourney: false,
      fl401YesNoToEverything: true,
    });
    console.log(await Helpers.getCaseNumberFromUrl(page));
  });

  test(`Create and submit an C100 case @regression`, async ({
    page,
  }): Promise<void> => {
    await SolicitorCreateInitial.createInitialCase({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      solicitorCaseType: "C100",
      errorMessaging: false,
    });
    await C100TypeOfApplication.c100TypeOfApplication({
      page,
      user: "solicitor",
      accessibilityTest: true,
      errorMessaging: false,
      yesNoC100TypeOfApplication: true,
      typeOfChildArrangementOrder: "Spend time with order",
      selectionC100TypeOfApplication: "Yes",
      subJourney: false,
    });
    await C100HearingUrgency.c100HearingUrgency({
      page,
      user: "solicitor",
      accessibilityTest: true,
      errorMessaging: false,
      yesNoHearingUrgency: true,
      subJourney: false,
    });
    await C100ApplicantDetails.C100ApplicantDetails({
      page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoApplicantDetails: false,
      applicantGender: "female",
      subJourney: false,
    });
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      user: "solicitor",
      accessibilityTest: true,
      yesNoRespondentDetailsC100: true,
      respondentGender: "female",
      respondentAddress5Years: "yes",
      respondentLegalRepresentation: "yes",
      subJourney: false,
    });
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoOtherPeopleInTheCase: true,
      otherPersonLivesInRefuge: true,
      applicantGender: "male",
      subJourney: false,
    });
    await C100ChildDetails.c100ChildDetails({
      page: page,
      user: "solicitor",
      accessibilityTest: true,
      c100ChildGender: "female",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "no",
      subJourney: false,
    });
    await C100OtherChildrenNotInTheCase.c100OtherChildrenNotInTheCase({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      otherChildPresent: false,
      otherChildGender: "They identify in another way",
      otherChildDOBKnown: true,
      subJourney: false,
    });
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      applicantChildRelationship: "Other",
      childLiveWithApplicant: true,
      subJourney: false,
    });
    await C100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoRespondentDetails: true,
      respondentGender: "female",
      respondentAddress5Years: "yes",
      respondentLegalRepresentation: "yes",
      c100ChildGender: "female",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
      yesNoChildrenAndRespondents: false,
      subJourney: false,
    });
    await C100ChildrenAndOtherPeople.c100ChildrenAndOtherPeople({
      page: page,
      user: "solicitor",
      accessibilityTest: true,
      errorMessaging: false,
      yesNoOtherPeopleInTheCase: true,
      otherPersonLivesInRefuge: false,
      applicantGender: "male",
      c100ChildGender: "male",
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
      yesNoChildrenAndOtherPeople: true,
      subJourney: false,
    });
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100YesNoAllegationsOfHarm: true,
      subJourney: false,
      c100DomesticAbuseTypePage3: "Physical abuse",
    });
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: "solicitor",
      accessibilityTest: true,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yes",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "initiatedMIAMBeforeProceedings_MIAMDetails",
      subJourney: false,
    });
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100OtherProceedings: "No",
      subJourney: false,
    });
    await C100AttendingTheHearing.c100AttendingTheHearing({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100AttendingTheHearingYesNo: true,
      subJourney: false,
    });
    await C100InternationalElement.c100InternationalElement({
      page: page,
      user: "solicitor",
      accessibilityTest: true,
      yesNoInternationalElement: true,
      subJourney: false,
    });
    await C100LitigationCapacity.c100LitigationCapacity({
      page: page,
      user: "solicitor",
      accessibilityTest: true,
      yesNoLitigationCapacity: true,
      subJourney: false,
    });
    await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
      page: page,
      user: "solicitor",
      accessibilityTest: true,
      WelshPageRequirementType: "english",
      yesNoWelshLanguage: true,
      subJourney: false,
    });
    await C100SubmitAndPay.c100SubmitAndPay({
      page: page,
      yesNoWelshLanguage: true,
      yesNoHelpWithFees: false, // Help with Fees is not yet available in Family Private Law digital service.
      accessibilityTest: true,
    });
    console.log(await Helpers.getCaseNumberFromUrl(page));
  });
});
