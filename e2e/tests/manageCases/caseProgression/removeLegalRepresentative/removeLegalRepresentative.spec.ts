import { test } from "@playwright/test";
import config from "../../../../utils/config.utils.ts";
import { RemoveLegalRepresentative } from "../../../../journeys/manageCases/caseProgression/removeLegalRepresentative/removeLegalRepresentative.ts";
import { SolicitorCACaseCreator } from ".././../../../common/caseHelpers/solicitorCACaseCreator.ts";
import { Helpers } from "../../../../common/helpers.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("Complete Remove legal representative event as a court admin", () => {
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

  test(`Remove legal representation from applicants and check on Parties tab @regression @nightly`, async ({
    page,
    browser,
  }) => {
    await RemoveLegalRepresentative.removeLegalRepresentative({
      page,
      browser,
      accessibilityTest: true,
      caseRef: caseRef,
    });
  });
});
