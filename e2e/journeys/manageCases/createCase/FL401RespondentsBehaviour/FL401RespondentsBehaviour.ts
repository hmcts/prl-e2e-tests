import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { RespondentsBehaviourPage } from "../../../../pages/manageCases/createCase/FL401/respondentsBehaviour/respondentsBehaviourPage.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";
import { RespondentsBehaviourSubmitPage } from "../../../../pages/manageCases/createCase/FL401/respondentsBehaviour/respondentsBehaviourSubmitPage.ts";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";

interface fl401RespondentsBehaviourOptions {
  page: Page;
  accessibilityTest: boolean;
  subJourney: boolean;
}

export class FL401RespondentsBehaviour {
  public static async fl401RespondentsBehaviour({
    page,
    accessibilityTest,
    subJourney,
  }: fl401RespondentsBehaviourOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
    }
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
