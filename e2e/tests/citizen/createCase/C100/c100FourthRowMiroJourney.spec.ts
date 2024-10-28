import { test } from "@playwright/test";

import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";

test.use({ storageState: Config.sessionStoragePath + "citizen.json" });

test.describe("C100 Citizen Application tests on the fourth MIRO set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
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
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100FourthRowMiroJourney({
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
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100FourthRowMiroJourney({
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
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100FourthRowMiroJourney({
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
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100FourthRowMiroJourney({
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
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100FourthRowMiroJourney({
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
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100FourthRowMiroJourney({
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
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100FourthRowMiroJourney({
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
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100FourthRowMiroJourney({
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
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100FourthRowMiroJourney({
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
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100FourthRowMiroJourney({
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
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100FourthRowMiroJourney({
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
    });
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
  urgency and without notice all options: no`, async ({
  page,
}): Promise<void> => {
  await C100.c100FourthRowMiroJourney({
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
  });
});