import { Page, test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { NoticeOfChange } from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChange.ts";
import { SolicitorDACaseCreator } from "../../../../common/caseHelpers/solicitorDACaseCreator.ts";
import { Helpers } from "../../../../common/helpers.ts";

test.use({ storageState: Config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Notice of Change tests for DA case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser }) => {
    const solicitorPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "solicitor",
    );
    await solicitorPage.goto(Config.manageCasesBaseURLCase);
    ccdRef =
      await SolicitorDACaseCreator.createCaseStatementOfTruthAndSubmit(
        solicitorPage,
      );
    await page.goto(Config.manageCasesBaseURLCase);
  });

  test("NOC applicant. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await NoticeOfChange.noticeOfChange({
      page: page,
      browser: browser,
      caseType: "FL401",
      caseRef: ccdRef,
      isApplicant: true,
      accessibilityTest: false,
    });
  });

  // to be investigated and fixed as part of FPVTL-773
  test.fixme("NOC respondent. @nightly @accessibility @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await NoticeOfChange.noticeOfChange({
      page: page,
      browser: browser,
      caseType: "FL401",
      caseRef: ccdRef,
      isApplicant: false,
      accessibilityTest: true,
    });
  });
});
