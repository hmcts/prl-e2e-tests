import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AllocatedJudge } from "../../../../journeys/manageCases/caseProgression/allocatedJudge/allocatedJudge.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Allocate a judge to the case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACaseSendToGatekeeper(browser);
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
    });
  });
});
