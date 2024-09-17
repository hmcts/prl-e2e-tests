import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { RespondentDetailsPage } from "../../../../pages/manageCases/createCase/FL401/respondentDetails/respondentDetailsPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import { RespondentDetailsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/respondentDetails/respondentDetailsSubmitPage";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";

interface fl401RespondentDetailsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  respondentDetailsAllOptionsYes: boolean;
  subJourney: boolean;
}

export class FL401RespondentDetails {
  public static async fl401RespondentDetails({
    page,
    accessibilityTest,
    errorMessaging,
    respondentDetailsAllOptionsYes,
    subJourney,
  }: fl401RespondentDetailsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
    }
    await Helpers.selectSolicitorEvent(page, "Respondent details");
    await RespondentDetailsPage.respondentDetailsPage(
      page,
      errorMessaging,
      accessibilityTest,
      respondentDetailsAllOptionsYes,
    );
    await RespondentDetailsSubmitPage.respondentDetailsSubmitPage(
      page,
      accessibilityTest,
      respondentDetailsAllOptionsYes,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
