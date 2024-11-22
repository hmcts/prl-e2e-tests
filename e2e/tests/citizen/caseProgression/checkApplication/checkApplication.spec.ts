import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { CheckApplication } from "../../../../journeys/citizen/caseProgression/checkApplication/checkApplication";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("test", () => {
  test.beforeEach(async ({page}) => {
    const ccdRef: string = await createDaCitizenCourtNavCase(false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("test court nav case", async ({ page }): Promise<void> => {
    await CheckApplication.checkApplication(page);
  });
});
