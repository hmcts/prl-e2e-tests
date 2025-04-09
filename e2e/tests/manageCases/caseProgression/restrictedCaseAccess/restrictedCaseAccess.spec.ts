import { test } from "@playwright/test";
import createDaCitizenCourtNavCase from "../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../common/helpers";
import config, { Config } from "../../../../config";
import { SendToGateKeeperJourney } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.ts";
import { RestrictedCaseAccess } from "../../../../journeys/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessJourney.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Restricted Case Access events.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await SendToGateKeeperJourney.sendToGateKeeper({
      page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true,
      ccdRef,
    });
  });

  test("Mark DA case as restricted as a gatekeeping judge. @nightly @regression @accessibility", async ({
    browser,
  }): Promise<void> => {
    await RestrictedCaseAccess.restrictedCaseAccess({
      accessibilityTest: true,
      ccdRef,
      browser: browser,
    });
  });
});
