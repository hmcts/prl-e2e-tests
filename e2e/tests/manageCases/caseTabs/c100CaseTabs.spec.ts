import { test } from "@playwright/test";
import Config from "../../../config";
import { C100CaseTabs } from "../../../journeys/manageCases/caseTabs/c100CaseTabs";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Case tabs tests for solicitor created case as a court admin", (): void => {
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
      accessibilityTest: false,
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
      accessibilityTest: false,
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
    accessibilityTest: true,
    applicantLivesInRefuge: true,
    otherPersonLivesInRefuge: false,
  });
});
