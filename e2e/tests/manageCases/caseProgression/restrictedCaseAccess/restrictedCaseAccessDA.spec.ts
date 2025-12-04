import { test } from "../../../fixtures.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { RestrictedCaseAccess } from "../../../../journeys/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessJourney.ts";
import { SendToGateKeeperJourney } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.js";

test.use({ storageState: config.sessionStoragePath + "judge.json" });

test.describe("Complete the Restricted Case Access events for DA case.", () => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - roles and access doesn't work",
  );

  let ccdRef: string = "";
  test.beforeEach(async ({ browser, caseEventUtils }) => {
    //create a DA case (court nav) and complete 'complete application' and 'send to gatekeeper' events
    ccdRef = await caseEventUtils.createDACase(browser);
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      caPage,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );

    const sendToGatekeeperJourney: SendToGateKeeperJourney =
      new SendToGateKeeperJourney();
    await sendToGatekeeperJourney.sendToGateKeeper(
      caPage,
      ccdRef,
      "caseWorker",
      {
        sendToGateKeeperParams: {
          sendToSpecificGateKeeper: true,
          judgeOrLegalAdviser: "Judge",
          judgeName: "Ms Elizabeth Williams",
        },
        snapshotPath: ["caseProgression", "sendToGateKeeper"],
        snapshotName: "send-to-judiciary-gatekeeper",
      },
    );
  });

  test("Mark DA case as restricted as a gatekeeper judge. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await RestrictedCaseAccess.restrictedCaseAccess({
      page: page,
      accessibilityTest: true,
      ccdRef,
    });
  });
});
