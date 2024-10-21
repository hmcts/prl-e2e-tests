import { test } from "@playwright/test";

import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100";

test.use({ storageState: Config.sessionStoragePath + "citizen.json" });

test.describe("C100 Citizen Application tests on the top MIRO set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test(`Test the C100 of the citizen journey with the following options:
  Not Accessibility Testing,
  Not Error Messaging,
  Yes Screening and Written Review
  With urgency and without notice options`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: true,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      c100PeopleGender: "male",
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
      urgencyAndWithoutNoticeAllOptionsYes: false,
      c100PeopleGender: "female",
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
      urgencyAndWithoutNoticeAllOptionsYes: true,
      c100PeopleGender: "other",
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
    urgencyAndWithoutNoticeAllOptionsYes: true,
    c100PeopleGender: "other",
  });
});
