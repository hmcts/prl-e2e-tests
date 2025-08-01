import { test } from "../../../fixtures.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { SendToGateKeeperJourney } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.ts";
import { RestrictedCaseAccess } from "../../../../journeys/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessJourney.ts";

test.use({ storageState: config.sessionStoragePath + "judge.json" });

test.describe("Complete the Restricted Case Access events for DA case.", () => {
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
    await SendToGateKeeperJourney.sendToGateKeeper({
      page: caPage,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true, //set to true to allocate specific judge to case so they can restrict case
      ccdRef,
    });
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
