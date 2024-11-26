import { test } from "@playwright/test";
import Config from "../../../config";
import createDaCitizenCourtNavCase from "../../../common/createCaseHelper";
import { ActiveTasks } from "../../../journeys/manageCases/caseProgression/activeTasks/activeTasks";
import { Helpers } from "../../../common/helpers";
import config from "../../../config";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Active Tasks task for DA Citizen case tests. @manageCases", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Active Tasks without accessibility test. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await ActiveTasks.activeTasks({
      page: page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true,
      yesNoNotSureReviewDocs: "yes",
      ccdRef: ccdRef,
    });
  });

  test("Complete Active Tasks with accessibility test. @accessibilityManageCases", async ({
    page,
  }): Promise<void> => {
    await ActiveTasks.activeTasks({
      page: page,
      accessibilityTest: true,
      yesNoSendToGateKeeper: false,
      yesNoNotSureReviewDocs: "no",
      ccdRef: ccdRef,
    });
  });
});
