import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { CheckApplication } from "../../../../journeys/citizen/caseProgression/checkApplication/checkApplication";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete Check Application task for DA Citizen case. @citizenFrontend @crossbrowserCitizenFrontend", () => {
  test.beforeEach(async ({ page }) => {
    const ccdRef: string = await createDaCitizenCourtNavCase(false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Check Application without accessibility test.", async ({
    page,
  }): Promise<void> => {
    await CheckApplication.checkApplication({
      page: page,
      accessibilityTest: false,
    });
  });
});

test.describe("Testing the accessibility when completing Check Application task for DA Citizen case. @accessibilityCitizenFrontend", () => {
  test.beforeEach(async ({ page }) => {
    const ccdRef: string = await createDaCitizenCourtNavCase(false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Check Application with accessibility test.", async ({
    page,
  }): Promise<void> => {
    await CheckApplication.checkApplication({
      page: page,
      accessibilityTest: true,
    });
  });
});
