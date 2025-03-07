import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import IdamLoginHelper from "../../../../common/userHelpers/idamLoginHelper.ts";
import { test } from "@playwright/test";

test.describe("C100 Citizen Application for the MIAM Hearing Urgency journey.", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.createAndSignInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed  
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a child protection plan
  With a risk to life urgency
  With a Miam attended in the previous 4 months
  With a mediator signed document
  And Applying for a without notice other reason
  urgency and without notice all options: no
  People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false,
  safety concerns: yes
  supervision: yes but supervised,
  passport: false,
  more than one passport: false,
  passport office notified: false,
  safety concerns yes/no to everything else: no @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "Child protection plan",
      miamUrgencyType: "Risk to life",
      miamAttendanceType: "Previous 4 months",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "Applying for without notice",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a risk to life urgency
  urgency and without notice all options: no
  People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false,
  safety concerns: yes
  supervision: yes but supervised,
  passport: false,
  more than one passport: false,
  passport office notified: false,
  safety concerns yes/no to everything else: no @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Risk to life",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Risk to family life urgency
  urgency and without notice all options: no
  People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false,
  safety concerns: yes
  supervision: yes but supervised,
  passport: false,
  more than one passport: false,
  passport office notified: false,
  safety concerns yes/no to everything else: no @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Risk to family life",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Risk to safety of home urgency
  urgency and without notice all options: no
  People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false,
  safety concerns: yes
  supervision: yes ,
  passport: false,
  more than one passport: false,
  passport office notified: false,
  safety concerns yes/no to everything else: no @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Risk to safety of home",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesSpendTime",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay causing risk of harm urgency
  With a Risk to safety of home urgency
  urgency and without notice all options: no
  People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false,
  safety concerns: yes
  supervision: yes but supervised,
  passport: false,
  more than one passport: false,
  passport office notified: false,
  safety concerns yes/no to everything else: no @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay causing risk of harm",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay causing risk of removal urgency
  urgency and without notice all options: no
  People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false,
  safety concerns: yes
  supervision: yes but supervised,
  passport: false,
  more than one passport: false,
  passport office notified: false,
  safety concerns yes/no to everything else: no @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay causing risk of removal",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay causing risk of unfair court decision urgency
  urgency and without notice all options: no
  People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false,
  safety concerns: yes
  supervision: yes but supervised,
  passport: false,
  more than one passport: false,
  passport office notified: false,
  safety concerns yes/no to everything else: no @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay causing risk of unfair court decision",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay causing risk of financial hardship urgency
  urgency and without notice all options: no
  People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false,
  safety concerns: yes
  supervision: yes but supervised,
  passport: false,
  more than one passport: false,
  passport office notified: false,
  safety concerns yes/no to everything else: no @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay causing risk of financial hardship",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay causing risk of irretrievable problems
  urgency and without notice all options: no
  People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false,
  safety concerns: yes
  supervision: yes but supervised,
  passport: false,
  more than one passport: false,
  passport office notified: false,
  safety concerns yes/no to everything else: no @regression @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay causing risk of irretrievable problems",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
 MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay dispute starting in another country problems
  urgency and without notice all options: no
  People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false,
  safety concerns: yes
  supervision: yes but supervised,
  passport: false,
  more than one passport: false,
  passport office notified: false,
  safety concerns yes/no to everything else: no @regression`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay dispute starting in another country",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Error Messaging
  Legal Representation
  No Permission Needed
 MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay dispute starting in another country problems
  urgency and without notice all options: no
  People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false,
  safety concerns: yes
  supervision: yes but supervised,
  passport: false,
  more than one passport: false,
  passport office notified: false,
  safety concerns yes/no to everything else: no @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay dispute starting in another country",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });

  test(`C100 Citizen Application with the following options:
    Accessibility Testing
    Not Error Messaging
    Legal Representation
    No Permission Needed
   MIAM testing  with no previously attended MIAM,
    With a valid reason for attending
    With all general exemptions
    And subject to domestic abuse
    Providing evidence of domestic abuse
    With a Delay dispute starting in another country problems
    urgency and without notice all options: no
    People Gender: other
  People yes no dont know: 'Dont Know'
  private details: false
  others know applicant contact: dont know
  applicant changed name: false,
  applicant gender: other
  applicant relationship to child: other
  applicant lives in a refuge: no,
  applicant address lookup: false
  successful lookup: false,
  applicant address 5 years: false,
  applicant contact details: false
  applicant digital preference: false,
  respondent known dob: false
  respondent known place of birth: false,
  respondent changed name: dont know,
  respondent gender: other,
  respondent address 5 years: dont know,
  respondent address: false,
  respondent address success: false,
  respondent contact details: false,
  other person: false
  child mainly lives with: respondent,
  child arrangement order: false,
  other proceedings: false, @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAJourneyMIAMHearingUrgency({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay dispute starting in another country",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "other",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: false,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: false,
      applicantGender: "other",
      applicantRelationship: "other",
      applicantLivesInRefuge: false,
      applicantAddressLookup: false,
      appAddressLookupSuccessful: false,
      applicantPrevAddress5Years: false,
      applicantEmailTelephoneVoicemail: false,
      applicantDigitalPreference: false,
      respondentKnownDoB: false,
      respondentKnownPlaceOfBirth: false,
      respondentChangedName: "dontKnow",
      respondentGender: "other",
      respAddress5Years: "dontKnow",
      respondentRelationship: "other",
      respAddressLookup: false,
      respAddressLookupSuccessful: false,
      respKnownEmailAndPhone: false,
      yesNoOtherPersonDetails: false,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: false,
      c100OtherPersonRelationship: "other",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "respondent",
      C100YesNoConfidentiality: true,
      yesNoOtherProceedings: false,
      c100ChildrenSafetyConcerns: true,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100SafetyConcernsYesNoToAll: false,
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
    });
  });
});
