import { test } from "@playwright/test";
import Config from "../../../../config";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { SendAndReplyToMessages } from "../../../../journeys/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages";
import createDaCitizenCourtNavCase from "../../../../common/createDACourtNavCaseHelper";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Send and reply to messages between court admin and judge tests ", () => {
  let ccdRef: string;
  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test(`Complete send and reply messages event between court admin and judge with required response. 
  @regression @accessibility @nightly`, async ({
    page,
    browser,
  }): Promise<void> => {
    await SendAndReplyToMessages.sendAndReplyToMessages({
      page: page,
      browser: browser,
      ccdRef: ccdRef,
      responseRequired: true,
      accessibilityTest: true,
    });
  });

  test(`Complete send and reply messages event between court admin and judge without required response. 
  @regression`, async ({ page, browser }): Promise<void> => {
    await SendAndReplyToMessages.sendAndReplyToMessages({
      page: page,
      browser: browser,
      ccdRef: ccdRef,
      responseRequired: false,
      accessibilityTest: false,
    });
  });
});
