import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { DeleteApplication } from "../../../../journeys/manageCases/caseProgression/deleteApplication/deleteApplication.ts";
import config from "../../../../utils/config.utils.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Delete DA(FL401) application tests in draft state", (): void => {
  test(`Delete FL401 drafted case as a solicitor with the following options:
  Case: FL401,
  Accessibility testing: yes.
  @nightly @accessibility`, async ({ page }): Promise<void> => {
    await page.goto(config.manageCasesBaseURLCase);
    await DeleteApplication.deleteApplication({
      page: page,
      caseType: "FL401",
      accessibilityTest: true,
      errorMessaging: false,
    });
  });
});
