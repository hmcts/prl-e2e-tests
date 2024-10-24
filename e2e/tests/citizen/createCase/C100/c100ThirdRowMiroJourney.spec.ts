import { test } from "@playwright/test";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "citizen.json" });

test.describe("C100 Citizen Application tests on the third MIRO set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test(`Test the third row of the third row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    No Screening and Written Review
    Legal Representation: no
    Court Permission Needed: no,
    urgency and without notice: no`, async ({ page }): Promise<void> => {
    await C100.c100ThirdMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false,
      urgencyAndWithoutNoticeAllOptionsYes: false
    });
  });

  test(`Test the third row of the third row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    No Screening and Written Review
    Legal Representation: no
    Court Permission Needed: no`, async ({ page }): Promise<void> => {
    await C100.c100thirdMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false
    });
  });

  test(`Test the third row of the third row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Yes Error Messaging,
    No Screening and Written Review
    Legal Representation: yes
    Court Permission Needed: yes`, async ({ page }): Promise<void> => {
    await C100.c100thirdMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: true
    });
  });
});

test(`Test the third row of the third row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    No Screening and Written Review
    Legal Representation: yes
    Court Permission Needed: yes,
    @accessibilityCitizenFrontend`, async ({ page }): Promise<void> => {
  await C100.c100thirdMiroJourney({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    c100LegalRepresentation: true,
    c100CourtPermissionNeeded: true
  });
});