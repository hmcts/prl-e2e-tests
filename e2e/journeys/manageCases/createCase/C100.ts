import {
  ApplicantGender,
  otherProceedingsRadios,
  UserRole,
} from "../../../common/types";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { C100HearingUrgency } from "./C100HearingUrgency/C100HearingUrgency";
import { C100ApplicantDetails } from "./C100ApplicantDetails/c100ApplicantDetails";
import { typeOfChildArrangementOrderID } from "../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Page";
import { radioButtons } from "../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType3Page";
import { C100TypeOfApplication } from "./C100TypeOfApplication/C100TypeOfAplication";
import { C100RespondentDetails } from "./C100RespondentDetails/C100RespondentDetails";
import {
  C100RespondentAddress5Years,
  C100RespondentGender,
  C100RespondentLegalRepresentation,
} from "../../../pages/manageCases/createCase/C100/respondentDetails/respondentDetails1Page";
import { C100OtherPeopleInTheCase } from "./C100OtherPeopleInTheCase/C100OtherPeopleInTheCase";
import { C100ChildDetails } from "./C100ChildDetails/c100ChildDetails";
import { C100ChildGender } from "../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised1Page";
import { yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions } from "../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised2Page";
import { C100OtherChildrenNotInTheCase } from "./C100OtherChildrenNotInTheCase/C100OtherChildrenNotInTheCase";
import { C100OtherChildGender } from "../../../pages/manageCases/createCase/C100/otherChildrenNotInTheCase/otherChildNotInTheCase1Page";
import { C100ChildrenAndOtherPeople } from "./C100ChildrenAndOtherPeople/c100ChildrenAndOtherPeople";
import { C100ChildrenAndApplicantsRelationship } from "../../../pages/manageCases/createCase/C100/childrenAndApplicants/childrenAndApplicants1Page";
import { C100ChildrenAndApplicants } from "./C100ChildrenAndApplicants/C100ChildrenAndApplicants";
import { C100ChildAndRespondents } from "./C100ChildrenAndRespondents/c100ChildrenAndRespondents";
import { C100AllegationsOfHarmTypeOfDomesticAbuse } from "../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised3Page";
import { C100AllegationsOfHarm } from "./C100AllegationsOfHarm/c100AllegationsOfHarm";
import { C100InternationalElement } from "./C100InternationalElement/C100InternationalElement";
import { C100AttendingTheHearing } from "./C100AttendingTheHearing/c100AttendingTheHearing";
import { C100MiamPolicyUpgrade } from "./C100MiamPolicyUpgrade/C100MiamPolicyUpgrade";
import { C100MiamPolicyUpgrade1PageType } from "../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade1Page";
import { miamSelection } from "../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade6Page";
import { C100LitigationCapacity } from "./C100LitigationCapacity/C100LitigationCapacity";
import { C100OtherProceedings } from "./C100OtherProceedings/C100OtherProceedings";
import { C100WelshLanguageRequirements } from "./C100welshLanguageRequirements/C100welshLanguageRequirements";
import { WelshPageRequirementType } from "../../../pages/manageCases/createCase/C100/welshLanguageRequirements/welshLanguageRequirements1Page";
import { C100ViewPDFApplication } from "./C100ViewPDFApplication/c100ViewPDFApplication";
import { C100SubmitAndPay } from "./C100SubmitAndPay/C100SubmitAndPay";

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
    await C100TypeOfApplication.c100TypeOfApplication({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoC100TypeOfApplication: yesNoC100TypeOfApplication,
      typeOfChildArrangementOrder: typeOfChildArrangementOrder,
      selectionC100TypeOfApplication: selectionC100TypeOfApplication,
    });
    await C100HearingUrgency.c100HearingUrgency({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoHearingUrgency: yesNoHearingUrgency,
    });
    await C100ApplicantDetails.C100ApplicantDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoApplicantDetails: yesNoApplicantDetails,
      applicantGender: applicantGender,
    });
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoRespondentDetailsC100: yesNoRespondentDetails,
      respondentGender: respondentGender,
      respondentAddress5Years: respondentAddress5Years,
      respondentLegalRepresentation: respondentLegalRepresentation,
    });
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoOtherPeopleInTheCase: yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge: otherPersonLivesInRefuge,
      applicantGender: applicantGender,
    });
    await C100ChildDetails.c100ChildDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    });
    await C100OtherChildrenNotInTheCase.c100OtherChildrenNotInTheCase({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      otherChildPresent: otherChildPresent,
      otherChildGender: otherChildGender,
      otherChildDOBKnown: otherChildDOBKnown,
    });
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      applicantChildRelationship: applicantChildRelationship,
      childLiveWithApplicant: childLiveWithApplicant,
    });
    await C100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoChildrenAndRespondents: yesNoChildrenAndRespondents,
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
      c100DomesticAbuseTypePage3: c100DomesticAbuseTypePage3,
    });
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
      yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
      miamSelection: miamSelection,
    });
    await C100OtherProceedings.c100OtherProceedings({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100OtherProceedings: c100OtherProceedings,
      c100OngoingProceedingsAndDocX: c100OngoingProceedingsAndDocX,
    });
    await C100AttendingTheHearing.c100AttendingTheHearing({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100AttendingTheHearingYesNo: c100AttendingTheHearingYesNo,
    });
    await C100InternationalElement.c100InternationalElement({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoInternationalElement: yesNoInternationalElement,
    });
    await C100LitigationCapacity.c100LitigationCapacity({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoLitigationCapacity: yesNoLitigationCapacity,
    });
    await C100WelshLanguageRequirements.c100WelshLanguageRequirements({
      page: page,
      accessibilityTest: accessibilityTest,
      WelshPageRequirementType: WelshPageRequirementType,
      yesNoWelshLanguage: yesNoWelshLanguage,
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
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoC100TypeOfApplication: yesNoC100TypeOfApplication,
      typeOfChildArrangementOrder: typeOfChildArrangementOrder,
      selectionC100TypeOfApplication: selectionC100TypeOfApplication,
    });
    await C100HearingUrgency.c100HearingUrgency({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoHearingUrgency: yesNoHearingUrgency,
    });
    await C100ApplicantDetails.C100ApplicantDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoApplicantDetails: yesNoApplicantDetails,
      applicantGender: applicantGender,
    });
    await C100RespondentDetails.c100RespondentDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoRespondentDetailsC100: yesNoRespondentDetails,
      respondentGender: respondentGender,
      respondentAddress5Years: respondentAddress5Years,
      respondentLegalRepresentation: respondentLegalRepresentation,
    });
    await C100OtherPeopleInTheCase.c100OtherPeopleInTheCase({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoOtherPeopleInTheCase: yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge: otherPersonLivesInRefuge,
      applicantGender: applicantGender,
    });
    await C100ChildDetails.c100ChildDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    });
    await C100OtherChildrenNotInTheCase.c100OtherChildrenNotInTheCase({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      otherChildPresent: otherChildPresent,
      otherChildGender: otherChildGender,
      otherChildDOBKnown: otherChildDOBKnown,
    });
    await C100ChildrenAndApplicants.c100ChildrenAndApplicants({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      applicantChildRelationship: applicantChildRelationship,
      childLiveWithApplicant: childLiveWithApplicant,
    });
    await C100ChildAndRespondents.c100ChildrenAndRespondents({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoChildrenAndRespondents: yesNoChildrenAndRespondents,
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
      c100DomesticAbuseTypePage3: c100DomesticAbuseTypePage3,
    });
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
      yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
      miamSelection: miamSelection,
    });
    // pay doesn't work in preview, so skip payment pages
    if (!(process.env.MANAGE_CASES_TEST_ENV == "preview")) {
      await C100SubmitAndPay.c100SubmitAndPay({
        page: page,
        yesNoWelshLanguage: yesNoWelshLanguage,
        yesNoHelpWithFees: yesNoHelpWithFees,
      });
    }
  }
}
