import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import { HearingUrgency1Page } from "../../../../pages/manageCases/createCase/C100/hearingUrgency/hearingUrgency1Page";
import { C100HearingUrgencySubmitPage } from "../../../../pages/manageCases/createCase/C100/hearingUrgency/c100HearingUrgencySubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";

export class C100HearingUrgency {
  public static async c100HearingUrgency(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    yesNo: boolean,
    subJourney: boolean,
  ): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase(
        page,
        user,
        false,
        "C100",
        false,
      );
    }
    await Helpers.selectSolicitorEvent(page, "Hearing urgency");
    await HearingUrgency1Page.hearingUrgency1Page(
      page,
      accessibilityTest,
      errorMessaging,
      yesNo,
    );
    await C100HearingUrgencySubmitPage.C100HearingUrgencySubmitPage(
      page,
      accessibilityTest,
      yesNo,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
