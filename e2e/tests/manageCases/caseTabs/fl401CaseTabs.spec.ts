import { test } from "@playwright/test";
import Config from "../../../config";
import { FL401CaseTabs } from "../../../journeys/manageCases/caseTabs/fl401CaseTabs";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("FL401 Case tabs", (): void => {
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
      accessibilityTest: false,
      applicantLivesInRefuge: true,
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
      accessibilityTest: false,
      applicantLivesInRefuge: false,
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
    accessibilityTest: true,
    applicantLivesInRefuge: true,
  });
});
