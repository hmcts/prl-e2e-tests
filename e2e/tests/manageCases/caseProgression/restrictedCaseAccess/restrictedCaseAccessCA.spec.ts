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
    await SolicitorCACaseCreator.c100sendToGatekeeper(browser, ccdRef);
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
