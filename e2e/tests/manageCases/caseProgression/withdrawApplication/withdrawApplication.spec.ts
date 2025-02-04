import { test } from "@playwright/test";
import Config from "../../../../config";
import { WithdrawApplication } from "../../../../journeys/manageCases/caseProgression/withdrawApplication/withdrawApplication.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Withdraw application event as a solicitor", () => {
  test(`Complete withdraw application event and select yes to successfully withdraw with accessibility test. @nightly @accessibility @regression`, async ({
    page,
  }): Promise<void> => {
    await WithdrawApplication.withdrawApplication({
      page,
      accessibilityTest: true,
      applicantLivesInRefuge: false,
      otherPersonLivesInRefuge: false,
      withdrawApplication: true,
    });
  });
  test(`Complete withdraw application event and select no to successfully withdraw with accessibility test. @nightly @accessibility @regression`, async ({
    page,
  }): Promise<void> => {
    await WithdrawApplication.withdrawApplication({
      page,
      accessibilityTest: true,
      applicantLivesInRefuge: false,
      otherPersonLivesInRefuge: false,
      withdrawApplication: false,
    });
  });
});
