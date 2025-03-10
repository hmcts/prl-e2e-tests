import { test } from "@playwright/test";
import { C100HearingUrgency } from "../../../../journeys/manageCases/createCase/C100HearingUrgency/C100HearingUrgency";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("C100 Create case hearing urgency tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
  });
  test(`Complete the C100 hearing urgency event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options, @regression`, async ({ page }): Promise<void> => {
    await C100HearingUrgency.c100HearingUrgency({
      page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoHearingUrgency: true,
    });
  });

  test(`Complete the C100 hearing urgency event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying no to all options, @regression`, async ({ page }): Promise<void> => {
    await C100HearingUrgency.c100HearingUrgency({
      page,
      accessibilityTest: false,
      errorMessaging: false,
      yesNoHearingUrgency: false,
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
      accessibilityTest: false,
      errorMessaging: true,
      yesNoHearingUrgency: true,
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
    accessibilityTest: true,
    errorMessaging: false,
    yesNoHearingUrgency: true,
  });
});
