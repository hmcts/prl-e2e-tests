import { test } from "../../../fixtures.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { SendToGateKeeperJourney } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, courtNavUtils }) => {
    ccdRef = await courtNavUtils.createCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Complete Task - Send to GateKeeper - without accessibility test. @nightly @regression", async ({
    page,
  }): Promise<void> => {
    await SendToGateKeeperJourney.sendToGateKeeper({
      page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true,
      ccdRef,
    });
  });

  test("Complete Task - Send to GateKeeper - with accessibility test. @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await SendToGateKeeperJourney.sendToGateKeeper({
      page,
      accessibilityTest: true,
      yesNoSendToGateKeeper: true,
      ccdRef,
    });
  });

  test("Manual Completion Task - Team leader - Send to GateKeeper - without accessibility test. @regression @accessibility", async ({
    page, browser
  }): Promise<void> => {
    await SendToGateKeeperJourney.teamLeaderCheckSendToGateKeeper({
      page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true,
      ccdRef,
      browser: browser,
    });
  });
});
