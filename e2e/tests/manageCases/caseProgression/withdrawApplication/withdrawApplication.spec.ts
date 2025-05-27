import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { WithdrawApplication } from "../../../../journeys/manageCases/caseProgression/withdrawApplication/withdrawApplication.ts";
import config from "../../../../utils/config.utils.ts";
import { SolicitorCACaseCreator } from ".././../../../common/caseHelpers/solicitorCACaseCreator.ts";
import { Helpers } from "../../../../common/helpers.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Withdraw C100 (solicitor created) application event as a solicitor", () => {
  let caseRef: string;
  test.beforeEach(async ({ page }) => {
    await page.goto(config.manageCasesBaseURLCase);
    caseRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(page);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });
  test(`Complete withdraw application event and select yes to successfully withdraw the application. With accessibility test. @nightly @accessibility @regression`, async ({
    page,
  }): Promise<void> => {
    await WithdrawApplication.withdrawApplication({
      page,
      accessibilityTest: true,
      withdrawApplication: true,
      caseRef: caseRef,
    });
  });
  test(`Complete withdraw application event and do not withdraw application. @regression`, async ({
    page,
  }): Promise<void> => {
    await WithdrawApplication.withdrawApplication({
      page,
      accessibilityTest: false,
      withdrawApplication: false,
      caseRef: caseRef,
    });
  });
});
