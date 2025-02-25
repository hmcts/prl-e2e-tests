import { Browser, Page } from "@playwright/test";
import { C100SummaryTabPage } from "../../../pages/manageCases/caseTabs/C100/c100SummaryTabPage";
import { Helpers } from "../../../common/helpers";
import Config from "../../../config";
import { C100ConfidentialDetailsTabPage } from "../../../pages/manageCases/caseTabs/C100/c100ConfidentialDetailsTabPage";
import { SolicitorCACaseCreator } from "../../../common/solicitorCACaseCreator.ts";
import config from "../../../config.ts";

interface C100CaseTabsParams {
  page: Page;
  browser: Browser;
  accessibilityTest: boolean;
  applicantLivesInRefuge: boolean;
  otherPersonLivesInRefuge: boolean;
}

export class C100CaseTabs {
  public static async c100CaseTabs({
    page,
    browser,
    accessibilityTest,
    applicantLivesInRefuge,
    otherPersonLivesInRefuge,
  }: C100CaseTabsParams): Promise<void> {
    await page.goto(Config.manageCasesBaseURLCase);
    const caseRef: string =
      await SolicitorCACaseCreator.createCaseSubmitAndPay(page);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    const courtAdminPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(
      courtAdminPage,
      Config.manageCasesBaseURLCase,
      caseRef,
      "Summary",
    );
    await C100SummaryTabPage.c100SummaryTabPage(
      courtAdminPage,
      accessibilityTest,
      applicantLivesInRefuge,
      otherPersonLivesInRefuge,
    );
    await C100ConfidentialDetailsTabPage.c100ConfidentialDetailsTabPage(
      courtAdminPage,
      accessibilityTest,
      applicantLivesInRefuge,
      otherPersonLivesInRefuge,
    );
  }
}
