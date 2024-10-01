import { ApplicantGender, UserRole } from "../../../common/types";
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
import { C100InternationalElement } from "./C100InternationalElement/C100InternationalElement";

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
  otherChildPresent: boolean;
  otherChildGender: C100OtherChildGender;
  otherChildDOBKnown: boolean;
  yesNoChildrenAndRespondents: boolean;
  yesNoChildrenAndOtherPeople: boolean;
  applicantChildRelationship: C100ChildrenAndApplicantsRelationship;
  childLiveWithApplicant: boolean;
  yesNoInternationalElement: boolean;
}

export class C100 {
  public static async c100({
    page: page,
    user: user,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoHearingUrgency: yesNoHearingUrgency,
    yesNoApplicantDetails: yesNoApplicantDetails,
    applicantGender: applicantGender,
    yesNoOtherPeopleInTheCase: yesNoOtherPeopleInTheCase,
    yesNoC100TypeOfApplication: yesNoC100TypeOfApplication,
    typeOfChildArrangementOrder: typeOfChildArrangementOrder,
    selectionC100TypeOfApplication: selectionC100TypeOfApplication,
    yesNoRespondentDetails: yesNoRespondentDetails,
    respondentGender: respondentGender,
    respondentAddress5Years: respondentAddress5Years,
    respondentLegalRepresentation: respondentLegalRepresentation,
    c100ChildGender: C100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    otherChildPresent: otherChildPresent,
    otherChildGender: otherChildGender,
    otherChildDOBKnown: otherChildDOBKnown,
    applicantChildRelationship: applicantChildRelationship,
    childLiveWithApplicant: childLiveWithApplicant,
    yesNoChildrenAndRespondents: yesNoChildrenAndRespondents,
    yesNoChildrenAndOtherPeople: yesNoChildrenAndOtherPeople,
    yesNoInternationalElement: yesNoInternationalElement,
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
      applicantGender: applicantGender,
      subJourney: false,
    });
    await C100ChildDetails.c100ChildDetails({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      c100ChildGender: C100ChildGender,
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
      c100ChildGender: C100ChildGender,
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
      c100ChildGender: C100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
      yesNoOtherPeopleInTheCase,
      applicantGender: applicantGender,
      yesNoChildrenAndOtherPeople: yesNoChildrenAndOtherPeople,
      subJourney: false,
    });
    await C100InternationalElement.c100InternationalElement({
      page: page,
      user: user,
      accessibilityTest: accessibilityTest,
      yesNoInternationalElement: yesNoInternationalElement,
      subJourney: false,
    });
  }
}
