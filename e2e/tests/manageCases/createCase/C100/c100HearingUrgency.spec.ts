import { test } from "@playwright/test";
import Config from "../../../../config";
import { C100HearingUrgency } from "../../../../journeys/manageCases/createCase/C100HearingUrgency/C100HearingUrgency";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case as a solicitor - hearing urgency tests", (): void => {
  test(`Complete the C100 hearing urgency event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @regression`, async ({ page }): Promise<void> => {
    await C100HearingUrgency.c100HearingUrgency({
      page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoHearingUrgency: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 hearing urgency event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options, @regression`, async ({ page }): Promise<void> => {
    await C100HearingUrgency.c100HearingUrgency({
      page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      yesNoHearingUrgency: false,
      subJourney: true,
    });
  });

  test(`Complete the C100 hearing urgency event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100HearingUrgency.c100HearingUrgency({
      page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: true,
      yesNoHearingUrgency: true,
      subJourney: true,
    });
  });
});

test(`C100 hearing urgency event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100HearingUrgency.c100HearingUrgency({
    page,
    user: "solicitor",
    accessibilityTest: true,
    errorMessaging: false,
    yesNoHearingUrgency: true,
    subJourney: true,
  });
});
