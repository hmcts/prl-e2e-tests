import { test } from "@playwright/test";
import { Fl401AttendingTheHearing } from "../../../../journeys/manageCases/createCase/FL401AttendingTheHearing/fl401AttendingTheHearing";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("FL401 Create case respondent’s behaviour tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "FL401",
    });
  });
  test(`FL401 Attending The Hearing Journey with the following options:
  Not Accessibility testing,
  Not error Messaging,
  No to All Options, @regression`, async ({ page }): Promise<void> => {
    await Fl401AttendingTheHearing.fl401AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401AttendingTheHearingYesNo: false,
    });
  });

  test(`FL401 Attending The Hearing Journey with the following options:
  Not Accessibility testing,
  Not error Messaging,
  Yes to All Options @regression`, async ({ page }): Promise<void> => {
    await Fl401AttendingTheHearing.fl401AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401AttendingTheHearingYesNo: true,
    });
  });

  test(`FL401 Attending The Hearing Journey with the following options:
  Not Accessibility testing,
  Yes error Messaging,
  Yes to All Options, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await Fl401AttendingTheHearing.fl401AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      fl401AttendingTheHearingYesNo: true,
    });
  });

  test(`FL401 Attending The Hearing Journey with the following options:
    Accessibility testing,
    No error Messaging,
    Yes to All Options, @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await Fl401AttendingTheHearing.fl401AttendingTheHearing({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      fl401AttendingTheHearingYesNo: true,
    });
  });
});
