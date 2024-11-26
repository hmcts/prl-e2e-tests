import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { CheckApplication } from "../../../../journeys/manageCases/caseProgression/checkApplication/checkApplication";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Check Application task for DA Citizen case tests. @manageCases", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Check Application without accessibility test. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await CheckApplication.checkApplication({
      page: page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true,
      yesNoNotSureReviewDocs: "yes",
      ccdRef: ccdRef,
    });
  });

  test("Complete Check Application with accessibility test. @accessibilityManageCases", async ({
    page,
  }): Promise<void> => {
    await CheckApplication.checkApplication({
      page: page,
      accessibilityTest: true,
      yesNoSendToGateKeeper: false,
      yesNoNotSureReviewDocs: "no",
      ccdRef: ccdRef,
    });
  });
});
