import { Page } from "@playwright/test";
import { C100ScreeningSections } from "./subJourneys/c100ScreeningSections";
import { CitizenCreateInitial } from "../../citizenCreateInitial";
import { C100TypeOfOrder } from "./subJourneys/C100TypeOfOrder";
import { C100ConsentOrderUpload } from "./subJourneys/C100ConsentOrderUpload";
import { C100UrgencyAndWithoutNotice } from "./subJourneys/C100UrgencyAndWithoutNotice";
import { C100People } from "./subJourneys/C100People1";
import { MIAM } from "./subJourneys/MIAM";
import { MiamChildProtectionConcernsType } from "../../../../pages/citizen/createCase/C100/MIAM/miamChildProtectionPage";
import { MiamUrgencyType } from "../../../../pages/citizen/createCase/C100/MIAM/miamUrgencyPage";
import { MiamAttendanceType } from "../../../../pages/citizen/createCase/C100/MIAM/miamPreviousAttendancePage";
import { MiamOtherReasonForNotAttending } from "../../../../pages/citizen/createCase/C100/MIAM/miamMiamOtherPage";
import { MiamReasonForNoAccessToMediator } from "../../../../pages/citizen/createCase/C100/MIAM/miamNoAccessToMediatorPage";
import { C100OtherProceedings } from "./subJourneys/C100OtherProceedings";
import { C100ApplicationCompletedForYou } from "./C100ApplicationCompletedForYou";
import {
  ApplicantGender, CapitalizedRelationship,
  Relationship,
  typeOfPerson,
  yesNoDontKnow
} from "../../../../common/types";
import { C100Confidentiality } from "./subJourneys/c100Confidentiality";
import { C100CasePartyDetails } from "./subJourneys/c100CasePartyDetails";
import { C100SafetyConcerns } from "./subJourneys/c100SafetyConcerns";
import { c100ChildrenSupervisionRadios } from "../../../../pages/citizen/createCase/C100/safetyConcerns/unsupervisedPage";
import { C100InternationalElements } from "./subJourneys/c100InternationalElements";
import { C100ReasonableAdjustments } from "./subJourneys/c100ReasonableAdjustments";
import { C100HelpWithFees } from "./subJourneys/c100HelpWithFees";
import { EqualityAndDiversityPage } from "../../../../pages/citizen/createCase/C100/confirmation/equalityAndDiversityQuestionsPage";
import { ConfirmationPage } from "../../../../pages/citizen/createCase/C100/confirmation/confirmationPage";
import {
  ReviewPage,
  reviewPageTopJourneyMotherFather,
} from "../../../../pages/citizen/createCase/C100/reviewPages/reviewPage";

interface C100ApplicationCompletedForYouOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface YouNeedDocumentSignedByMediatorOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface GetMediatorJourneyOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  miamAlreadyAttended: boolean;
  documentSignedByMediator: boolean;
  miamValidReasonNoAttendance: boolean;
  miamGeneralExemptions: boolean;
  miamDomesticAbuse: boolean;
  miamDomesticAbuseProvidingEvidence: boolean;
  miamChildProtectionConcernsType: MiamChildProtectionConcernsType;
  miamUrgencyType: MiamUrgencyType;
  miamAttendanceType: MiamAttendanceType;
  miamPreviousAttendanceMediatorSignedDocument: boolean;
  miamOtherReasonForNotAttending: MiamOtherReasonForNotAttending;
  miamReasonForNoAccessToMediator: MiamReasonForNoAccessToMediator;
}

