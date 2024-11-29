import { test } from "@playwright/test";
import IdamLoginHelper from "../../../../common/idamLoginHelper";
import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";

test.describe("C100 Citizen Application with Written Consent from other people in the case.", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(`Test the C100 of the citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    Yes Screening and Written Review
    With urgency and without notice all options yes
    People gender male,
    People option all options yes,
    Others know applicants contact: yes,
    keep details private: true,
    applicantChangedName: yes,
    applicantGender: male,
    all relationships: mother
    applicant address lookup: true,
    applicant address lookup successful: true,
    applicant lived at address more than 5 years: true,
    applicant email and telephone: true,
    applicant digital preferences: true,
    respondent DoB known,
    respondent place of birth known,
    respondent gender: male,
    respondent changed name: yes,
    respondent lived aat address less than 5 years: yes,
    respondent address lookup: true,
    respondent address lookup successful: true,
    respondent known contacts: yes,
    Other Person details: true,
    Other person gender: male,
    Other person changed name: yes,
    other person birthday known: true,
    child mainly lives with: applicant,
    child arrangement order details: true,
    yes to all other proceedings radios: true,
    safety concerns yes: true,
    safety concerns yes to all: true,
    children have passport: true,
    more than one passport: true,
    passport office notified: yes,
    children abducted before: yes,
    child supervision: yes spend time,
    international elements yes to all: true,
    yes to all reasonable adjustments: true,
    need help with fees: yes,
    fees applied: yes @smoke @regression`, async ({
    page,
  }): Promise<void> => {
    await C100.c100caWrittenConsentJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      c100PeopleGender: "male",
      c100PeopleYesNoDontKnow: "yes",
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: true,
      applicantChangedName: true,
      applicantGender: "male",
      applicantAddressLookup: true,
      appAddressLookupSuccessful: true,
      applicantPrevAddress5Years: true,
      applicantEmailTelephoneVoicemail: true,
      applicantDigitalPreference: true,
      respondentKnownDoB: true,
      respondentKnownPlaceOfBirth: true,
      respondentGender: "male",
      respondentChangedName: "yes",
      respAddress5Years: "yes",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "male",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100ChildMainlyLivesWith: "applicant",
      yesNoOtherProceedings: true,
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
      reviewPageTopJourneyMotherFather: "mother",
      relationshipType: "mother",
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    Yes Screening and Written Review
    With urgency and without notice all options yes
    People gender male,
    People option all options yes,
    Others know applicants contact: yes,
    keep details private: true,
    applicantChangedName: yes,
    all relationships: father
    applicantGender: male,
    applicant address lookup: true,
    applicant address lookup successful: true,
    applicant lived at address more than 5 years: true,
    applicant email and telephone: true,
    applicant digital preferences: true,
    respondent DoB known,
    respondent place of birth known,
    respondent gender: male,
    respondent changed name: yes,
    respondent lived aat address less than 5 years: yes,
    respondent address lookup: true,
    respondent address lookup successful: true,
    respondent known contacts: yes,
    Other Person details: true,
    Other person gender: male,
    Other person changed name: yes,
    other person birthday known: true,
    child mainly lives with: 'applicant'
    child arrangement order details: true,
    yes to all other proceedings radios: true,
    safety concerns yes: true,
    safety concerns yes to all: true,
    children have passport: true,
    more than one passport: true,
    passport office notified: yes,
    children abducted before: yes,
    child supervision: yes spend time,
    international elements yes to all: true,
    yes to all reasonable adjustments: true,
    need help with fees: yes,
    fees applied: yes @regression`, async ({ page }): Promise<void> => {
    await C100.c100caWrittenConsentJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      c100PeopleGender: "male",
      c100PeopleYesNoDontKnow: "yes",
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: true,
      applicantChangedName: true,
      applicantGender: "male",
      applicantAddressLookup: true,
      appAddressLookupSuccessful: true,
      applicantPrevAddress5Years: true,
      applicantEmailTelephoneVoicemail: true,
      applicantDigitalPreference: true,
      respondentKnownDoB: true,
      respondentKnownPlaceOfBirth: true,
      respondentGender: "male",
      respondentChangedName: "yes",
      respAddress5Years: "yes",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "male",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100ChildMainlyLivesWith: "applicant",
      yesNoOtherProceedings: true,
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
      reviewPageTopJourneyMotherFather: "father",
      relationshipType: "father",
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
    Not Accessibility Testing,
    Error Messaging,
    Yes Screening and Written Review
    With urgency and without notice all options yes
    People gender male,
    People option all options yes,
    Others know applicants contact: yes,
    keep details private: true,
    applicantChangedName: yes,
    applicantGender: male,
    all relationships: father
    applicant address lookup: true,
    applicant address lookup successful: true,
    applicant lived at address more than 5 years: true,
    applicant email and telephone: true,
    applicant digital preferences: true,
    respondent DoB known,
    respondent place of birth known,
    respondent gender: male,
    respondent changed name: yes,
    respondent lived aat address less than 5 years: yes,
    respondent address lookup: true,
    respondent address lookup successful: true,
    respondent known contacts: yes,
    Other Person details: true,
    Other person gender: male,
    Other person changed name: yes,
    other person birthday known: true,
    child mainly lives with: 'applicant'
    child arrangement order details: true,
    yes to all other proceedings radios: true,
    safety concerns yes: true,
    safety concerns yes to all: true,
    children have passport: true,
    more than one passport: true,
    passport office notified: yes,
    children abducted before: yes,
    child supervision: yes spend time,
    international elements yes to all: true,
    yes to all reasonable adjustments: true,
    need help with fees: yes,
    fees applied: yes @regression`, async ({
    page,
  }): Promise<void> => {
    await C100.c100caWrittenConsentJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      c100PeopleGender: "male",
      c100PeopleYesNoDontKnow: "yes",
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: true,
      applicantChangedName: true,
      applicantGender: "male",
      applicantAddressLookup: true,
      appAddressLookupSuccessful: true,
      applicantPrevAddress5Years: true,
      applicantEmailTelephoneVoicemail: true,
      applicantDigitalPreference: true,
      respondentKnownDoB: true,
      respondentKnownPlaceOfBirth: true,
      respondentGender: "male",
      respondentChangedName: "yes",
      respAddress5Years: "yes",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "male",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100ChildMainlyLivesWith: "applicant",
      yesNoOtherProceedings: true,
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
      reviewPageTopJourneyMotherFather: "father",
      relationshipType: "father",
    });
  });
});

