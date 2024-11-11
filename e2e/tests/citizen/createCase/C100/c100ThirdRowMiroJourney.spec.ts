import { test } from "@playwright/test";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import Config from "../../../../config";
import IdamLoginHelper from "../../../../common/idamLoginHelper";

test.describe("C100 Citizen Application tests on the third MIRO set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing with previously attended MIAM
  With a signed MIAM document
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Having attended a MIAM in the last 4 months
  With a mediator signed document
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "Previous 4 months",
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
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Having an application made in existing proceedings
  Without a mediator signed document
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "Application made in existing proceedings",
      miamPreviousAttendanceMediatorSignedDocument: false,
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
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Applying for an application without notice
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
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
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Applying for an application for an U18 respondent
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Under 18",
      miamReasonForNoAccessToMediator: "None of these",
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Cannot access mediator
  Unable to conduct within 15 days
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Unable to conduct within 15 days",
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Cannot access mediator
  Disability
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Disability",
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Cannot access mediator
  No mediator within 15 miles
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "No mediator within 15 miles",
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Cannot access mediator
  Prison or institution
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Prison or institution",
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Cannot access mediator
  subject to bail
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Subject to bail",
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Cannot access mediator
  released from prison on license
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Released from prison on license",
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Error Messaging
  MIAM testing with a valid reason for not attending
  With a signed document
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
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
    });
  });

  test(`C100 Citizen Application with the following options:
  Not Accessibility Testing
  Error Messaging
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Cannot access mediator
  released from prison on license
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Released from prison on license",
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });
});

test.describe("C100 Citizen Application accessibility tests on the third row journey set. @accessibilityCitizenFrontend", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(`C100 Citizen Application with the following options:
  Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing with a valid reason for not attending
  With a signed document
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
      page: page,
      accessibilityTest: true,
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
    });
  });

  test(`C100 Citizen Application with the following options:
  Accessibility Testing
  Not Error Messaging
  Legal Representation
  No Permission Needed
  MIAM testing with a valid reason for not attending
  With all general MIAM exemptions
  And subject to domestic abuse
  providing evidence of domestic abuse
  Cannot access mediator
  released from prison on license
  urgency and without notice all options: no`, async ({
    page,
  }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
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
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Released from prison on license",
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });
});