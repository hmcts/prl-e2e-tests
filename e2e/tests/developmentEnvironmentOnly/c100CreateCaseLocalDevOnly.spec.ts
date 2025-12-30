import { test } from "../fixtures.ts";
import Config from "../../utils/config.utils.ts";
import { C100 } from "../../journeys/citizen/createCase/C100/C100.ts";

test.describe("C100 Create Case as Citizen cftlib dev environments only @cftlib", () => {
  test.beforeEach(async ({ page, idamLoginHelper }) => {
    await idamLoginHelper.signInLongLivedUser(
      page,
      "citizenDev",
      Config.citizenFrontendBaseURL
    );
  });

  test("C100 Citizen Application", async ({ page }): Promise<void> => {
    await C100.c100CAExistingMIAMDocumentJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      miamAlreadyAttended: true,
      documentSignedByMediator: true,
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
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "female",
      c100PeopleYesNoDontKnow: "dontKnow",
      c100PrivateDetails: true,
      c100OthersKnowApplicantsContact: "dontKnow",
      applicantChangedName: true,
      applicantGender: "other",
      applicantRelationship: "specialGuardian",
      applicantLivesInRefuge: false,
      applicantAddressLookup: true,
      appAddressLookupSuccessful: true,
      applicantPrevAddress5Years: true,
      applicantEmailTelephoneVoicemail: true,
      applicantDigitalPreference: true,
      respondentKnownDoB: true,
      respondentKnownPlaceOfBirth: true,
      respondentGender: "other",
      respondentChangedName: "dontKnow",
      respAddress5Years: "dontKnow",
      respondentRelationship: "specialGuardian",
      respAddressLookup: true,
      respAddressLookupSuccessful: true,
      respKnownEmailAndPhone: true,
      yesNoOtherPersonDetails: true,
      c100OtherPeopleGender: "other",
      c100OtherPeopleChangedName: "dontKnow",
      c100OtherPeopleDoBKnown: true,
      c100OtherPersonRelationship: "specialGuardian",
      c100OtherPersonLivesInRefuge: false,
      c100ChildMainlyLivesWith: "otherPerson",
      C100YesNoConfidentiality: true,
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
      c100YesNoNeedHelpWithFees: false,
      c100YesNoFeesApplied: false,
    });
  });
});
