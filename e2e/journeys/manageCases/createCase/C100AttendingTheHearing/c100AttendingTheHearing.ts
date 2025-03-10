import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { AttendingTheHearing1Page } from "../../../../pages/manageCases/createCase/Common/attendingTheHearing/attendingTheHearing1Page";
import { AttendingTheHearingSubmitPage } from "../../../../pages/manageCases/createCase/Common/attendingTheHearing/attendingTheHearingSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface C100AttendingTheHearingOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100AttendingTheHearingYesNo: boolean;
}

export class C100AttendingTheHearing {
  public static async c100AttendingTheHearing({
    page,
    accessibilityTest,
    errorMessaging,
    c100AttendingTheHearingYesNo,
  }: C100AttendingTheHearingOptions): Promise<void> {
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
    });
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
