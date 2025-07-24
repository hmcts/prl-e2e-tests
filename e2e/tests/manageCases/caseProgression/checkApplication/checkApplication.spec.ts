import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CheckApplicationJourney } from "../../../../journeys/manageCases/caseProgression/checkApplication/checkApplicationJourney.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Check Application task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Complete Task - Check Application without accessibility test. @nightly @regression", async ({
    page,
  }): Promise<void> => {
    await CheckApplicationJourney.checkApplication({
      page,
      accessibilityTest: false,
    });
  });

  test("Complete Task - Check Application with accessibility test. @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await CheckApplicationJourney.checkApplication({
      page,
      accessibilityTest: true,
    });
  });
});
