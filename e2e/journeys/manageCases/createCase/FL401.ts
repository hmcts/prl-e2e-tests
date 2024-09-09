import { solicitorCaseCreateType, UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { RespondentDetailsPage } from "../../../pages/manageCases/createCase/FL401/respondentDetails/respondentDetailsPage";
import { Fl401TasksTabPage } from "../../../pages/manageCases/caseTabs/fl401TasksTabPage";

export class FL401 {
  public static async fl401(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    solicitorCaseType: solicitorCaseCreateType,
    errorMessaging: boolean,
    allOptionsYes: boolean,
  ): Promise<void> {
    await SolicitorCreateInitial.createInitialCase(
      page,
      user,
      false,
      solicitorCaseType,
      false,
    );

    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);

    await this.navigateToEvent(page, "Respondent details");

    await RespondentDetailsPage.respondentDetailsPage(
      page,
      errorMessaging,
      accessibilityTest,
      allOptionsYes,
    );
  }

  private static async navigateToEvent(
    page: Page,
    linkText: string,
  ): Promise<void> {
    let linkSelector = `a:text-is("${linkText}")`;
    await page.click(linkSelector);
  }
}
