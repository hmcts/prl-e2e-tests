import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { HearingUrgency1Page } from "../../../../pages/manageCases/createCase/C100/hearingUrgency/hearingUrgency1Page.ts";
import { C100HearingUrgencySubmitPage } from "../../../../pages/manageCases/createCase/C100/hearingUrgency/c100HearingUrgencySubmitPage.ts";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";

interface c100HearingUrgencyOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoHearingUrgency: boolean;
  subJourney: boolean;
}

export class C100HearingUrgency {
  public static async c100HearingUrgency({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    yesNoHearingUrgency,
    subJourney,
  }: c100HearingUrgencyOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(page, "Hearing urgency");
    await HearingUrgency1Page.hearingUrgency1Page(
      page,
      accessibilityTest,
      errorMessaging,
      yesNoHearingUrgency,
    );
    await C100HearingUrgencySubmitPage.C100HearingUrgencySubmitPage(
      page,
      accessibilityTest,
      yesNoHearingUrgency,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
