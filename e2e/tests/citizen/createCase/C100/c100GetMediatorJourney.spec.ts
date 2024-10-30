import { APIRequestContext, test } from "@playwright/test";
import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import IdamLoginHelper from "../../../../common/idamLoginHelper";
import {
  getAccessToken,
  initializeAPIContext,
} from "../../../../common/idamCreateCitizenUserApiHelper";

test.describe("Create Citizen Application but you must get a mediator. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  let apiContext: APIRequestContext;
  let token: string;
  test.beforeAll(async () => {
    apiContext = await initializeAPIContext();
    token = await getAccessToken(apiContext);
  });
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
      token,
    );
  });
  test(`MIAM testing  with no previously attended MIAM. Redirect to Get Mediator
  With no valid reason for attending
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
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
  Not accessibility Testing`, async ({ page }): Promise<void> => {
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
  Not accessibility Testing`, async ({ page }): Promise<void> => {
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
  Not accessibility Testing`, async ({ page }): Promise<void> => {
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
  Not accessibility Testing`, async ({ page }): Promise<void> => {
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
  Not accessibility Testing`, async ({ page }): Promise<void> => {
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
    @accessibilityCitizenFrontend`, async ({ page }): Promise<void> => {
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
