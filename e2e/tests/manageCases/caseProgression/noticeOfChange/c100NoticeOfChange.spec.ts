import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { NoticeOfChange } from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChange.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Notice of Change tests for CA case", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
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
      caseRef: caseRef,
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
      caseRef: caseRef,
      isApplicant: false,
      accessibilityTest: true,
    });
  });
});
