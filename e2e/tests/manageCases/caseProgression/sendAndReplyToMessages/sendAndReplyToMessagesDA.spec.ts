import { test } from "@playwright/test";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import { default as Config, default as config } from "../../../../config";
import { SendAndReplyToMessages } from "../../../../journeys/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

// comment to trigger test in pipeline
test.describe("Send and reply to messages between court admin and judge for an FL401 case tests", () => {
  let ccdRef: string;
  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
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
      caseType: "FL401",
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
      caseType: "FL401",
      accessibilityTest: false,
    });
  });
});
