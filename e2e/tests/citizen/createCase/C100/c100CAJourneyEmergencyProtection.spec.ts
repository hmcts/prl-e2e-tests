import { test } from "@playwright/test";
import IdamLoginHelper from "../../../../common/idamLoginHelper";
import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";

test.describe("C100 Citizen Application tests on the second MIRO set.", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(`Second row of the second row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    No Screening and Written Review
    Legal Representation: Yes
    Court Permission Needed: Yes 
    Other proceedings: Yes to all
    child arrangement order details: Yes
    urgency and without notice: Yes
    gender: male
    people: yes
    Children Supervision: yesSpendTime
    People YesNoDontKnow: "yes",
    Others Know Applicants Contact: "yes",
    Private Details: yes,
    applicant Changed Name: yes,
    applicant Gender: "other",
    applicant Relationship: "grandparent",
    applicant Address Lookup: yes,
    app Address Lookup Successful: yes,
    applicant Prev Address 5Years: yes,
    applicant Email Telephone Voicemail: yes,
    applicant Digital Preference: yes,
    respondent Known DoB: yes,
    respondent Known Place Of Birth: yes,
    respondent Gender: "other",
    respondent Changed Name: "yes",
    resp Address 5Years: "yes",
    respondent Relationship: "grandparent",
    resp Address Lookup: yes,
    resp Address Lookup Successful: yes,
    resp Known Email And Phone: yes,
    yes No Other Person Details: yes,
    Other People Gender: "other",
    Other People Changed Name: "yes",
    Other People DoB Known: yes,
    Other Person Relationship: "grandparent",
    Child Mainly Lives With: "respondent",
    Children Safety Concerns: yes,
    Safety Concerns Yes NoToAll: yes,
    Children Have Passport: yes,
    More Than One Passport: yes,
    PassportOffice Notified: yes,
    Children Abducted Before: yes,
    Children Supervision: "yesSpendTime",
    yes No International Elements: yes,
    yes No Reasonable Adjustments: yes,
    Yes No Need Help With Fees: yes,
    Yes No Fees Applied: yes, @regression`, async ({ page }): Promise<void> => {
    await C100.c100CAEmergencyProtectionJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: true,
      yesNoOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      gender: "male",
      c100PeopleYesNoDontKnow: "yes",
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: true,
      applicantChangedName: true,
      applicantGender: "other",
      applicantRelationship: "grandparent",
      applicantAddressLookup: true,
      appAddressLookupSuccessful: true,
      applicantPrevAddress5Years: true,
      applicantEmailTelephoneVoicemail: true,
      applicantDigitalPreference: true,
      respondentKnownDoB: true,
      respondentKnownPlaceOfBirth: true,
      respondentGender: "other",
      respondentChangedName: "yes",
      respAddress5Years: "yes",
      respondentRelationship: "grandparent",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100OtherPersonRelationship: "grandparent",
      c100ChildMainlyLivesWith: "respondent",
      c100ChildrenSafetyConcerns: true,
      c100SafetyConcernsYesNoToAll: true,
      c100ChildrenHavePassport: true,
      c100MoreThanOnePassport: true,
      c100PassportOfficeNotified: true,
      c100ChildrenAbductedBefore: true,
      c100ChildrenSupervision: "yesSpendTime",
      yesNoInternationalElements: true,
      yesNoReasonableAdjustments: true,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
      relationshipType: "Grandparent",
    });
  });

  test(`Second row of the second row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Error Messaging,
    No Screening and Written Review
    Legal Representation: Yes
    Court Permission Needed: Yes
    Other proceedings: Yes to all
    child arrangement order details: Yes
    urgency and without notice: Yes
    gender: male
    people: yes
    Children Supervision: yesSpendTime
    People YesNoDontKnow: "yes",
    Others Know Applicants Contact: "yes",
    Private Details: yes,
    applicant Changed Name: yes,
    applicant Gender: "other",
    applicant Relationship: "guardian",
    applicant Address Lookup: yes,
    app Address Lookup Successful: yes,
    applicant Prev Address 5Years: yes,
    applicant Email Telephone Voicemail: yes,
    applicant Digital Preference: yes,
    respondent Known DoB: yes,
    respondent Known Place Of Birth: yes,
    respondent Gender: "other",
    respondent Changed Name: "yes",
    resp Address 5Years: "yes",
    respondent Relationship: "guardian",
    resp Address Lookup: yes,
    resp Address Lookup Successful: yes,
    resp Known Email And Phone: yes,
    yes No Other Person Details: yes,
    Other People Gender: "other",
    Other People Changed Name: "yes",
    Other People DoB Known: yes,
    Other Person Relationship: "guardian",
    Child Mainly Lives With: "respondent",
    Children Safety Concerns: yes,
    Safety Concerns Yes NoToAll: yes,
    Children Have Passport: yes,
    More Than One Passport: yes,
    PassportOffice Notified: yes,
    Children Abducted Before: yes,
    Children Supervision: "yesSpendTime",
    yes No International Elements: yes,
    yes No Reasonable Adjustments: yes,
    Yes No Need Help With Fees: yes,
    Yes No Fees Applied: yes, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100.c100CAEmergencyProtectionJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: true,
      yesNoOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      gender: "male",
      c100PeopleYesNoDontKnow: "yes",
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: true,
      applicantChangedName: true,
      applicantGender: "other",
      applicantRelationship: "guardian",
      applicantAddressLookup: true,
      appAddressLookupSuccessful: true,
      applicantPrevAddress5Years: true,
      applicantEmailTelephoneVoicemail: true,
      applicantDigitalPreference: true,
      respondentKnownDoB: true,
      respondentKnownPlaceOfBirth: true,
      respondentGender: "other",
      respondentChangedName: "yes",
      respAddress5Years: "yes",
      respondentRelationship: "guardian",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100OtherPersonRelationship: "guardian",
      c100ChildMainlyLivesWith: "respondent",
      c100ChildrenSafetyConcerns: true,
      c100SafetyConcernsYesNoToAll: true,
      c100ChildrenHavePassport: true,
      c100MoreThanOnePassport: true,
      c100PassportOfficeNotified: true,
      c100ChildrenAbductedBefore: true,
      c100ChildrenSupervision: "yesSpendTime",
      yesNoInternationalElements: true,
      yesNoReasonableAdjustments: true,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
      relationshipType: "Guardian",
    });
  });

  test(`Second row of the second row c100 citizen journey with the following options:
    Accessibility Testing,
    Not Error Messaging,
    No Screening and Written Review
    Legal Representation: Yes
    Court Permission Needed: Yes
    Other proceedings: Yes to all
    child arrangement order details: Yes
    urgency and without notice: Yes
    gender: male
    people: yes
    Children Supervision: yesSpendTime
    People YesNoDontKnow: "yes",
    Others Know Applicants Contact: "yes",
    Private Details: yes,
    applicant Changed Name: yes,
    applicant Gender: "other",
    applicant Relationship: "guardian",
    applicant Address Lookup: yes,
    app Address Lookup Successful: yes,
    applicant Prev Address 5Years: yes,
    applicant Email Telephone Voicemail: yes,
    applicant Digital Preference: yes,
    respondent Known DoB: yes,
    respondent Known Place Of Birth: yes,
    respondent Gender: "other",
    respondent Changed Name: "yes",
    resp Address 5Years: "yes",
    respondent Relationship: "guardian",
    resp Address Lookup: yes,
    resp Address Lookup Successful: yes,
    resp Known Email And Phone: yes,
    yes No Other Person Details: yes,
    Other People Gender: "other",
    Other People Changed Name: "yes",
    Other People DoB Known: yes,
    Other Person Relationship: "guardian",
    Child Mainly Lives With: "respondent",
    Children Safety Concerns: yes,
    Safety Concerns Yes NoToAll: yes,
    Children Have Passport: yes,
    More Than One Passport: yes,
    PassportOffice Notified: yes,
    Children Abducted Before: yes,
    Children Supervision: "yesSpendTime",
    yes No International Elements: yes,
    yes No Reasonable Adjustments: yes,
    Yes No Need Help With Fees: yes,
    Yes No Fees Applied: yes,
    @accessibility @nightly`, async ({ page }): Promise<void> => {
    await C100.c100CAEmergencyProtectionJourney({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: true,
      yesNoOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      gender: "male",
      c100PeopleYesNoDontKnow: "yes",
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: true,
      applicantChangedName: true,
      applicantGender: "other",
      applicantRelationship: "guardian",
      applicantAddressLookup: true,
      appAddressLookupSuccessful: true,
      applicantPrevAddress5Years: true,
      applicantEmailTelephoneVoicemail: true,
      applicantDigitalPreference: true,
      respondentKnownDoB: true,
      respondentKnownPlaceOfBirth: true,
      respondentGender: "other",
      respondentChangedName: "yes",
      respAddress5Years: "yes",
      respondentRelationship: "guardian",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100OtherPersonRelationship: "guardian",
      c100ChildMainlyLivesWith: "respondent",
      c100ChildrenSafetyConcerns: true,
      c100SafetyConcernsYesNoToAll: true,
      c100ChildrenHavePassport: true,
      c100MoreThanOnePassport: true,
      c100PassportOfficeNotified: true,
      c100ChildrenAbductedBefore: true,
      c100ChildrenSupervision: "yesSpendTime",
      yesNoInternationalElements: true,
      yesNoReasonableAdjustments: true,
      c100YesNoNeedHelpWithFees: true,
      c100YesNoFeesApplied: true,
      relationshipType: "Guardian",
    });
  });
});
