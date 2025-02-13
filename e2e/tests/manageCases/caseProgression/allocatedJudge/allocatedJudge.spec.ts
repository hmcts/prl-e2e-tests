import { test } from "@playwright/test";
import Config from "../../../../config";
import config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import { AllocatedJudge } from "../../../../journeys/manageCases/caseProgression/allocatedJudge/allocatedJudge.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Allocate a judge to the case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Allocate a Judge to a DA case @nightly @regression", async ({
    page,
  }) => {
    await AllocatedJudge.allocatedJudge({
      page: page,
      accessibilityTest: false,
      ccdRef: ccdRef,
    });
  });
});
