import { Browser, Page } from "@playwright/test";
import { FL401SummaryTabPage } from "../../../pages/manageCases/caseTabs/FL401/fl401SummaryTabPage";
import { Helpers } from "../../../common/helpers";
import Config from "../../../config";
import { FL401ConfidentialDetailsTabPage } from "../../../pages/manageCases/caseTabs/FL401/fl401ConfidentialDetailsTabPage";
import { DummyFL401 } from "../createCase/dummyCase/dummyFL401.ts";

interface FL401CaseTabsParams {
  page: Page;
  browser: Browser;
  courtIsListed: boolean;
  accessibilityTest: boolean;
  applicantLivesInRefuge: boolean;
}

export class FL401CaseTabs {
  public static async fl401CaseTabs({
    page,
    browser,
    courtIsListed,
    accessibilityTest,
    applicantLivesInRefuge,
  }: FL401CaseTabsParams): Promise<void> {
    const caseRef = await DummyFL401.dummyFL401({
      page: page,
      applicantLivesInRefuge: applicantLivesInRefuge,
    });

    const courtAdminPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );

    await Helpers.goToCase(
      courtAdminPage,
      Config.manageCasesBaseURL,
      caseRef,
      "Summary",
    );

    await FL401SummaryTabPage.fl401SummaryTabPage(
      courtAdminPage,
      courtIsListed,
      accessibilityTest,
      applicantLivesInRefuge,
    );

    await FL401ConfidentialDetailsTabPage.fl401ConfidentialDetailsTabPageC8Refuge(
      courtAdminPage,
      accessibilityTest,
      applicantLivesInRefuge,
    );
  }
}
