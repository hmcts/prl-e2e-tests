import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { RespondentDetailsPage } from "../../../../pages/manageCases/createCase/FL401/respondentDetails/respondentDetailsPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import { RespondentDetailsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/respondentDetails/respondentDetailsSubmitPage";

export class FL401RespondentDetails {
  public static async fl401RespondentDetails(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    allOptionsYes: boolean,
  ): Promise<void> {
    await Helpers.selectSolicitorEvent(page, "Respondent details");
    await RespondentDetailsPage.respondentDetailsPage(
      page,
      errorMessaging,
      accessibilityTest,
      allOptionsYes,
    );
    await RespondentDetailsSubmitPage.respondentDetailsSubmitPage(
      page,
      accessibilityTest,
      allOptionsYes,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
