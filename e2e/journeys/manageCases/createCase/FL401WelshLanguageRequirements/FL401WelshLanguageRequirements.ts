import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { WelshLanguageRequirementsPage } from "../../../../pages/manageCases/createCase/FL401/welshLanguageRequirements/welshLanguageRequirementsPage.ts";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";
import { WelshLanguageRequirementsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/welshLanguageRequirements/welshLanguageRequirementsSubmitPage.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";

interface fl401WelshLanguageRequirementsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  welshLanguageRequirementsAllOptionsYes: boolean;
  welshLanguageRequirementsSelectWelsh?: boolean;
  subJourney: boolean;
}

export class FL401WelshLanguageRequirements {
  public static async fl401WelshLanguageRequirements({
    page,
    accessibilityTest,
    errorMessaging,
    welshLanguageRequirementsAllOptionsYes,
    welshLanguageRequirementsSelectWelsh,
    subJourney,
  }: fl401WelshLanguageRequirementsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(
      page,
      "Welsh language requirements",
    );
    await WelshLanguageRequirementsPage.welshLanguageRequirementsPage(
      page,
      errorMessaging,
      accessibilityTest,
      welshLanguageRequirementsAllOptionsYes,
      welshLanguageRequirementsSelectWelsh,
    );
    await WelshLanguageRequirementsSubmitPage.welshLanguageRequirementsSubmitPage(
      page,
      accessibilityTest,
      welshLanguageRequirementsAllOptionsYes,
      welshLanguageRequirementsSelectWelsh,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
