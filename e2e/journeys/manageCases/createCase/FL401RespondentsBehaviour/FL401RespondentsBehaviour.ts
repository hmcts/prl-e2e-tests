import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { RespondentsBehaviourPage } from "../../../../pages/manageCases/createCase/FL401/respondentsBehaviour/respondentsBehaviourPage";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { RespondentsBehaviourSubmitPage } from "../../../../pages/manageCases/createCase/FL401/respondentsBehaviour/respondentsBehaviourSubmitPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";

interface fl401RespondentsBehaviourOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  respondentsBehaviourAllOptionsYes: boolean;
  subJourney: boolean;
}

export class FL401RespondentsBehaviour {
  public static async fl401RespondentsBehaviour({
    page,
    accessibilityTest,
    errorMessaging,
    respondentsBehaviourAllOptionsYes,
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
    await Helpers.selectSolicitorEvent(page, "Respondent's behaviour");
    await RespondentsBehaviourPage.respondentsBehaviourPage(
      page,
      errorMessaging,
      accessibilityTest,
      respondentsBehaviourAllOptionsYes,
    );
    // await RespondentsBehaviourSubmitPage.respondentsBehaviourSubmitPage(
    //   page,
    //   accessibilityTest,
    //   respondentsBehaviourAllOptionsYes,
    // );
    // await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
