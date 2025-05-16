import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import createDaCitizenCourtNavCase from "../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../common/helpers";
import { AllocatedJudge } from "../../../../journeys/manageCases/caseProgression/allocatedJudge/allocatedJudge.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Allocate a judge to the case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Allocate a Judge to a DA case @nightly @regression", async ({
    page,
  }) => {
    await AllocatedJudge.allocatedJudge({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
    });
  });
});
