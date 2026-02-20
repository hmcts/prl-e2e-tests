import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { ViewPDFApplicationPage } from "../../../../pages/manageCases/createCase/FL401/viewPDFApplication/viewPDFApplicationPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import { ViewPDFApplicationSubmitPage } from "../../../../pages/manageCases/createCase/FL401/viewPDFApplication/viewPDFApplicationSubmitPage";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { ViewPdfTestCases } from "../../../../common/types";

interface fl401ViewPDFApplicationOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  viewPdfTestCases: ViewPdfTestCases;
  subJourney: boolean;
}

export class FL401ViewPDFApplication {
  public static async fl401ViewPDFApplication({
    page,
    accessibilityTest,
    // errorMessaging,
    // viewPdfTestCases,
    subJourney,
  }: fl401ViewPDFApplicationOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(page, "View PDF application");
    await ViewPDFApplicationPage.viewPDFApplicationPage(
      page,
      // errorMessaging,
      // accessibilityTest,
      // viewPdfTestCases,
    );
    await ViewPDFApplicationSubmitPage.viewPDFApplicationSubmitPage(
      page,
      accessibilityTest,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
