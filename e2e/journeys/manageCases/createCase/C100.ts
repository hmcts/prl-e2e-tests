import {
  ApplicantGender,
  otherProceedingsRadios,
  UserRole,
} from "../../../common/types.ts";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial.ts";
import { C100HearingUrgency } from "./C100HearingUrgency/C100HearingUrgency.ts";
import { C100ApplicantDetails } from "./C100ApplicantDetails/c100ApplicantDetails.ts";
import { typeOfChildArrangementOrderID } from "../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Page.ts";
import { radioButtons } from "../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType3Page.ts";
import { C100TypeOfApplication } from "./C100TypeOfApplication/C100TypeOfAplication.ts";
import { C100RespondentDetails } from "./C100RespondentDetails/C100RespondentDetails.ts";
import {
  C100RespondentAddress5Years,
  C100RespondentGender,
  C100RespondentLegalRepresentation,
} from "../../../pages/manageCases/createCase/C100/respondentDetails/respondentDetails1Page.ts";
import { C100OtherPeopleInTheCase } from "./C100OtherPeopleInTheCase/C100OtherPeopleInTheCase.ts";
import { C100ChildDetails } from "./C100ChildDetails/c100ChildDetails.ts";
import { C100ChildGender } from "../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised1Page.ts";
import { yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions } from "../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised2Page.ts";
import { C100OtherChildrenNotInTheCase } from "./C100OtherChildrenNotInTheCase/C100OtherChildrenNotInTheCase.ts";
import { C100OtherChildGender } from "../../../pages/manageCases/createCase/C100/otherChildrenNotInTheCase/otherChildNotInTheCase1Page.ts";
import { C100ChildrenAndOtherPeople } from "./C100ChildrenAndOtherPeople/c100ChildrenAndOtherPeople.ts";
import { C100ChildrenAndApplicantsRelationship } from "../../../pages/manageCases/createCase/C100/childrenAndApplicants/childrenAndApplicants1Page.ts";
import { C100ChildrenAndApplicants } from "./C100ChildrenAndApplicants/C100ChildrenAndApplicants.ts";
import { C100ChildAndRespondents } from "./C100ChildrenAndRespondents/c100ChildrenAndRespondents.ts";
import { C100AllegationsOfHarmTypeOfDomesticAbuse } from "../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised3Page.ts";
import { C100AllegationsOfHarm } from "./C100AllegationsOfHarm/c100AllegationsOfHarm.ts";
import { C100InternationalElement } from "./C100InternationalElement/C100InternationalElement.ts";
import { C100AttendingTheHearing } from "./C100AttendingTheHearing/c100AttendingTheHearing.ts";
import { C100MiamPolicyUpgrade } from "./C100MiamPolicyUpgrade/C100MiamPolicyUpgrade.ts";
import { C100MiamPolicyUpgrade1PageType } from "../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade1Page.ts";
import { miamSelection } from "../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade6Page.ts";
import { C100LitigationCapacity } from "./C100LitigationCapacity/C100LitigationCapacity.ts";
import { C100OtherProceedings } from "./C100OtherProceedings/C100OtherProceedings.ts";
import { C100WelshLanguageRequirements } from "./C100welshLanguageRequirements/C100welshLanguageRequirements.ts";
import { WelshPageRequirementType } from "../../../pages/manageCases/createCase/C100/welshLanguageRequirements/welshLanguageRequirements1Page.ts";
import { C100ViewPDFApplication } from "./C100ViewPDFApplication/c100ViewPDFApplication.ts";
import { C100SubmitAndPay } from "./C100SubmitAndPay/C100SubmitAndPay.ts";

interface c100Options {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoHearingUrgency: boolean;
  yesNoApplicantDetails: boolean;
  applicantGender: ApplicantGender;
  yesNoC100TypeOfApplication: boolean;
  typeOfChildArrangementOrder: typeOfChildArrangementOrderID;
  selectionC100TypeOfApplication: radioButtons;
  yesNoRespondentDetails: boolean;
  respondentGender: C100RespondentGender;
  respondentAddress5Years: C100RespondentAddress5Years;
  respondentLegalRepresentation: C100RespondentLegalRepresentation;
  c100ChildGender: C100ChildGender;
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions;
  yesNoOtherPeopleInTheCase: boolean;
  otherPersonLivesInRefuge: boolean;
  otherChildPresent: boolean;
  otherChildGender: C100OtherChildGender;
  otherChildDOBKnown: boolean;
  yesNoChildrenAndRespondents: boolean;
  yesNoChildrenAndOtherPeople: boolean;
  applicantChildRelationship: C100ChildrenAndApplicantsRelationship;
  childLiveWithApplicant: boolean;
  c100OtherProceedings: otherProceedingsRadios;
  c100OngoingProceedingsAndDocX?: boolean;
  c100AttendingTheHearingYesNo: boolean;
  C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType;
  yesNoMiamPolicyUpgrade: boolean;
  miamSelection: miamSelection;
  yesNoInternationalElement: boolean;
  yesNoLitigationCapacity: boolean;
  WelshPageRequirementType: WelshPageRequirementType;
  yesNoWelshLanguage: boolean;
  c100YesNoAllegationsOfHarm: boolean;
  c100DomesticAbuseTypePage3: C100AllegationsOfHarmTypeOfDomesticAbuse;
  c100YesNoToAll: boolean;
  yesNoHelpWithFees: boolean;
}

