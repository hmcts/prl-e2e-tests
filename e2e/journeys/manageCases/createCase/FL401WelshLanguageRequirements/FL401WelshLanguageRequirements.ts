import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { WelshLanguageRequirementsPage } from "../../../../pages/manageCases/createCase/FL401/welshLanguageRequirements/welshLanguageRequirementsPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import { WelshLanguageRequirementsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/welshLanguageRequirements/welshLanguageRequirementsSubmitPage";

interface fl401WelshLanguageRequirementsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  welshLanguageRequirementsAllOptionsYes: boolean;
  welshLanguageRequirementsSelectWelsh?: boolean;
}

export class FL401WelshLanguageRequirements {
  public static async fl401WelshLanguageRequirements({
    page,
    accessibilityTest,
    errorMessaging,
    welshLanguageRequirementsAllOptionsYes,
    welshLanguageRequirementsSelectWelsh,
  }: fl401WelshLanguageRequirementsOptions): Promise<void> {
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
