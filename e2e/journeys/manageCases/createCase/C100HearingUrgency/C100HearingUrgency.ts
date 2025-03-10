import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import { HearingUrgency1Page } from "../../../../pages/manageCases/createCase/C100/hearingUrgency/hearingUrgency1Page";
import { C100HearingUrgencySubmitPage } from "../../../../pages/manageCases/createCase/C100/hearingUrgency/c100HearingUrgencySubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";

interface c100HearingUrgencyOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoHearingUrgency: boolean;
}

export class C100HearingUrgency {
  public static async c100HearingUrgency({
    page,
    accessibilityTest,
    errorMessaging,
    yesNoHearingUrgency,
  }: c100HearingUrgencyOptions): Promise<void> {
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