interface C100TopMiroJourneyOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
  c100PeopleGender: ApplicantGender;
  c100PeopleYesNoDontKnow: yesNoDontKnow;
  c100OthersKnowApplicantsContact: yesNoDontKnow;
  c100PrivateDetails: boolean;
  applicantChangedName: boolean;
  applicantGender: ApplicantGender;
  applicantRelationship: Relationship;
  applicantAddressLookup: boolean;
  appAddressLookupSuccessful: boolean;
  applicantPrevAddress5Years: boolean;
  applicantEmailTelephoneVoicemail: boolean;
  applicantDigitalPreference: boolean;
  respondentKnownDoB: boolean;
  respondentKnownPlaceOfBirth: boolean;
  respondentGender: ApplicantGender;
  respondentChangedName: yesNoDontKnow;
  respAddress5Years: yesNoDontKnow;
  respondentRelationship: Relationship;
  respAddressLookup: boolean;
  respAddressLookupSuccessful: boolean;
  respKnownEmailAndPhone: boolean;
  yesNoOtherPersonDetails: boolean;
  c100OtherPeopleGender: ApplicantGender;
  c100OtherPeopleChangedName: yesNoDontKnow;
  c100OtherPeopleDoBKnown: boolean;
  c100OtherPersonRelationship: Relationship;
  c100ChildMainlyLivesWith: typeOfPerson;
  yesNoChildArrangementOrderDetails: boolean;
  yesNoOtherProceedings: boolean;
  c100ChildrenSafetyConcerns: boolean;
  c100SafetyConcernsYesNoToAll: boolean; // Applies to all booleans that don't affect the journey
  c100ChildrenHavePassport: boolean; // If yes -> passport amount
  c100MoreThanOnePassport: boolean;
  c100PassportOfficeNotified: boolean;
  c100ChildrenAbductedBefore: boolean; // if yes -> previous abductions page
  c100ChildrenSupervision: c100ChildrenSupervisionRadios;
  yesNoInternationalElements: boolean;
  yesNoReasonableAdjustments: boolean;
  c100YesNoNeedHelpWithFees: boolean;
  c100YesNoFeesApplied: boolean;
  reviewPageTopJourneyMotherFather: reviewPageTopJourneyMotherFather;
  relationshipType: CapitalizedRelationship;
}

interface C100SecondMiroJourneyOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
  yesNoOtherProceedings: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
  gender: ApplicantGender;
  c100PeopleYesNoDontKnow: yesNoDontKnow;
  c100OthersKnowApplicantsContact: yesNoDontKnow;
  c100PrivateDetails: boolean;
  applicantChangedName: boolean;
  applicantGender: ApplicantGender;
  applicantRelationship: Relationship;
  applicantAddressLookup: boolean;
  appAddressLookupSuccessful: boolean;
  applicantPrevAddress5Years: boolean;
  applicantEmailTelephoneVoicemail: boolean;
  applicantDigitalPreference: boolean;
  respondentKnownDoB: boolean;
  respondentKnownPlaceOfBirth: boolean;
  respondentGender: ApplicantGender;
  respondentChangedName: yesNoDontKnow;
  respAddress5Years: yesNoDontKnow;
  respondentRelationship: Relationship;
  respAddressLookup: boolean;
  respAddressLookupSuccessful: boolean;
  respKnownEmailAndPhone: boolean;
  yesNoOtherPersonDetails: boolean;
  c100OtherPeopleGender: ApplicantGender;
  c100OtherPeopleChangedName: yesNoDontKnow;
  c100OtherPeopleDoBKnown: boolean;
  c100OtherPersonRelationship: Relationship;
  c100ChildMainlyLivesWith: typeOfPerson;
  c100ChildrenSafetyConcerns: boolean;
  c100SafetyConcernsYesNoToAll: boolean; // Applies to all booleans that don't affect the journey
  c100ChildrenHavePassport: boolean; // If yes -> passport amount
  c100MoreThanOnePassport: boolean;
  c100PassportOfficeNotified: boolean;
  c100ChildrenAbductedBefore: boolean; // if yes -> previous abductions page
  c100ChildrenSupervision: c100ChildrenSupervisionRadios;
  yesNoInternationalElements: boolean;
  yesNoReasonableAdjustments: boolean;
  c100YesNoNeedHelpWithFees: boolean;
  c100YesNoFeesApplied: boolean;
  relationshipType: CapitalizedRelationship;
}

interface C100ThirdMiroJourneyMIAMOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
  miamAlreadyAttended: boolean;
  documentSignedByMediator: boolean;
  miamValidReasonNoAttendance: boolean;
  miamGeneralExemptions: boolean;
  miamDomesticAbuse: boolean;
  miamDomesticAbuseProvidingEvidence: boolean;
  miamChildProtectionConcernsType: MiamChildProtectionConcernsType;
  miamUrgencyType: MiamUrgencyType;
  miamAttendanceType: MiamAttendanceType;
  miamPreviousAttendanceMediatorSignedDocument: boolean;
  miamOtherReasonForNotAttending: MiamOtherReasonForNotAttending;
  miamReasonForNoAccessToMediator: MiamReasonForNoAccessToMediator;
}

interface C100FourthRowMiroJourneyOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
  miamAlreadyAttended: boolean;
  documentSignedByMediator: boolean;
  miamValidReasonNoAttendance: boolean;
  miamGeneralExemptions: boolean;
  miamDomesticAbuse: boolean;
  miamDomesticAbuseProvidingEvidence: boolean;
  miamChildProtectionConcernsType: MiamChildProtectionConcernsType;
  miamUrgencyType: MiamUrgencyType;
  miamAttendanceType: MiamAttendanceType;
  miamPreviousAttendanceMediatorSignedDocument: boolean;
  miamOtherReasonForNotAttending: MiamOtherReasonForNotAttending;
  miamReasonForNoAccessToMediator: MiamReasonForNoAccessToMediator;
}

