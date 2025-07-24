import Config from "../../../../utils/config.utils.ts";
import { NoticeOfChange } from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChange.ts";
import { test } from "../../../fixtures.js";

test.use({ storageState: Config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Notice of Change tests for DA case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    await page.goto(Config.manageCasesBaseURLCase);
  });

  // to be investigated and fixed as part of FPVTL-773
  test.fixme(
    "NOC applicant. @regression",
    async ({ page, browser }): Promise<void> => {
      await NoticeOfChange.noticeOfChange({
        page: page,
        browser: browser,
        caseType: "FL401",
        caseRef: ccdRef,
        isApplicant: true,
        accessibilityTest: false,
      });
    },
  );

  // to be investigated and fixed as part of FPVTL-773
  test.fixme(
    "NOC respondent. @nightly @accessibility @regression",
    async ({ page, browser }): Promise<void> => {
      await NoticeOfChange.noticeOfChange({
        page: page,
        browser: browser,
        caseType: "FL401",
        caseRef: ccdRef,
        isApplicant: false,
        accessibilityTest: true,
      });
    },
  );
});
