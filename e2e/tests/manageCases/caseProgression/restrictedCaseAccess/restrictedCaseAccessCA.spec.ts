import { test, Page } from "@playwright/test";
import { Config } from "../../../../utils/config.utils.ts";
import { RestrictedCaseAccess } from "../../../../journeys/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessJourney.ts";
import { SolicitorCACaseCreator } from "../../../../common/caseHelpers/solicitorCACaseCreator.ts";
import { Helpers } from "../../../../common/helpers.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Complete the Restricted Case Access events for CA case.", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ page, browser }) => {
    await page.goto(Config.manageCasesBaseURLCase);
    //create a CA case as a solicitor and issue to local court
    ccdRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(page);
    await SolicitorCACaseCreator.c100IssueAndSendToLocalCourt(browser, ccdRef);
    //log in as a court admin and complete send to gatekeeper event
    await SolicitorCACaseCreator.c100sendToGatekeeper(browser, ccdRef);
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
