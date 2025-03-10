import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { RespondentsBehaviourPage } from "../../../../pages/manageCases/createCase/FL401/respondentsBehaviour/respondentsBehaviourPage";
import { RespondentsBehaviourSubmitPage } from "../../../../pages/manageCases/createCase/FL401/respondentsBehaviour/respondentsBehaviourSubmitPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";

interface fl401RespondentsBehaviourOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class FL401RespondentsBehaviour {
  public static async fl401RespondentsBehaviour({
    page,
    accessibilityTest,
  }: fl401RespondentsBehaviourOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Respondent's behaviour");
    await RespondentsBehaviourPage.respondentsBehaviourPage(
      page,
      accessibilityTest,
    );
    await RespondentsBehaviourSubmitPage.respondentsBehaviourSubmitPage(
      page,
      accessibilityTest,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