test.describe("Test the accessibility of the CA C100 Citizen Journey", (): void => {
  test.beforeEach(async ({ page }) => {
    // Sign in as a citizen user before each test
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(`Test the C100 of the citizen journey with the following options:
    Accessibility Testing,
    Not Error Messaging,
    Yes Screening and Written Review
    With urgency and without notice all options yes
    People gender male,
    People option all options yes,
    Others know applicants contact: yes,
    keep details private: true,
    all relationship types: 'father'
    applicantChangedName: yes,
    applicantGender: male,
    applicant address lookup: true,
    applicant address lookup successful: true,
    applicant lived at address more than 5 years: true,
    applicant email and telephone: true,
    applicant digital preferences: true,
    respondent DoB known,
    respondent place of birth known,
    respondent gender: male,
    respondent changed name: yes,
    respondent lived aat address less than 5 years: yes,
    respondent address lookup: true,
    respondent address lookup successful: true,
    respondent known contacts: yes,
    Other Person details: true,
    Other person gender: male,
    Other person changed name: yes,
    other person birthday known: true,
    child arrangement order details: true,
    child mainly lives with: 'applicant'
    yes to all other proceedings radios: true,
    safety concerns yes: true,
    safety concerns yes to all: true,
    children have passport: true,
    more than one passport: true,
    passport office notified: yes,
    children abducted before: yes,
    child supervision: yes spend time,
    international elements yes to all: true,
    yes to all reasonable adjustments: true,
    need help with fees: yes,
    fees applied: yes @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100.c100caWrittenConsentJourney({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      c100PeopleGender: "male",
      c100PeopleYesNoDontKnow: "yes",
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: true,
      applicantChangedName: true,
      applicantGender: "male",
      applicantAddressLookup: true,
      appAddressLookupSuccessful: true,
      applicantPrevAddress5Years: true,
      applicantEmailTelephoneVoicemail: true,
      applicantDigitalPreference: true,
      respondentKnownDoB: true,
      respondentKnownPlaceOfBirth: true,
      respondentGender: "male",
      respondentChangedName: "yes",
      respAddress5Years: "yes",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "male",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100ChildMainlyLivesWith: "applicant",
      yesNoOtherProceedings: true,
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
      reviewPageTopJourneyMotherFather: "father",
      relationshipType: "father",
    });
  });
});
