import { test } from "@playwright/test";
import Config from "../../../config";
import { FL401CaseTabs } from "../../../journeys/manageCases/caseTabs/fl401CaseTabs";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Case tabs as a court admin for solicitor created CA case", (): void => {
  test(`FL401 Case tabs with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying Yes to applicant lives in refuge,
  Payment status paid. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await FL401CaseTabs.fl401CaseTabs({
      page: page,
      browser: browser,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "FL401",
      applicantLivesInRefuge: true,
      otherPersonLivesInRefuge: false,
    });
  });

  test(`FL401 Case tabs with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying No to applicant lives in refuge,
  Payment status paid. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await FL401CaseTabs.fl401CaseTabs({
      page: page,
      browser: browser,
      errorMessaging: false,
      accessibilityTest: false,
      paymentStatusPaid: true,
      caseType: "FL401",
      applicantLivesInRefuge: false,
      otherPersonLivesInRefuge: false,
    });
  });
});

test(`FL401 Case tabs with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying Yes to applicant lives in refuge,
  Payment status paid. @accessibility @nightly`, async ({
  page,
  browser,
}): Promise<void> => {
  await FL401CaseTabs.fl401CaseTabs({
    page: page,
    browser: browser,
    errorMessaging: false,
    accessibilityTest: true,
    paymentStatusPaid: true,
    caseType: "FL401",
    applicantLivesInRefuge: true,
    otherPersonLivesInRefuge: false,
  });
});
