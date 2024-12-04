import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import {
  CheckApplicationJourney
} from "../../../../journeys/manageCases/caseProgression/checkApplicationSendToGateKeeper/checkApplication/checkApplicationJourney";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Check Application task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Check Application without accessibility test. @regression", async ({
    page,
  }): Promise<void> => {
    await CheckApplicationJourney.checkApplication({
      page: page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: false,
      ccdRef: ccdRef,
    })
  });

  test("Complete Check Application with accessibility test. @regression", async ({
    page,
  }): Promise<void> => {
    await CheckApplicationJourney.checkApplication({
      page: page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: false,
      ccdRef: ccdRef,
    });
  });

  test("Complete Check Application without accessibility test. @regression @accessibility @nightly", async ({
    page,
  }): Promise<void> => {
    await CheckApplicationJourney.checkApplication({
      page: page,
      accessibilityTest: true,
      yesNoSendToGateKeeper: true,
      ccdRef: ccdRef,
    });
  });
});
