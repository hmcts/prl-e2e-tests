import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { SendAndReplyToMessages } from "../../../../journeys/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Send and reply to messages between court admin and judge tests ", () => {
  let ccdRef: string;
  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  // TODO: add accessibility testing to this test once the pipeline config is reconfigured as it covers an extra page
  test(`Complete send and reply messages event between court admin and judge with required response. 
  @nightly @regression`, async ({ page, browser }): Promise<void> => {
    await SendAndReplyToMessages.sendAndReplyToMessages({
      page: page,
      browser: browser,
      ccdRef: ccdRef,
      responseRequired: true,
      accessibilityTest: true,
    });
  });

  test(`Complete send and reply messages event between court admin and judge without required response. 
  @regression @accessibility`, async ({ page, browser }): Promise<void> => {
    await SendAndReplyToMessages.sendAndReplyToMessages({
      page: page,
      browser: browser,
      ccdRef: ccdRef,
      responseRequired: false,
      accessibilityTest: false,
    });
  });
});
