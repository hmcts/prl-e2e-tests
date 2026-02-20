import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100.ts";

test.describe("Create Citizen Application but you must get a mediator", (): void => {
  test.beforeEach(async ({ page, idamLoginHelper }) => {
    await idamLoginHelper.setupAndSignInUser(
      page,
      Config.citizenFrontendBaseURL,
      "citizen",
    );
  });
  test(`MIAM testing  with no previously attended MIAM. Redirect to Get Mediator
  With no valid reason for attending
  Not error message testing,
  Not accessibility Testing @regression`, async ({ page }): Promise<void> => {
    await C100.getMediatorJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
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

  test(`MIAM testing  with no previously attended MIAM. Redirects to Get Mediator
  With a valid reason for attending
  With no general exemptions
  Not error message testing,
  Not accessibility Testing @regression`, async ({ page }): Promise<void> => {
    await C100.getMediatorJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
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

  test(`MIAM testing  with no previously attended MIAM, Redirects to Get Mediator Page
  With a valid reason for attending
  With all general exemptions
  But no valid reasons
  Not error message testing,
  Not accessibility Testing @regression`, async ({ page }): Promise<void> => {
    await C100.getMediatorJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
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

  test(`MIAM testing  with no previously attended MIAM, redirects to Get Mediator
  With a valid reason for attending
  With all general exemptions
  But no valid reasons
  But accessing a mediator with no valid reason
  Not error message testing,
  Not accessibility Testing @regression`, async ({ page }): Promise<void> => {
    await C100.getMediatorJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM, redirects to Get Mediator
  With a valid reason for attending
  With all general exemptions
  But no valid reasons
  But accessing a mediator with no valid reason
  error message testing,
  Not accessibility Testing @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100.getMediatorJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM. Redirect to Get Mediator
  With no valid reason for attending
  error message testing,
  Not accessibility Testing @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100.getMediatorJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
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
  test(`MIAM testing  with no previously attended MIAM, Redirects to Get Mediator
    With a valid reason for attending
    With all general exemptions
    But no valid reasons
    But accessing a mediator with no valid reason
    not error message testing,
    accessibility Testing
    @accessibility @smoke @nightly`, async ({ page }): Promise<void> => {
    await C100.getMediatorJourney({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });
});
