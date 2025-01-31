import { test } from "@playwright/test";
import { ActivateCase } from "../../../journeys/citizen/activateCase/activateCase.ts";
import createDaCitizenCourtNavCase from "../../../common/createCaseHelper.ts";
import { Helpers } from "../../../common/helpers.ts";
import config from "../../../config.ts";
import Config from "../../../config.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Activating case tests for citizen DA case", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Activate case as an applicant and respondent. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      caseUser: "both",
      accessibilityTest: true,
      applicationSubmittedBy: "Citizen",
      isManualSOA: true,
    });
  });
});
