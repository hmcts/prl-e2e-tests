import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { ViewPDFApplicationPage } from "../../../../pages/manageCases/createCase/Common/viewPDFApplication/viewPDFApplicationPage.ts";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";
import { ViewPDFApplicationSubmitPage } from "../../../../pages/manageCases/createCase/Common/viewPDFApplication/viewPDFApplicationSubmitPage.ts";
import { NavigationUtils } from "../../../../utils/navigation.utils.js";

interface fl401ViewPDFApplicationOptions {
  page: Page;
  navigationUtils: NavigationUtils;
  caseNumber: string;
  accessibilityTest: boolean;
}

export class FL401ViewPDFApplication {
  public static async fl401ViewPDFApplication({
    page,
    navigationUtils,
    caseNumber,
    accessibilityTest,
  }: fl401ViewPDFApplicationOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "View PDF application");
    await ViewPDFApplicationPage.viewPDFApplicationPage(
      page,
      navigationUtils,
      caseNumber,
      "FL401",
      accessibilityTest,
    );
    await ViewPDFApplicationSubmitPage.viewPDFApplicationSubmitPage(
      page,
      accessibilityTest,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
