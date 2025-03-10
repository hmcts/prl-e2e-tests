import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { AttendingTheHearing1Page } from "../../../../pages/manageCases/createCase/Common/attendingTheHearing/attendingTheHearing1Page";
import { AttendingTheHearingSubmitPage } from "../../../../pages/manageCases/createCase/Common/attendingTheHearing/attendingTheHearingSubmitPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";

interface Fl401AttendingTheHearingOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  fl401AttendingTheHearingYesNo: boolean;
}

export class Fl401AttendingTheHearing {
  public static async fl401AttendingTheHearing({
    page,
    accessibilityTest,
    errorMessaging,
    fl401AttendingTheHearingYesNo,
  }: Fl401AttendingTheHearingOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Attending the hearing");
    await AttendingTheHearing1Page.attendingTheHearing1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      attendingTheHearingYesNo: fl401AttendingTheHearingYesNo,
      caseType: "FL401",
    });
    await AttendingTheHearingSubmitPage.attendingTheHearingSubmitPage({
      page: page,
      accessibilityTest: accessibilityTest,
      attendingTheHearingYesNo: fl401AttendingTheHearingYesNo,
    });
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
