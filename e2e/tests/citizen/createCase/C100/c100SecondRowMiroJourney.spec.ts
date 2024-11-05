import { test } from "@playwright/test";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import Config from "../../../../config";
import IdamLoginHelper from "../../../../common/idamLoginHelper";

test.describe("C100 Citizen Application tests on the second MIRO set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(`Test the second row of the second row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    No Screening and Written Review
    Legal Representation: no
    Court Permission Needed: no
    Other proceedings: no to all
    child arrangement order details: no
    urgency and without notice: no
    gender: male
    people: yes
    c100ChildrenSupervision: yesSpendTime`, async ({ page }): Promise<void> => {
    await C100.c100SecondMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false,
      yesNoOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: false,
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
    });
  });

  test(`Test the second row of the second row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Yes Error Messaging,
    No Screening and Written Review
    Legal Representation: no
    Court Permission Needed: no
    Other proceedings: yes to all
    child arrangement order details: no
    urgency and without notice: no
    gender: female
    people: no`, async ({ page }): Promise<void> => {
    await C100.c100SecondMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false,
      yesNoOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: false,
      gender: "female",
      c100PeopleYesNoDontKnow: "no",
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: true,
      applicantChangedName: true,
      applicantGender: "female",
      applicantRelationship: "guardian",
      applicantAddressLookup: true,
      appAddressLookupSuccessful: true,
      applicantPrevAddress5Years: true,
      applicantEmailTelephoneVoicemail: true,
      applicantDigitalPreference: true,
      respondentKnownDoB: true,
      respondentKnownPlaceOfBirth: true,
      respondentGender: "female",
      respondentChangedName: "no",
      respAddress5Years: "no",
      respondentRelationship: "guardian",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "female",
      c100OtherPeopleChangedName: "no",
      c100OtherPeopleDoBKnown: true,
      c100OtherPersonRelationship: "guardian",
      c100ChildMainlyLivesWith: "respondent",
      c100ChildrenSafetyConcerns: false,
      c100SafetyConcernsYesNoToAll: false,
      c100ChildrenHavePassport: false,
      c100MoreThanOnePassport: false,
      c100PassportOfficeNotified: false,
      c100ChildrenAbductedBefore: false,
      c100ChildrenSupervision: "yesButSupervised",
      yesNoInternationalElements: false,
      yesNoReasonableAdjustments: false,
    });
  });
  test(`Test the second row of the second row c100 citizen journey with the following options:
    Accessibility Testing,
    Not Error Messaging,
    No Screening and Written Review
    Legal Representation: no
    Court Permission Needed: no
    Other proceedings: yes to all
    child arrangement order details: no
    urgency and without notice: no,
    gender: other
    people: dontKnow
    @accessibilityCitizenFrontend
    `, async ({ page }): Promise<void> => {
    await C100.c100SecondMiroJourney({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false,
      yesNoOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: false,
      gender: "male",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: true,
      applicantChangedName: true,
      applicantGender: "other",
      applicantRelationship: "specialGuardian",
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
      respondentRelationship: "specialGuardian",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "male",
      c100OtherPeopleChangedName: "yes",
      c100OtherPeopleDoBKnown: true,
      c100OtherPersonRelationship: "specialGuardian",
      c100ChildMainlyLivesWith: "respondent",
      c100ChildrenSafetyConcerns: true,
      c100SafetyConcernsYesNoToAll: true,
      c100ChildrenHavePassport: true,
      c100MoreThanOnePassport: true,
      c100PassportOfficeNotified: true,
      c100ChildrenAbductedBefore: true,
      c100ChildrenSupervision: "noSpendTime",
      yesNoInternationalElements: true,
      yesNoReasonableAdjustments: true,
    });
  });
});
