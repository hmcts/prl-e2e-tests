import { test } from "@playwright/test";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "citizen.json" });

test.describe("C100 Citizen Application tests on the top MIRO set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test(`Test the C100 of the citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    Yes Screening and Written Review
    With urgency and without notice all options yes`, async ({ page }): Promise<void> => {
    await C100.c100TopMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
    });
  });

  test(`Test the C100 of the citizen journey with the following options:
    Not Accessibility Testing,
    Error Messaging,
    Yes Screening and Written Review
    With urgency and without notice all options yes`, async ({ page }): Promise<void> => {
    await C100.c100TopMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
    });
  });
});

test(`Test the C100 of the citizen journey with the following options:
    Accessibility Testing,
    Not Error Messaging,
    Yes Screening and Written Review
    With urgency and without notice all options yes
    @accessibilityCitizenFrontend`, async ({ page }): Promise<void> => {
  await C100.c100TopMiroJourney({
    page: page,
    accessibilityTest: false,
    errorMessaging: true,
    urgencyAndWithoutNoticeAllOptionsYes: true,
  });
});