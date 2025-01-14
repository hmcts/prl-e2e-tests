import { Browser, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../common/types";
import { DummyPaymentAwp } from "../caseWorker/dummyPayment/dummyPaymentAwp";
import { C100SummaryTabPage } from "../../../pages/manageCases/caseTabs/C100/c100SummaryTabPage";
import { Helpers } from "../../../common/helpers";
import Config from "../../../config";
import { C100ConfidentialDetailsTabPage } from "../../../pages/manageCases/caseTabs/C100/c100ConfidentialDetailsTabPage";

interface C100CaseTabsParams {
  page: Page;
  browser: Browser;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  paymentStatusPaid: boolean;
  caseType: solicitorCaseCreateType;
  applicantLivesInRefuge: boolean;
  otherPersonLivesInRefuge: boolean;
}

export class C100CaseTabs {
  public static async c100CaseTabs({
    page,
    browser,
    errorMessaging,
    accessibilityTest,
    paymentStatusPaid,
    caseType,
    applicantLivesInRefuge,
    otherPersonLivesInRefuge,
  }: C100CaseTabsParams): Promise<void> {
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
