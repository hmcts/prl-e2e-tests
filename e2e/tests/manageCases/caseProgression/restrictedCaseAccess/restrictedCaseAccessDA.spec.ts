import { test } from "../../../fixtures.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { SendToGateKeeperJourney } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.ts";
import { RestrictedCaseAccess } from "../../../../journeys/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessJourney.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Restricted Case Access events for DA case.", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ page, courtNavUtils }) => {
    //create a DA case (court nav) and complete 'complete application' and 'send to gatekeeper' events
    ccdRef = await courtNavUtils.createCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await SendToGateKeeperJourney.sendToGateKeeper({
      page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true, //set to true to allocate specific judge to case so they can restrict case
      ccdRef,
    });
  });

  test("Mark DA case as restricted as a gatekeeper judge. @nightly @regression @accessibility", async ({
    browser,
  }): Promise<void> => {
    const judgePage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "judge",
    );
    await RestrictedCaseAccess.restrictedCaseAccess({
      page: judgePage,
      accessibilityTest: true,
      ccdRef,
    });
  });
});
