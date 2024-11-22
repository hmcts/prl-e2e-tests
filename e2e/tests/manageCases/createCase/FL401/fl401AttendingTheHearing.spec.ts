import { test } from "@playwright/test";
import { Fl401AttendingTheHearing } from "../../../../journeys/manageCases/createCase/FL401AttendingTheHearing/fl401AttendingTheHearing";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Create case respondent’s behaviour tests @manageCases", (): void => {
  test(`Test the FL401 Attending The Hearing Journey with the following options:
  Not Accessibility testing,
  Not error Messaging,
  No to All Options, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await Fl401AttendingTheHearing.fl401AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401AttendingTheHearingYesNo: false,
      subJourney: true,
    });
  });

  test(`Test the FL401 Attending The Hearing Journey with the following options:
  Not Accessibility testing,
  Not error Messaging,
  Yes to All Options`, async ({ page }): Promise<void> => {
    await Fl401AttendingTheHearing.fl401AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401AttendingTheHearingYesNo: true,
      subJourney: true,
    });
  });

  test(`Test the FL401 Attending The Hearing Journey with the following options:
  Not Accessibility testing,
  Yes error Messaging,
  Yes to All Options, @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await Fl401AttendingTheHearing.fl401AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401AttendingTheHearingYesNo: true,
      subJourney: true,
    });
  });
});

test(`Test the accessibility of the FL401 Attending The Hearing Journey, @accessibilityManageCases`, async ({
  page,
}): Promise<void> => {
  await Fl401AttendingTheHearing.fl401AttendingTheHearing({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    fl401AttendingTheHearingYesNo: true,
    subJourney: true,
  });
});
