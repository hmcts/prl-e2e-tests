import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { ViewPDFApplicationSubmitPage } from "../../../../pages/manageCases/createCase/Common/viewPDFApplication/viewPDFApplicationSubmitPage.js";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.js";
import { NavigationUtils } from "../../../../utils/navigation.utils.js";
import { ViewPDFApplicationPage } from "../../../../pages/manageCases/createCase/Common/viewPDFApplication/viewPDFApplicationPage.js";

interface C100ViewPDFApplicationOptions {
  page: Page;
  navigationUtils: NavigationUtils;
  caseNumber: string;
  accessibilityTest: boolean;
}

export class C100ViewPDFApplication {
  public static async c100ViewPDFApplication({
    page,
    navigationUtils,
    caseNumber,
    accessibilityTest,
  }: C100ViewPDFApplicationOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "View PDF application");
    await ViewPDFApplicationPage.viewPDFApplicationPage(
      page,
      navigationUtils,
      caseNumber,
      "C100",
      accessibilityTest,
    );
    await ViewPDFApplicationSubmitPage.viewPDFApplicationSubmitPage(
      page,
      accessibilityTest,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
