import { Browser, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../common/types";
import { DummyPaymentAwp } from "../caseProgression/dummyPayment/dummyPaymentAwp";
import { FL401SummaryTabPage } from "../../../pages/manageCases/caseTabs/FL401/fl401SummaryTabPage";
import { Helpers } from "../../../common/helpers";
import Config from "../../../config";
import { FL401ConfidentialDetailsTabPage } from "../../../pages/manageCases/caseTabs/FL401/fl401ConfidentialDetailsTabPage";

interface FL401CaseTabsParams {
  page: Page;
  browser: Browser;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  paymentStatusPaid: boolean;
  caseType: solicitorCaseCreateType;
  applicantLivesInRefuge: boolean;
  otherPersonLivesInRefuge: boolean;
}

export class FL401CaseTabs {
  public static async fl401CaseTabs({
    page,
    browser,
    errorMessaging,
    accessibilityTest,
    paymentStatusPaid,
    caseType,
    applicantLivesInRefuge,
    otherPersonLivesInRefuge,
  }: FL401CaseTabsParams): Promise<void> {
    const caseRef = await DummyPaymentAwp.dummyPaymentAwp({
      page: page,
      errorMessaging: errorMessaging,
      accessibilityTest: accessibilityTest,
      paymentStatusPaid: paymentStatusPaid,
      caseType: caseType,
      applicantLivesInRefuge: applicantLivesInRefuge,
      otherPersonLivesInRefuge: otherPersonLivesInRefuge,
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
      accessibilityTest,
      applicantLivesInRefuge,
    );
    await FL401ConfidentialDetailsTabPage.fl401ConfidentialDetailsTabPage(
      courtAdminPage,
      accessibilityTest,
      applicantLivesInRefuge,
    );
  }
}
