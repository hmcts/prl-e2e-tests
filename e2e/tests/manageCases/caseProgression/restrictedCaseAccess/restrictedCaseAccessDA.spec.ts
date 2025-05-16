import { Page, test } from "@playwright/test";
import createDaCitizenCourtNavCase from "../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../common/helpers";
import config, { Config } from "../../../../utils/config.utils.ts";
import { SendToGateKeeperJourney } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.ts";
import { RestrictedCaseAccess } from "../../../../journeys/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessJourney.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Restricted Case Access events for DA case.", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ page }) => {
    //create a DA case (court nav) and complete 'complete application' and 'send to gatekeeper' events
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
