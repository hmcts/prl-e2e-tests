import { test } from "@playwright/test";

import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100";

test.use({ storageState: Config.sessionStoragePath + "citizen.json" });

test.describe("C100 Citizen Application tests on the MIAM set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  No Screening and Written Review
  Children involved in other proceedings
  With urgency and without notice options`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      MIAMChildrenInvolvedOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      MIAMValidReasonNoAttendance: false,
      MiamGeneralExemptions: false,
      MiamDomesticAbuse: false,
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  No Screening and Written Review
  Children not involved in other proceedings
  With urgency and without notice options
  With a Miam already attended
  And a document not signed by the mediator`, async ({
    page,
  }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      MIAMChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: true,
      documentSignedByMediator: false,
      MIAMValidReasonNoAttendance: false,
      MiamGeneralExemptions: false,
      MiamDomesticAbuse: false,
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  No Screening and Written Review
  Children not involved in other proceedings
  With urgency and without notice options
  With a Miam already attended
  And a document signed by the mediator`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      MIAMChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: true,
      documentSignedByMediator: true,
      MIAMValidReasonNoAttendance: false,
      MiamGeneralExemptions: false,
      MiamDomesticAbuse: false,
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  No Screening and Written Review
  Children not involved in other proceedings
  Without urgency and without notice options
  Without a Miam already attended
  With a valid reason for not attending
  And Selecting valid general reasons
  And selecting valid domestic abuse reasons`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      MIAMChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: false,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      MIAMValidReasonNoAttendance: true,
      MiamGeneralExemptions: true,
      MiamDomesticAbuse: true,
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  No Screening and Written Review
  Children not involved in other proceedings
  Without urgency and without notice options
  Without a Miam already attended
  With a valid reason for not attending
  And Selecting invalid general reasons`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      MIAMChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: false,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      MIAMValidReasonNoAttendance: true,
      MiamGeneralExemptions: false,
      MiamDomesticAbuse: false,
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  No Screening and Written Review
  Children not involved in other proceedings
  Without urgency and without notice options
  Without a Miam already attended
  With a valid reason for not attending
  And Selecting valid general reasons
  And selecting invalid domestic abuse reasons`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      MIAMChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: false,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      MIAMValidReasonNoAttendance: true,
      MiamGeneralExemptions: true,
      MiamDomesticAbuse: false,
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  No Screening and Written Review
  Children not involved in other proceedings
  Without urgency and without notice options
  Without a Miam already attended
  Without a valid reason for not attending`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      MIAMChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: false,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      MIAMValidReasonNoAttendance: false,
      MiamGeneralExemptions: false,
      MiamDomesticAbuse: false,
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  Yes Screening and Written Review
  Without urgency and without notice options
  with no Miam already attended`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      MIAMChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: false,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      MIAMValidReasonNoAttendance: false,
      MiamGeneralExemptions: false,
      MiamDomesticAbuse: false,
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Error Messaging,
  No Screening and Written Review
  Children not involved in other proceedings
  With urgency and without notice options`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      MIAMChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      MIAMValidReasonNoAttendance: false,
      MiamGeneralExemptions: false,
      MiamDomesticAbuse: false,
    });
  });
});

test(`C100 Citizen Application tests on the top MIAM set. @accessibilityCitizenFrontend`, async ({
  page,
}): Promise<void> => {
  await C100.c100({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    c100ScreeningWrittenAgreementReview: false,
    c100LegalRepresentation: false,
    c100CourtPermissionNeeded: true,
    MIAMChildrenInvolvedOtherProceedings: false,
    urgencyAndWithoutNoticeAllOptionsYes: true,
    miamAlreadyAttended: false,
    documentSignedByMediator: false,
    MIAMValidReasonNoAttendance: false,
    MiamGeneralExemptions: false,
    MiamDomesticAbuse: false,
  });
});