export class C100 {
  public static async c100ApplicationCompletedForYou({
    page,
    accessibilityTest,
    errorMessaging,
  }: C100ApplicationCompletedForYouOptions): Promise<void> {
    await C100ApplicationCompletedForYou.c100ApplicationCompletedForYou({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
  }

  public static async getMediatorJourney({
    page,
    accessibilityTest,
    errorMessaging,
    miamAlreadyAttended,
    documentSignedByMediator,
    miamValidReasonNoAttendance,
    miamGeneralExemptions,
    miamDomesticAbuse,
    miamDomesticAbuseProvidingEvidence,
    miamChildProtectionConcernsType,
    miamUrgencyType,
    miamAttendanceType,
    miamPreviousAttendanceMediatorSignedDocument,
    miamOtherReasonForNotAttending,
    miamReasonForNoAccessToMediator,
  }: GetMediatorJourneyOptions): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: "C100",
    });
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: false, // Has to be false for this journey
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: true,
    });
    await MIAM.MIAM({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      miamChildrenInvolvedOtherProceedings: false,
      miamAlreadyAttended: miamAlreadyAttended,
      documentSignedByMediator: documentSignedByMediator,
      miamValidReasonNoAttendance: miamValidReasonNoAttendance,
      miamGeneralExemptions: miamGeneralExemptions,
      miamDomesticAbuse: miamDomesticAbuse,
      miamDomesticAbuseProvidingEvidence: miamDomesticAbuseProvidingEvidence,
      miamChildProtectionConcernsType: miamChildProtectionConcernsType,
      miamUrgencyType: miamUrgencyType,
      miamAttendanceType: miamAttendanceType,
      miamPreviousAttendanceMediatorSignedDocument:
        miamPreviousAttendanceMediatorSignedDocument,
      miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
      miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
    });
  }

  public static async youNeedASignedDocument({
    page,
    accessibilityTest,
    errorMessaging,
  }: YouNeedDocumentSignedByMediatorOptions): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: "C100",
    });
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: false, // Has to be false for this journey
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: true,
    });
    await MIAM.MIAM({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      miamChildrenInvolvedOtherProceedings: false,
      miamAlreadyAttended: true, // Has to be true
      documentSignedByMediator: false, // Has to be false
      miamValidReasonNoAttendance: false, // All the below are redundant
      miamGeneralExemptions: false,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  }

  public static async c100TopMiroJourney({
    page,
    accessibilityTest,
    errorMessaging,
    urgencyAndWithoutNoticeAllOptionsYes,
    c100PeopleGender,
    c100PeopleYesNoDontKnow,
    c100PrivateDetails,
    c100OthersKnowApplicantsContact,
    applicantChangedName,
    applicantGender,
    applicantRelationship,
    applicantAddressLookup,
    appAddressLookupSuccessful,
    applicantPrevAddress5Years,
    applicantEmailTelephoneVoicemail,
    applicantDigitalPreference,
    respondentKnownDoB,
    respondentKnownPlaceOfBirth,
    respondentChangedName,
    respondentGender,
    respAddress5Years,
    respondentRelationship,
    respAddressLookup,
    respAddressLookupSuccessful,
    respKnownEmailAndPhone,
    yesNoOtherPersonDetails,
    c100OtherPeopleGender,
    c100OtherPeopleChangedName,
    c100OtherPeopleDoBKnown,
    c100OtherPersonRelationship,
    c100ChildMainlyLivesWith,
                                           yesNoOtherProceedings,
    c100ChildrenSafetyConcerns,
    c100ChildrenAbductedBefore,
    c100ChildrenSupervision,
    c100ChildrenHavePassport,
    c100MoreThanOnePassport,
    c100PassportOfficeNotified,
    c100SafetyConcernsYesNoToAll,
    yesNoInternationalElements,
    yesNoReasonableAdjustments,
    c100YesNoNeedHelpWithFees,
    c100YesNoFeesApplied,
    reviewPageTopJourneyMotherFather,
                                           relationshipType
  }: C100TopMiroJourneyOptions): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: "C100",
    });
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: true, // This has to be true for the top row journey
      c100LegalRepresentation: false, // Below here are redundant because pages aren't reached
      c100CourtPermissionNeeded: false,
    });
    await C100TypeOfOrder.c100TypeOfOrder({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    await C100ConsentOrderUpload.c100ConsentOrderUpload({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    await C100UrgencyAndWithoutNotice.c100UrgencyAndWithoutNotice({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      urgencyAndWithoutNoticeAllOptionsYes:
        urgencyAndWithoutNoticeAllOptionsYes,
    });
    await C100People.c100People({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      gender: c100PeopleGender,
      c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
    });
    await C100Confidentiality.c100Confidentiality({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100PrivateDetails: c100PrivateDetails,
      c100OthersKnowApplicantsContact: c100OthersKnowApplicantsContact,
    });
    await C100CasePartyDetails.C100CasePartyDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      applicantChangedName: applicantChangedName,
      applicantGender: applicantGender,
      applicantRelationship: applicantRelationship,
      applicantAddressLookup: applicantAddressLookup,
      appAddressLookupSuccessful: appAddressLookupSuccessful,
      applicantPrevAddress5Years: applicantPrevAddress5Years,
      applicantEmailTelephoneVoicemail: applicantEmailTelephoneVoicemail,
      applicantDigitalPreference: applicantDigitalPreference,
      respondentKnownDoB: respondentKnownDoB,
      respondentKnownPlaceOfBirth: respondentKnownPlaceOfBirth,
      respondentGender: respondentGender,
      respondentChangedName: respondentChangedName,
      respAddress5Years: respAddress5Years,
      respondentRelationship: respondentRelationship,
      respAddressLookup: respAddressLookup,
      respAddressLookupSuccessful: respAddressLookupSuccessful,
      respKnownEmailAndPhone: respKnownEmailAndPhone,
      yesNoOtherPersonDetails: yesNoOtherPersonDetails,
      c100OtherPeopleGender: c100OtherPeopleGender,
      c100OtherPeopleChangedName: c100OtherPeopleChangedName,
      c100OtherPeopleDoBKnown: c100OtherPeopleDoBKnown,
      c100OtherPersonRelationship: c100OtherPersonRelationship,
      c100ChildMainlyLivesWith: c100ChildMainlyLivesWith,
    });
    await C100OtherProceedings.c100OtherProceedings1({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoOtherProceedings: yesNoOtherProceedings,
    });
    await C100SafetyConcerns.c100SafetyConcerns({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ChildrenSafetyConcerns: c100ChildrenSafetyConcerns,
      c100SafetyConcernsYesNoToAll: c100SafetyConcernsYesNoToAll,
      c100ChildrenAbductedBefore: c100ChildrenAbductedBefore,
      c100ChildrenSupervision: c100ChildrenSupervision,
      c100ChildrenHavePassport: c100ChildrenHavePassport,
      c100PassportOfficeNotified: c100PassportOfficeNotified,
      c100MoreThanOnePassport: c100MoreThanOnePassport,
    });
    await C100InternationalElements.c100InternationalElements({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoInternationalElements: yesNoInternationalElements,
    });
    await C100ReasonableAdjustments.c100ReasonableAdjustments({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoReasonableAdjustments: yesNoReasonableAdjustments,
    });
    await C100HelpWithFees.c100HelpWithFees({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100YesNoFeesApplied: c100YesNoFeesApplied,
      c100YesNoNeedHelpWithFees: c100YesNoNeedHelpWithFees,
    });
    await ReviewPage.submitTopMiro({
      page: page,
      accessibilityTest: accessibilityTest,
      reviewPageTopJourneyMotherFather: reviewPageTopJourneyMotherFather,
      relationshipType: relationshipType
    });
  }

  public static async c100SecondMiroJourney({
    page,
    accessibilityTest,
    errorMessaging,
    c100LegalRepresentation,
    c100CourtPermissionNeeded,
    yesNoOtherProceedings,
    urgencyAndWithoutNoticeAllOptionsYes,
    gender,
    c100PeopleYesNoDontKnow,
    c100PrivateDetails,
    c100OthersKnowApplicantsContact,
    applicantChangedName,
    applicantGender,
    applicantRelationship,
    applicantAddressLookup,
    appAddressLookupSuccessful,
    applicantPrevAddress5Years,
    applicantEmailTelephoneVoicemail,
    applicantDigitalPreference,
    respondentKnownDoB,
    respondentKnownPlaceOfBirth,
    respondentChangedName,
    respondentGender,
    respAddress5Years,
    respondentRelationship,
    respAddressLookup,
    respAddressLookupSuccessful,
    respKnownEmailAndPhone,
    yesNoOtherPersonDetails,
    c100OtherPeopleGender,
    c100OtherPeopleChangedName,
    c100OtherPeopleDoBKnown,
    c100OtherPersonRelationship,
    c100ChildMainlyLivesWith,
    c100ChildrenSafetyConcerns,
    c100SafetyConcernsYesNoToAll,
    c100ChildrenHavePassport,
    c100MoreThanOnePassport,
    c100PassportOfficeNotified,
    c100ChildrenAbductedBefore,
    c100ChildrenSupervision,
    yesNoInternationalElements,
    yesNoReasonableAdjustments,
    c100YesNoNeedHelpWithFees,
    c100YesNoFeesApplied,
    relationshipType,
  }: C100SecondMiroJourneyOptions): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: "C100",
    });
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: false, // Has to be false for this journey
      c100LegalRepresentation: c100LegalRepresentation,
      c100CourtPermissionNeeded: c100CourtPermissionNeeded,
    });
    await MIAM.MIAM({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      miamChildrenInvolvedOtherProceedings: true, // This has to be false for this journey
      miamAlreadyAttended: false, // Any of the below args are redundant
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: false,
      miamGeneralExemptions: false,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
    await C100OtherProceedings.c100OtherProceedings1({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoOtherProceedings: yesNoOtherProceedings,
    });
    await C100TypeOfOrder.c100TypeOfOrder({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    await C100UrgencyAndWithoutNotice.c100UrgencyAndWithoutNotice({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      urgencyAndWithoutNoticeAllOptionsYes:
        urgencyAndWithoutNoticeAllOptionsYes,
    });
    await C100People.c100People({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      gender: gender,
      c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
    });
    await C100Confidentiality.c100Confidentiality({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100PrivateDetails: c100PrivateDetails,
      c100OthersKnowApplicantsContact: c100OthersKnowApplicantsContact,
    });
    await C100CasePartyDetails.C100CasePartyDetails({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      applicantChangedName: applicantChangedName,
      applicantGender: applicantGender,
      applicantRelationship: applicantRelationship,
      applicantAddressLookup: applicantAddressLookup,
      appAddressLookupSuccessful: appAddressLookupSuccessful,
      applicantPrevAddress5Years: applicantPrevAddress5Years,
      applicantEmailTelephoneVoicemail: applicantEmailTelephoneVoicemail,
      applicantDigitalPreference: applicantDigitalPreference,
      respondentKnownDoB: respondentKnownDoB,
      respondentKnownPlaceOfBirth: respondentKnownPlaceOfBirth,
      respondentGender: respondentGender,
      respondentChangedName: respondentChangedName,
      respAddress5Years: respAddress5Years,
      respondentRelationship: respondentRelationship,
      respAddressLookup: respAddressLookup,
      respAddressLookupSuccessful: respAddressLookupSuccessful,
      respKnownEmailAndPhone: respKnownEmailAndPhone,
      yesNoOtherPersonDetails: yesNoOtherPersonDetails,
      c100OtherPeopleGender: c100OtherPeopleGender,
      c100OtherPeopleChangedName: c100OtherPeopleChangedName,
      c100OtherPeopleDoBKnown: c100OtherPeopleDoBKnown,
      c100OtherPersonRelationship: c100OtherPersonRelationship,
      c100ChildMainlyLivesWith: c100ChildMainlyLivesWith,
    });
    await C100SafetyConcerns.c100SafetyConcerns({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ChildrenSafetyConcerns: c100ChildrenSafetyConcerns,
      c100SafetyConcernsYesNoToAll: c100SafetyConcernsYesNoToAll,
      c100ChildrenHavePassport: c100ChildrenHavePassport,
      c100MoreThanOnePassport: c100MoreThanOnePassport,
      c100PassportOfficeNotified: c100PassportOfficeNotified,
      c100ChildrenAbductedBefore: c100ChildrenAbductedBefore,
      c100ChildrenSupervision: c100ChildrenSupervision,
    });
    await C100InternationalElements.c100InternationalElements({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoInternationalElements: yesNoInternationalElements,
    });
    await C100ReasonableAdjustments.c100ReasonableAdjustments({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoReasonableAdjustments: yesNoReasonableAdjustments,
    });
    await C100HelpWithFees.c100HelpWithFees({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100YesNoNeedHelpWithFees: c100YesNoNeedHelpWithFees,
      c100YesNoFeesApplied: c100YesNoFeesApplied,
    });
    await ReviewPage.submitSecondMiro({
      page: page,
      accessibilityTest: accessibilityTest,
      relationshipType: relationshipType,
    });
    await EqualityAndDiversityPage.equalityAndDiversityPage({
      page,
    });
    await ConfirmationPage.confirmationPage({
      page: page,
      accessibilityTest: accessibilityTest,
    });
  }

  public static async c100ThirdMiroJourney({
    page,
    accessibilityTest,
    errorMessaging,
    c100LegalRepresentation,
    c100CourtPermissionNeeded,
    urgencyAndWithoutNoticeAllOptionsYes,
    miamAlreadyAttended,
    miamValidReasonNoAttendance,
    documentSignedByMediator,
    miamGeneralExemptions,
    miamDomesticAbuse,
    miamDomesticAbuseProvidingEvidence,
    miamChildProtectionConcernsType,
    miamUrgencyType,
    miamAttendanceType,
    miamPreviousAttendanceMediatorSignedDocument,
    miamOtherReasonForNotAttending,
    miamReasonForNoAccessToMediator,
  }: C100ThirdMiroJourneyMIAMOptions): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: "C100",
    });
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: false, // Has to be false for the MIAM journey
      c100LegalRepresentation: c100LegalRepresentation,
      c100CourtPermissionNeeded: c100CourtPermissionNeeded,
    });
    await MIAM.MIAM({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      miamChildrenInvolvedOtherProceedings: false, // Has to be false
      miamAlreadyAttended: miamAlreadyAttended,
      documentSignedByMediator: documentSignedByMediator,
      miamValidReasonNoAttendance: miamValidReasonNoAttendance,
      miamGeneralExemptions: miamGeneralExemptions,
      miamDomesticAbuse: miamDomesticAbuse,
      miamDomesticAbuseProvidingEvidence: miamDomesticAbuseProvidingEvidence,
      miamChildProtectionConcernsType: miamChildProtectionConcernsType,
      miamUrgencyType: miamUrgencyType,
      miamAttendanceType: miamAttendanceType,
      miamPreviousAttendanceMediatorSignedDocument:
        miamPreviousAttendanceMediatorSignedDocument,
      miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
      miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
    });
    await C100TypeOfOrder.c100TypeOfOrder({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    await C100UrgencyAndWithoutNotice.c100UrgencyAndWithoutNotice({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      urgencyAndWithoutNoticeAllOptionsYes:
        urgencyAndWithoutNoticeAllOptionsYes,
    });
    // People
  }

  public static async c100FourthRowMiroJourney({
    page,
    accessibilityTest,
    errorMessaging,
    c100LegalRepresentation,
    c100CourtPermissionNeeded,
    miamAlreadyAttended,
    documentSignedByMediator,
    miamValidReasonNoAttendance,
    miamGeneralExemptions,
    miamDomesticAbuse,
    miamDomesticAbuseProvidingEvidence,
    miamChildProtectionConcernsType,
    miamUrgencyType,
    miamAttendanceType,
    miamPreviousAttendanceMediatorSignedDocument,
    miamOtherReasonForNotAttending,
    miamReasonForNoAccessToMediator,
    urgencyAndWithoutNoticeAllOptionsYes,
  }: C100FourthRowMiroJourneyOptions): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: "C100",
    });
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: false, // Has to be false for the MIAM journey
      c100LegalRepresentation: c100LegalRepresentation,
      c100CourtPermissionNeeded: c100CourtPermissionNeeded,
    });
    await MIAM.MIAM({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      miamChildrenInvolvedOtherProceedings: false, // Has to be false
      miamAlreadyAttended: miamAlreadyAttended,
      documentSignedByMediator: documentSignedByMediator,
      miamValidReasonNoAttendance: miamValidReasonNoAttendance,
      miamGeneralExemptions: miamGeneralExemptions,
      miamDomesticAbuse: miamDomesticAbuse,
      miamDomesticAbuseProvidingEvidence: miamDomesticAbuseProvidingEvidence,
      miamChildProtectionConcernsType: miamChildProtectionConcernsType,
      miamUrgencyType: miamUrgencyType,
      miamAttendanceType: miamAttendanceType,
      miamPreviousAttendanceMediatorSignedDocument:
        miamPreviousAttendanceMediatorSignedDocument,
      miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
      miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
    });
    await C100UrgencyAndWithoutNotice.c100UrgencyAndWithoutNotice({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      urgencyAndWithoutNoticeAllOptionsYes:
        urgencyAndWithoutNoticeAllOptionsYes,
    });
    await C100TypeOfOrder.c100TypeOfOrder({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    // People
  }
}
