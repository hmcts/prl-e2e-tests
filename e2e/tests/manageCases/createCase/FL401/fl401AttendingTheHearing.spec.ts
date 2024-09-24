import { test } from "@playwright/test";
import {
  Fl401AttendingTheHearing
} from "../../../../journeys/manageCases/createCase/FL401AttendingTheHearing/fl401AttendingTheHearing";

test.describe("FL401 Create case respondent’s behaviour tests @manageCases", (): void => {
  test(`Test the FL401 Attending The Hearing Journey with the following options:
  Not Accessibility testing,
  Not error Messaging,
  No to All Options, @crossbrowserManageCases`, async({page}): Promise<void> => {
    await Fl401AttendingTheHearing.fl401AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      fl401AttendingTheHearingYesNo: false,
      subJourney: true
    })
  });

  test(`Test the FL401 Attending The Hearing Journey with the following options:
  Not Accessibility testing,
  Yes error Messaging,
  No to All Options, @crossbrowserManageCases`, async({page}): Promise<void> => {
    await Fl401AttendingTheHearing.fl401AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      fl401AttendingTheHearingYesNo: false,
      subJourney: true
    })
  });
})