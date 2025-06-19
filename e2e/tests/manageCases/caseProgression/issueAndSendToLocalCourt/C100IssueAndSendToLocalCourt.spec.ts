import { Page, test } from "@playwright/test";
import Config from "../../../../utils/config.utils.js";
import { SolicitorCACaseCreator } from "../../../../common/caseHelpers/solicitorCACaseCreator.js";
import { Helpers } from "../../../../common/helpers.js";
import config from "../../../../utils/config.utils.ts";
import { IssueAndSendToLocalCourt } from "../../../../journeys/manageCases/caseProgression/issueAndSendToLocalCourt/issueAndSendToLocalCourt.js";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Issue and send to local court for CA cases", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    await page.goto(Config.manageCasesBaseURLCase);
    ccdRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(page);

    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test(`Issue and send CA(C100) submitted case to local court as a CTSC user or CTSC admin with the following options:
  Case: C100,
  Accessibility testing: yes. 
  @nightly @accessibility @test`, async ({ browser }): Promise<void> => {
    const ctscPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(
      ctscPage,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );

    await IssueAndSendToLocalCourt.issueAndSendToLocalCourt({
      page: ctscPage,
      accessibilityTest: true,
    });
  });
});
