import { test } from "@playwright/test";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "citizen.json" });

test.describe("C100 Citizen Application tests on the third MIRO set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test(`Test the third row of the third row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    No Screening and Written Review
    Legal Representation: yes
    Court Permission Needed: no,
    miam already attended: yes,
    miam valid reason no attendance: false
    urgency and without notice: yes`, async ({ page }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: true,
      miamValidReasonNoAttendance: false // Redundant for this journey
    });
  });

    test(`Test the third row of the third row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    No Screening and Written Review
    Legal Representation: yes
    Court Permission Needed: no,
    miam already attended: false,
    miam valid reason no attendance: false
    urgency and without notice: yes`, async ({ page }): Promise<void> => {
      await C100.c100ThirdMiroJourney({
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
        c100LegalRepresentation: true,
        c100CourtPermissionNeeded: false,
        urgencyAndWithoutNoticeAllOptionsYes: true,
        miamAlreadyAttended: false,
        miamValidReasonNoAttendance: true
      });
  });

  test(`Test the third row of the third row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Error Messaging,
    No Screening and Written Review
    Legal Representation: yes
    Court Permission Needed: no,
    miam already attended: yes,
    miam valid reason no attendance: false
    urgency and without notice: yes`, async ({ page }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: true,
      miamValidReasonNoAttendance: false // Redundant for this journey
    });
  });

  test(`Test the third row of the third row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Error Messaging,
    No Screening and Written Review
    Legal Representation: yes
    Court Permission Needed: no,
    miam already attended: false,
    miam valid reason no attendance: true
    urgency and without notice: yes`, async ({ page }): Promise<void> => {
      await C100.c100ThirdMiroJourney({
        page: page,
        accessibilityTest: false,
        errorMessaging: true,
        c100LegalRepresentation: true,
        c100CourtPermissionNeeded: false,
        urgencyAndWithoutNoticeAllOptionsYes: true,
        miamAlreadyAttended: false,
        miamValidReasonNoAttendance: true
      });
    });
});

test.describe("C100 Citizen Application accessibility tests on the third row journey set. @accessibilityCitizenFrontend", (): void => {
  test(`Test the third row of the third row c100 citizen journey with the following options:
    Accessibility Testing,
    Not Error Messaging,
    miam already attended: yes,
    miam valid reason no attendance: false
    urgency and without notice: yes`, async ({ page }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: true,
      miamValidReasonNoAttendance: false // Redundant for this journey
    });
  });

  test(`Test the third row of the third row c100 citizen journey with the following options:
    Accessibility Testing,
    Not Error Messaging,
    miam already attended: false,
    miam valid reason no attendance: true
    urgency and without notice: yes`, async ({ page }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      miamValidReasonNoAttendance: true
    });
  });
});