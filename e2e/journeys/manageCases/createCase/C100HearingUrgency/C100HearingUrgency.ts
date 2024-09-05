import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import { HearingUrgency1Page } from "../../../../pages/manageCases/createCase/C100/hearingUrgency/hearingUrgency1Page";

export class C100HearingUrgency {
  public static async c100HearingUrgency(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    yesNo: boolean,
  ): Promise<void> {
    await Helpers.selectSolicitorEvent(page, "Hearing urgency");
    await HearingUrgency1Page.hearingUrgency1Page(
      page,
      accessibilityTest,
      errorMessaging,
      yesNo,
    );
  }
}
