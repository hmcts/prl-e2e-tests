import { test } from "@playwright/test";
import Config from "../../../config";
import { C100CaseTabs } from "../../../journeys/manageCases/caseTabs/c100CaseTabs";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Case tabs as a court admin for solicitor created CA case", (): void => {
  test(`C100 Case tabs with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying Yes to applicant lives in refuge,
  Saying No to other person lives in refuge,
  Payment status paid. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await C100CaseTabs.c100CaseTabs({
      page: page,
      browser: browser,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "C100",
      applicantLivesInRefuge: true,
      otherPersonLivesInRefuge: false,
    });
  });

  test(`C100 Case tabs with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying No to applicant lives in refuge,
  Saying No to other person lives in refuge,
  Payment status paid. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await C100CaseTabs.c100CaseTabs({
      page: page,
      browser: browser,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "C100",
      applicantLivesInRefuge: false,
      otherPersonLivesInRefuge: false,
    });
  });
});

test(`C100 Case tabs with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying Yes to applicant lives in refuge,
  Saying No to other person lives in refuge,
  Payment status paid. @accessibility @nightly`, async ({
  page,
  browser,
}): Promise<void> => {
  await C100CaseTabs.c100CaseTabs({
    page: page,
    browser: browser,
    errorMessaging: false,
    accessibilityTest: true,
    paymentStatusPaid: true,
    caseType: "C100",
    applicantLivesInRefuge: true,
    otherPersonLivesInRefuge: false,
  });
});
