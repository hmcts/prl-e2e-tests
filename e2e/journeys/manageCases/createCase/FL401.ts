import { UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { FL401TypeOfApplication } from "./FL401TypeOfApplication/FL401TypeOfApplication";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { Fl401TasksTabPage } from "../../../pages/manageCases/caseTabs/fl401TasksTabPage";

export class FL401 {
  public static async fl401(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    isLinkedToC100: boolean,
  ): Promise<void> {
    await SolicitorCreateInitial.createInitialCase(
      page,
      user,
      accessibilityTest,
      "FL401",
      errorMessaging,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
    await FL401TypeOfApplication.fl401TypeOfApplication(
      page,
      accessibilityTest,
      errorMessaging,
      isLinkedToC100
    );
  }
}
