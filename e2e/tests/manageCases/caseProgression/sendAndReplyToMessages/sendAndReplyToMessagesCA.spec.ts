import { test } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import {
  default as Config,
  default as config,
} from "../../../../utils/config.utils.ts";
import { SendAndReplyToMessages } from "../../../../journeys/manageCases/caseProgression/sendAndReplyToMessages/sendAndReplyToMessages";
import { SolicitorCACaseCreator } from "../../../../common/caseHelpers/solicitorCACaseCreator.ts";
import {
  jsonDatas,
  submitEvent,
} from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Send and reply to messages between court admin and judge for a C100 case tests", () => {
  let ccdRef: string;
  test.beforeEach(async ({ page, browser }) => {
    const solicitorPage = await Helpers.openNewBrowserWindow(
      browser,
      "solicitor",
    );
    await solicitorPage.goto(Config.manageCasesBaseURL);
    ccdRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(solicitorPage);
    const ctscPage = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminStoke",
    );
    await Helpers.goToCase(
      ctscPage,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await submitEvent(
      ctscPage,
      ccdRef,
      "issueAndSendToLocalCourtCallback",
      jsonDatas.solicitorCACaseData,
    );
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
      caseType: "C100",
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
      caseType: "C100",
      accessibilityTest: false,
    });
  });
});
