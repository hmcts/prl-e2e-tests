import { test } from "@playwright/test";
import Config from "../../../../config";
import { WithdrawApplication } from "../../../../journeys/manageCases/caseProgression/withdrawApplication/withdrawApplication.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Withdraw C100 (solicitor created) application event as a solicitor", () => {
  test(`Complete withdraw application event and select yes to successfully withdraw the application. With accessibility test. @nightly @accessibility @regression`, async ({
    page,
  }): Promise<void> => {
    await WithdrawApplication.withdrawApplication({
      page,
      accessibilityTest: true,
      withdrawApplication: true,
    });
  });
  test(`Complete withdraw application event and do not withdraw application. @regression`, async ({
    page,
  }): Promise<void> => {
    await WithdrawApplication.withdrawApplication({
      page,
      accessibilityTest: false,
      withdrawApplication: false,
    });
  });
});
