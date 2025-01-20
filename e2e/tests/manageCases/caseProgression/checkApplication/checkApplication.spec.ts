import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { CheckApplicationJourney } from "../../../../journeys/manageCases/caseProgression/e2eFlowUpToServiceOfApplication/checkApplication/checkApplicationJourney.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Check Application task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Task - Check Application without accessibility test. @regression", async ({
    page,
  }): Promise<void> => {
    await CheckApplicationJourney.checkApplication({
      page,
      accessibilityTest: false,
      ccdRef,
    });
  });

  test("Complete Task - Check Application with accessibility test. @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await CheckApplicationJourney.checkApplication({
      page,
      accessibilityTest: true,
      ccdRef,
    });
  });
});
