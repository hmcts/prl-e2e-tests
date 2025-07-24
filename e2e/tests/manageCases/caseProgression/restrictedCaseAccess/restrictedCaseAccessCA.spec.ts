import { Page } from "@playwright/test";
import { Config } from "../../../../utils/config.utils.ts";
import { RestrictedCaseAccess } from "../../../../journeys/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessJourney.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { SendToGateKeeperJourney } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.ts";
import { test } from "../../../fixtures.js";

test.use({ storageState: Config.sessionStoragePath + "judge.json" });

test.describe("Complete the Restricted Case Access events for CA case.", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
    //log in as a court admin and complete send to gatekeeper event
    const caseWorkerPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      caseWorkerPage,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    //#TODO: replace with page.evaluate calls for CA cases
    await SendToGateKeeperJourney.sendToGateKeeper({
      page: caseWorkerPage,
      ccdRef,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true, //set to true to allocate specific judge to case so they can restrict case
      checkApplicationEvent: false,
    });
  });

  test("Mark CA case as restricted as a gatekeeper judge. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await RestrictedCaseAccess.restrictedCaseAccess({
      page: page,
      accessibilityTest: true,
      ccdRef,
    });
  });
});
