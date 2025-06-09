import { Browser, Page } from "@playwright/test";
import { C100SummaryTabPage } from "../../../pages/manageCases/caseTabs/C100/c100SummaryTabPage.ts";
import { Helpers } from "../../../common/helpers.ts";
import Config from "../../../utils/config.utils.ts";
import { C100ConfidentialDetailsTabPage } from "../../../pages/manageCases/caseTabs/C100/c100ConfidentialDetailsTabPage.ts";
import { DummyC100 } from "../createCase/dummyCase/dummyC100.ts";

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
    const caseRef = await DummyC100.dummyC100({
      page: page,
      applicantLivesInRefuge: applicantLivesInRefuge,
      otherPersonLivesInRefuge: otherPersonLivesInRefuge,
    });
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
