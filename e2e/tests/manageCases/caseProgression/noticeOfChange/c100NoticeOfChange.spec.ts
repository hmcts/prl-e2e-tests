import { Page, test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { NoticeOfChange } from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChange.ts";
import { SolicitorCACaseCreator } from "../../../../common/caseHelpers/solicitorCACaseCreator.ts";

test.use({ storageState: Config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Notice of Change tests for CA case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser }) => {
    const solicitorPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "solicitor",
    );
    await solicitorPage.goto(Config.manageCasesBaseURLCase);
    ccdRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(solicitorPage);
    await SolicitorCACaseCreator.c100IssueAndSendToLocalCourt(browser, ccdRef);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("NOC applicant. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await NoticeOfChange.noticeOfChange({
      page: page,
      browser: browser,
      caseType: "C100",
      caseRef: ccdRef,
      isApplicant: true,
      accessibilityTest: false,
    });
  });

  test("NOC respondent. @nightly @accessibility @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await NoticeOfChange.noticeOfChange({
      page: page,
      browser: browser,
      caseType: "C100",
      caseRef: ccdRef,
      isApplicant: false,
      accessibilityTest: true,
    });
  });
});
