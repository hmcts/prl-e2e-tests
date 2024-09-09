import { UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { C100HearingUrgency } from "./C100HearingUrgency/C100HearingUrgency";
import { C100TasksTabPage } from "../../../pages/manageCases/caseTabs/c100TasksTabPage";

export class C100 {
  public static async c100(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    yesNo: boolean,
  ): Promise<void> {
    await SolicitorCreateInitial.createInitialCase(
      page,
      user,
      false,
      "C100",
      false,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
    await C100HearingUrgency.c100HearingUrgency(
      page,
      user,
      accessibilityTest,
      errorMessaging,
      yesNo,
    );
  }
}
