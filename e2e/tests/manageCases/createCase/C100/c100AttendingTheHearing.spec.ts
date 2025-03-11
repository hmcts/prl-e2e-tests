import { test } from "@playwright/test";
import { C100AttendingTheHearing } from "../../../../journeys/manageCases/createCase/C100AttendingTheHearing/c100AttendingTheHearing";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("C100 Create case respondent’s behaviour tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
  });

  test(`C100 Attending The Hearing Journey with the following options:
  Not Accessibility testing,
  Not error Messaging,
  No to All Options, @regression`, async ({ page }): Promise<void> => {
    await C100AttendingTheHearing.c100AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100AttendingTheHearingYesNo: false,
    });
  });

  test(`C100 Attending The Hearing Journey with the following options:
  Not Accessibility testing,
  Not error Messaging,
  Yes to All Options @regression`, async ({ page }): Promise<void> => {
    await C100AttendingTheHearing.c100AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100AttendingTheHearingYesNo: true,
    });
  });

  test(`C100 Attending The Hearing Journey with the following options:
  Not Accessibility testing,
  Yes error Messaging,
  Yes to All Options, @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100AttendingTheHearing.c100AttendingTheHearing({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100AttendingTheHearingYesNo: true,
    });
    });

  test(`C100 Attending The Hearing Journey with the following options:
    Accessibility testing,
    No error Messaging,
    Yes to All Options, @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100AttendingTheHearing.c100AttendingTheHearing({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100AttendingTheHearingYesNo: true,
    });
  });
});