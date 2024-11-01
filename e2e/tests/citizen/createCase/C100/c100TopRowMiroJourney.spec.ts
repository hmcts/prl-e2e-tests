import { test } from "@playwright/test";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import Config from "../../../../config";
import IdamLoginHelper from "../../../../common/idamLoginHelper";

test.describe("C100 Citizen Application tests on the top MIRO set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test.beforeEach(async ({ page }) => {
    // Sign in as a citizen user before each test
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
    applicantRelationship: mother,
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
    respondent relationship: mother
    respondent address lookup: true,
    respondent address lookup successful: true,
    respondent known contacts: yes,
    Other Person details: true,
    Other person gender: male,
    Other person changed name: yes,
    other person birthday known: true,
    other person relationship: 'mother,
    child arrangement order details: true,
    yes to all other proceedings radios: true,
    safety concerns yes: true,
    safety concerns yes to all: true,
    children have passport: true,
    more than one passport: true,
    passport office notified: yes,
    children abducted before: yes,
    child supervision: yes spend time,
    international elements yes to all: ture,
    yes to all reasonable adjustments: ture,
    need help with fees: yes,
    fees applied: yes`, async ({ page }): Promise<void> => {
    await C100.c100TopMiroJourney({
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
      applicantRelationship: "mother",
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
      respondentRelationship: "mother",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "male",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100OtherPersonRelationship: "mother",
      yesNoChildArrangementOrderDetails: true,
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
    applicantGender: male,
    applicantRelationship: father,
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
    respondent relationship: father
    respondent address lookup: true,
    respondent address lookup successful: true,
    respondent known contacts: yes,
    Other Person details: true,
    Other person gender: male,
    Other person changed name: yes,
    other person birthday known: true,
    other person relationship: 'father',
    child arrangement order details: true,
    yes to all other proceedings radios: true,
    safety concerns yes: true,
    safety concerns yes to all: ture,
    children have passport: true,
    more than one passport: true,
    passport office notified: yes,
    children abducted before: yes,
    child supervision: yes spend time,
    international elements yes to all: ture,
    yes to all reasonable adjustments: ture,
    need help with fees: yes,
    fees applied: yes`, async ({ page }): Promise<void> => {
    await C100.c100TopMiroJourney({
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
      applicantRelationship: "father",
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
      respondentRelationship: "father",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "male",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100OtherPersonRelationship: "father",
      yesNoChildArrangementOrderDetails: true,
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
    applicantRelationship: father,
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
    respondent relationship: father
    respondent address lookup: true,
    respondent address lookup successful: true,
    respondent known contacts: yes,
    Other Person details: true,
    Other person gender: male,
    Other person changed name: yes,
    other person birthday known: true,
    other person relationship: 'father',
    child arrangement order details: true,
    yes to all other proceedings radios: true,
    safety concerns yes: true,
    safety concerns yes to all: ture,
    children have passport: true,
    more than one passport: true,
    passport office notified: yes,
    children abducted before: yes,
    child supervision: yes spend time,
    international elements yes to all: ture,
    yes to all reasonable adjustments: ture,
    need help with fees: yes,
    fees applied: yes`, async ({ page }): Promise<void> => {
    await C100.c100TopMiroJourney({
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
      applicantRelationship: "father",
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
      respondentRelationship: "father",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "male",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100OtherPersonRelationship: "father",
      yesNoChildArrangementOrderDetails: true,
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
    });
  });
});

test.describe("Test the accessibility of the CA C100 Citizen Journey.  @accessibilityCitizenFrontend", (): void => {
  test(`Test the C100 of the citizen journey with the following options:
    Accessibility Testing,
    Not Error Messaging,
    Yes Screening and Written Review
    With urgency and without notice all options yes
    People gender male,
    People option all options yes,
    Others know applicants contact: yes,
    keep details private: true,
    applicantChangedName: yes,
    applicantGender: male,
    applicantRelationship: father,
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
    respondent relationship: father
    respondent address lookup: true,
    respondent address lookup successful: true,
    respondent known contacts: yes,
    Other Person details: true,
    Other person gender: male,
    Other person changed name: yes,
    other person birthday known: true,
    other person relationship: 'father',
    child arrangement order details: true,
    yes to all other proceedings radios: true,
    safety concerns yes: true,
    safety concerns yes to all: ture,
    children have passport: true,
    more than one passport: true,
    passport office notified: yes,
    children abducted before: yes,
    child supervision: yes spend time,
    international elements yes to all: ture,
    yes to all reasonable adjustments: ture,
    need help with fees: yes,
    fees applied: yes`, async ({ page }): Promise<void> => {
    await C100.c100TopMiroJourney({
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
      applicantRelationship: "father",
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
      respondentRelationship: "father",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "male",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100OtherPersonRelationship: "father",
      yesNoChildArrangementOrderDetails: true,
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
    });
  });
});
