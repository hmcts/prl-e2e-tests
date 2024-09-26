import { ApplicantGender, UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { FL401TypeOfApplication } from "./FL401TypeOfApplication/FL401TypeOfApplication";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { FL401RespondentDetails } from "./FL401RespondentDetails/FL401RespondentDetails";
import { FL401WithoutNoticeOrder } from "./FL401WithoutNoticeOrder/FL401WIthoutNoticeOrder";
import { FL401ApplicantDetails } from "./FL401ApplicantDetails/FL401ApplicantDetails";
import { FL401ApplicantsFamily } from "./FL401ApplicantsFamily/FL401ApplicantsFamily";
import { FL401OtherProceedings } from "./FL401OtherProceedings/FL401OtherProceedings";
import { FL401RespondentsBehaviour } from "./FL401RespondentsBehaviour/FL401RespondentsBehaviour";
import { FL401RelationshipToRespondent } from "./FL401RelationshipToRespondent/FL401RelationshipToRespondent";
import { fl401RelationshipToRespondent } from "../../../pages/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondent1Page";
import { fl401RespondentRelationshipOther } from "../../../pages/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondent2Page";
import { bailConditionRadios } from "../../../pages/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrder3Page";
import { Fl401AttendingTheHearing } from "./FL401AttendingTheHearing/fl401AttendingTheHearing";
import { FL401TheHome } from "./FL401TheHome/fl401TheHome";
import { addressRadios } from "../../../pages/manageCases/createCase/FL401/theHome/fl401TheHome1Page";
import { Fl401StatementOfTruth } from "./FL401StatementOfTruth/fl401StatementOfTruth";

export type otherProceedingsRadios = "Yes" | "No" | "Don't know";

interface fl401Options {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  isLinkedToC100: boolean;
  respondentDetailsAllOptionsYes: boolean;
  applicantHasChildren: boolean;
  yesNoFL401ApplicantDetails: boolean;
  applicantGender: ApplicantGender;
  respondentsBehaviourAllOptionsYes: boolean;
  isWithoutNoticeDetailsYes: boolean;
  isWithoutNoticeDetailsBailConditions: bailConditionRadios;
  otherProceedingsRadios: otherProceedingsRadios;
  relationshipToRespondent: fl401RelationshipToRespondent;
  relationshipToRespondentOther?: fl401RespondentRelationshipOther;
  fl401AttendingTheHearingYesNo: boolean;
  fl401TheHomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
}

export class FL401 {
  public static async fl401({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    isLinkedToC100,
    respondentDetailsAllOptionsYes,
    applicantHasChildren,
    yesNoFL401ApplicantDetails,
    applicantGender,
    respondentsBehaviourAllOptionsYes,
    isWithoutNoticeDetailsYes,
    isWithoutNoticeDetailsBailConditions,
    otherProceedingsRadios,
    relationshipToRespondent,
    relationshipToRespondentOther,
    fl401AttendingTheHearingYesNo,
    fl401TheHomeYesNo,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress,
  }: fl401Options): Promise<void> {
    await SolicitorCreateInitial.createInitialCase({
      page: page,
      user: user,
      accessibilityTest: false,
      solicitorCaseType: "FL401",
      errorMessaging: false,
    });
    await FL401TypeOfApplication.fl401TypeOfApplication({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      isLinkedToC100: isLinkedToC100,
      subJourney: false,
    });
    await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      isWithoutNoticeDetailsYes: isWithoutNoticeDetailsYes,
      isWithoutNoticeDetailsBailConditions:
        isWithoutNoticeDetailsBailConditions,
      subJourney: false,
    });
    await FL401ApplicantDetails.fl401ApplicantDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoFL401ApplicantDetails: yesNoFL401ApplicantDetails,
      applicantGender: applicantGender,
      subJourney: false,
    });
    await FL401RespondentDetails.fl401RespondentDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      respondentDetailsAllOptionsYes: respondentDetailsAllOptionsYes,
      subJourney: false,
    });
    await FL401ApplicantsFamily.fl401ApplicantsFamily({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      applicantHasChildren: applicantHasChildren,
      subJourney: false,
    });
    await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      relationshipToRespondent: relationshipToRespondent,
      relationshipToRespondentOther: relationshipToRespondentOther,
      subJourney: false,
    });
    await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      respondentsBehaviourAllOptionsYes: respondentsBehaviourAllOptionsYes,
      subJourney: false,
    });
    await FL401OtherProceedings.fl401OtherProceedings({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      otherProceedingsRadios: otherProceedingsRadios,
      subJourney: false,
    });
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: accessibilityTest,
      applicantHasChildren: applicantHasChildren,
      fl401TheHomeYesNo: fl401TheHomeYesNo,
      fl401EverLivedAtAddress: fl401EverLivedAtAddress,
      fl401IntendToLiveAtAddress: fl401IntendToLiveAtAddress,
      subJourney: false,
    });
    await Fl401AttendingTheHearing.fl401AttendingTheHearing({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      fl401AttendingTheHearingYesNo: fl401AttendingTheHearingYesNo,
      subJourney: false,
    });
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      subJourney: false
    });
  }
}
