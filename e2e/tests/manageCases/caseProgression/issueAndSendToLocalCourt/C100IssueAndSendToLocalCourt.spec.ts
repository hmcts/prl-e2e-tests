import Config from "../../../../utils/config.utils.js";
import { Helpers } from "../../../../common/helpers.js";
import config from "../../../../utils/config.utils.ts";
import { IssueAndSendToLocalCourt } from "../../../../journeys/manageCases/caseProgression/issueAndSendToLocalCourt/issueAndSendToLocalCourt.js";
import { test } from "../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "courtAdminStoke.json" });

test.describe("Issue and send to local court for CA cases", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACase(browser);
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
  @nightly @accessibility`, async ({ page }): Promise<void> => {
    await IssueAndSendToLocalCourt.issueAndSendToLocalCourt({
      page: page,
      accessibilityTest: true,
    });
  });
});
