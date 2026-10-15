import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { RespondentDetailsPage } from "../../../../pages/manageCases/createCase/FL401/respondentDetails/respondentDetailsPage.ts";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";
import { RespondentDetailsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/respondentDetails/respondentDetailsSubmitPage.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";

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
    await Helpers.handleEventBasedOnEnvironment(page, "Respondent details");
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
