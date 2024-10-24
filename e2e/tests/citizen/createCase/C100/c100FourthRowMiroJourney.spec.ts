import { test } from "@playwright/test";

import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";

test.use({ storageState: Config.sessionStoragePath + "citizen.json" });

test.describe("C100 Citizen Application tests on the top MIRO set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  Yes Screening and Written Review
  With urgency and without notice options`, async ({ page }): Promise<void> => {
    await C100.c100TopMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  Yes Screening and Written Review
  Without urgency and without notice options`, async ({
                                                                page,
                                                              }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: true,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
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
  });

  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Yes Error Messaging,
  Yes Screening and Written Review`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100ScreeningWrittenAgreementReview: true,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
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
  });
});

test(`C100 Citizen Application tests on the top MIRO set. @accessibilityCitizenFrontend`, async ({
                                                                                                   page,
                                                                                                 }): Promise<void> => {
  await C100.c100({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    c100ScreeningWrittenAgreementReview: true,
    c100LegalRepresentation: false,
    c100CourtPermissionNeeded: false,
    c100OthersKnowApplicantsContact: "yes",
    c100PrivateDetails: false,
    c100ChildrenSafetyConcerns: false,
    miamChildrenInvolvedOtherProceedings: true,
    urgencyAndWithoutNoticeAllOptionsYes: true,
    miamAlreadyAttended: false,
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
});
