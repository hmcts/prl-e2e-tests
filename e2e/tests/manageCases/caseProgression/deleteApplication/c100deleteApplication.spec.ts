import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { DeleteApplication } from "../../../../journeys/manageCases/caseProgression/deleteApplication/deleteApplication.ts";
import config from "../../../../utils/config.utils.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor_idam.json" });

test.describe("Delete CA(C100) application tests in draft state", (): void => {
  test(`Delete C100 drafted case as a solicitor with the following options:
  Case: C100,
  Accessibility testing: yes. 
  @nightly @accessibility`, async ({ page }): Promise<void> => {
    await page.goto(config.manageCasesBaseURLCase);
    await DeleteApplication.deleteApplication({
      page: page,
      caseType: "C100",
      accessibilityTest: true,
      errorMessaging: false,
    });
  });
});
