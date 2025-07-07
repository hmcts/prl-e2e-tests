import { test } from "@playwright/test";
import createDaCitizenCourtNavCase from "../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";
import {
  default as Config,
  default as config,
} from "../../../../utils/config.utils.ts";
import { SendAndReplyToMessages } from "../../../../journeys/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

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
