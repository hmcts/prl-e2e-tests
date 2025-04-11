import { test, Page } from "@playwright/test";
import { Config } from "../../../../config";
import { RestrictedCaseAccess } from "../../../../journeys/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessJourney.ts";
import { SolicitorCACaseCreator } from "../../../../common/caseHelpers/solicitorCACaseCreator.ts";
import { CheckApplicationJourney } from "../../../../journeys/manageCases/caseProgression/checkApplication/checkApplicationJourney.ts";
import { SendToGateKeeperJourney } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Complete the Restricted Case Access events for CA case.", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ page, browser }) => {
    await page.goto(Config.manageCasesBaseURLCase);
    ccdRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(
      page,
      undefined,
      true,
    );
    const caseManagerPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseManager",
    );
    await Helpers.goToCase(
        caseManagerPage,
        config.manageCasesBaseURLCase,
        ccdRef,
        "tasks",
    );
    await CheckApplicationJourney.checkApplication({
      page: caseManagerPage,
      accessibilityTest: false,
    });
    await SendToGateKeeperJourney.sendToGateKeeper({
      page: caseManagerPage,
      ccdRef,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true,
      checkApplicationEvent: false,
    });
  });

  test("Mark CA case as restricted as a gatekeeper judge. @nightly @regression @accessibility", async ({
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