export class C100 {
  public static async c100({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    yesNoHearingUrgency,
    yesNoApplicantDetails,
    applicantGender,
    yesNoOtherPeopleInTheCase,
    otherPersonLivesInRefuge,
    yesNoC100TypeOfApplication,
    typeOfChildArrangementOrder,
    selectionC100TypeOfApplication,
    yesNoRespondentDetails,
    respondentGender,
    respondentAddress5Years,
    respondentLegalRepresentation,
    c100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    otherChildPresent,
    otherChildGender,
    otherChildDOBKnown,
    applicantChildRelationship,
    childLiveWithApplicant,
    yesNoChildrenAndRespondents,
    c100AttendingTheHearingYesNo,
    yesNoChildrenAndOtherPeople,
    C100MiamPolicyUpgrade1PageType,
    yesNoMiamPolicyUpgrade,
    miamSelection,
    yesNoInternationalElement,
    yesNoLitigationCapacity,
    c100OtherProceedings,
    c100OngoingProceedingsAndDocX,
    WelshPageRequirementType,
    yesNoWelshLanguage,
    c100YesNoAllegationsOfHarm,
    c100DomesticAbuseTypePage3,
    c100YesNoToAll,
    yesNoHelpWithFees,
  }: c100Options): Promise<void> {
    await SolicitorCreateInitial.createInitialCase({
      page: page,
      user: user,
      accessibilityTest: false,
      solicitorCaseType: "C100",
      errorMessaging: false,
    });
    await C100TypeOfApplication.c100TypeOfApplication({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoC100TypeOfApplication: yesNoC100TypeOfApplication,
      typeOfChildArrangementOrder: typeOfChildArrangementOrder,
      selectionC100TypeOfApplication: selectionC100TypeOfApplication,
      subJourney: false,
    });
    await C100HearingUrgency.c100HearingUrgency({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoHearingUrgency: yesNoHearingUrgency,
      subJourney: false,
    });
    await C100ApplicantDetails.C100ApplicantDetails({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoApplicantDetails: yesNoApplicantDetails,
      applicantGender: applicantGender,
      subJourney: false,
    });
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      yesNoRespondentDetailsC100: yesNoRespondentDetails,
      respondentGender: respondentGender,
      respondentAddress5Years: respondentAddress5Years,
      respondentLegalRepresentation: respondentLegalRepresentation,
      subJourney: false,
    });
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoOtherPeopleInTheCase: yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge: otherPersonLivesInRefuge,
      applicantGender: applicantGender,
      subJourney: false,
    });
    await C100ChildDetails.c100ChildDetails({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
      subJourney: false,
    });
    await C100OtherChildrenNotInTheCase.c100OtherChildrenNotInTheCase({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      otherChildPresent: otherChildPresent,
      otherChildGender: otherChildGender,
      otherChildDOBKnown: otherChildDOBKnown,
      subJourney: false,
    });
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      applicantChildRelationship: applicantChildRelationship,
      childLiveWithApplicant: childLiveWithApplicant,
      subJourney: false,
    });
    await C100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoRespondentDetails: yesNoRespondentDetails,
      respondentGender: respondentGender,
      respondentAddress5Years: respondentAddress5Years,
      respondentLegalRepresentation: respondentLegalRepresentation,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
      yesNoChildrenAndRespondents: yesNoChildrenAndRespondents,
      subJourney: false,
    });
    await C100ChildrenAndOtherPeople.c100ChildrenAndOtherPeople({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
      yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge: otherPersonLivesInRefuge,
      applicantGender: applicantGender,
      yesNoChildrenAndOtherPeople: yesNoChildrenAndOtherPeople,
      subJourney: false,
    });
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
      subJourney: false,
      c100DomesticAbuseTypePage3: c100DomesticAbuseTypePage3,
    });
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
      yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
      miamSelection: miamSelection,
      subJourney: false,
    });
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100OtherProceedings: c100OtherProceedings,
      c100OngoingProceedingsAndDocX: c100OngoingProceedingsAndDocX,
      subJourney: false,
    });
    await C100AttendingTheHearing.c100AttendingTheHearing({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100AttendingTheHearingYesNo: c100AttendingTheHearingYesNo,
      subJourney: false,
    });
    await C100InternationalElement.c100InternationalElement({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      yesNoInternationalElement: yesNoInternationalElement,
      subJourney: false,
    });
    await C100LitigationCapacity.c100LitigationCapacity({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      yesNoLitigationCapacity: yesNoLitigationCapacity,
      subJourney: false,
    });
    await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      WelshPageRequirementType: WelshPageRequirementType,
      yesNoWelshLanguage: yesNoWelshLanguage,
      subJourney: false,
    });
    await C100ViewPDFApplication.c100ViewPDFApplication({
      page: page,
      accessibilityTest: accessibilityTest,
      c100YesNoToAll: c100YesNoToAll,
    });
    await C100SubmitAndPay.c100SubmitAndPay({
      page: page,
      yesNoWelshLanguage: yesNoWelshLanguage,
      yesNoHelpWithFees: yesNoHelpWithFees,
      accessibilityTest: accessibilityTest,
    });
  }

  public static async c100CreateCaseMandatorySections({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    yesNoHearingUrgency,
    yesNoApplicantDetails,
    applicantGender,
    yesNoOtherPeopleInTheCase,
    otherPersonLivesInRefuge,
    yesNoC100TypeOfApplication,
    typeOfChildArrangementOrder,
    selectionC100TypeOfApplication,
    yesNoRespondentDetails,
    respondentGender,
    respondentAddress5Years,
    respondentLegalRepresentation,
    c100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    otherChildPresent,
    otherChildGender,
    otherChildDOBKnown,
    applicantChildRelationship,
    childLiveWithApplicant,
    yesNoChildrenAndRespondents,
    yesNoChildrenAndOtherPeople,
    yesNoWelshLanguage,
    c100YesNoAllegationsOfHarm,
    c100DomesticAbuseTypePage3,
    yesNoHelpWithFees,
    C100MiamPolicyUpgrade1PageType,
    yesNoMiamPolicyUpgrade,
    miamSelection,
  }: c100Options): Promise<void> {
    await SolicitorCreateInitial.createInitialCase({
      page: page,
      user: user,
      accessibilityTest: false,
      solicitorCaseType: "C100",
      errorMessaging: false,
    });
    await C100TypeOfApplication.c100TypeOfApplication({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoC100TypeOfApplication: yesNoC100TypeOfApplication,
      typeOfChildArrangementOrder: typeOfChildArrangementOrder,
      selectionC100TypeOfApplication: selectionC100TypeOfApplication,
      subJourney: false,
    });
    await C100HearingUrgency.c100HearingUrgency({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoHearingUrgency: yesNoHearingUrgency,
      subJourney: false,
    });
    await C100ApplicantDetails.C100ApplicantDetails({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoApplicantDetails: yesNoApplicantDetails,
      applicantGender: applicantGender,
      subJourney: false,
    });
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      yesNoRespondentDetailsC100: yesNoRespondentDetails,
      respondentGender: respondentGender,
      respondentAddress5Years: respondentAddress5Years,
      respondentLegalRepresentation: respondentLegalRepresentation,
      subJourney: false,
    });
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoOtherPeopleInTheCase: yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge: otherPersonLivesInRefuge,
      applicantGender: applicantGender,
      subJourney: false,
    });
    await C100ChildDetails.c100ChildDetails({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
      subJourney: false,
    });
    await C100OtherChildrenNotInTheCase.c100OtherChildrenNotInTheCase({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      otherChildPresent: otherChildPresent,
      otherChildGender: otherChildGender,
      otherChildDOBKnown: otherChildDOBKnown,
      subJourney: false,
    });
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      applicantChildRelationship: applicantChildRelationship,
      childLiveWithApplicant: childLiveWithApplicant,
      subJourney: false,
    });
    await C100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoRespondentDetails: yesNoRespondentDetails,
      respondentGender: respondentGender,
      respondentAddress5Years: respondentAddress5Years,
      respondentLegalRepresentation: respondentLegalRepresentation,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
      yesNoChildrenAndRespondents: yesNoChildrenAndRespondents,
      subJourney: false,
    });
    await C100ChildrenAndOtherPeople.c100ChildrenAndOtherPeople({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
      yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge: otherPersonLivesInRefuge,
      applicantGender: applicantGender,
      yesNoChildrenAndOtherPeople: yesNoChildrenAndOtherPeople,
      subJourney: false,
    });
    await C100AllegationsOfHarm.c100AllegationsOfHarm({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
      subJourney: false,
      c100DomesticAbuseTypePage3: c100DomesticAbuseTypePage3,
    });
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
      yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
      miamSelection: miamSelection,
      subJourney: false,
    });
    // pay doesn't work in preview, so skip payment pages
    if (!(process.env.MANAGE_CASES_TEST_ENV == "preview")) {
      await C100SubmitAndPay.c100SubmitAndPay({
        page: page,
        yesNoWelshLanguage: yesNoWelshLanguage,
        yesNoHelpWithFees: yesNoHelpWithFees,
        accessibilityTest: accessibilityTest,
      });
    }
  }
}
