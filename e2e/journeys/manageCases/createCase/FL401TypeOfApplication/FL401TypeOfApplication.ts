import { Helpers } from "../../../../common/helpers.ts";
import { TypeOfApplication1Page } from "../../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplication1Page.ts";
import { TypeOfApplication2Page } from "../../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplication2Page.ts";
import { TypeOfApplicationSubmitPage } from "../../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplicationSubmitPage.ts";
import { Page } from "@playwright/test";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";

interface fl401TypeOfApplicationOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  isLinkedToC100: boolean;
  subJourney: boolean;
}

export class FL401TypeOfApplication {
  public static async fl401TypeOfApplication({
    page,
    accessibilityTest,
    errorMessaging,
    isLinkedToC100,
    subJourney,
  }: fl401TypeOfApplicationOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(page, "Type of application");
    await TypeOfApplication1Page.typeOfApplication1Page(
      page,
      errorMessaging,
      accessibilityTest,
    );
    await TypeOfApplication2Page.typeOfApplication2Page(
      page,
      errorMessaging,
      accessibilityTest,
      isLinkedToC100,
    );
    await TypeOfApplicationSubmitPage.typeOfApplicationSubmitPage(
      page,
      isLinkedToC100,
      accessibilityTest,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
