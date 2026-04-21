import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AttendingTheHearing1Page } from "../../../../pages/manageCases/createCase/Common/attendingTheHearing/attendingTheHearing1Page.ts";
import { AttendingTheHearingSubmitPage } from "../../../../pages/manageCases/createCase/Common/attendingTheHearing/attendingTheHearingSubmitPage.ts";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";

interface C100AttendingTheHearingOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100AttendingTheHearingYesNo: boolean;
  subJourney: boolean;
}

export class C100AttendingTheHearing {
  public static async c100AttendingTheHearing({
    page,
    accessibilityTest,
    errorMessaging,
    c100AttendingTheHearingYesNo,
    subJourney,
  }: C100AttendingTheHearingOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(page, "Attending the hearing");
    await AttendingTheHearing1Page.attendingTheHearing1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      attendingTheHearingYesNo: c100AttendingTheHearingYesNo,
      caseType: "C100",
    });
    await AttendingTheHearingSubmitPage.attendingTheHearingSubmitPage({
      page: page,
      accessibilityTest: accessibilityTest,
      attendingTheHearingYesNo: c100AttendingTheHearingYesNo,
      caseType: "C100",
    });
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
