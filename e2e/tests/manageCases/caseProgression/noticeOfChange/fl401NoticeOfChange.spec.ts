import Config from "../../../../utils/config.utils.ts";
import { NoticeOfChange } from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChange.ts";
import { test } from "../../../fixtures.ts";
import { Helpers } from "../../../../common/helpers.js";
import config from "../../../../utils/config.utils.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { Fl401StatementOfTruth } from "../../../../journeys/manageCases/createCase/FL401StatementOfTruth/fl401StatementOfTruth.js";
import { Selectors } from "../../../../common/selectors.js";

test.use({ storageState: Config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Notice of Change tests for DA case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    // need to re-complete applicant details as a workaround to trigger OrgPolicyCaseAssignedRole updates
    // TS-support application doesn't do this naturally
    const applicantSolPage = await Helpers.openNewBrowserWindow(
      browser,
      "solicitor",
    );
    await applicantSolPage.goto(config.manageCasesBaseURLCase);
    ccdRef = await caseEventUtils.createTSSolicitorCase(
      applicantSolPage,
      "FL401",
    );
    await Helpers.goToCase(
      applicantSolPage,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await Helpers.handleEventBasedOnEnvironment(
      applicantSolPage,
      "Applicant details",
    );
    await applicantSolPage
      .locator(Selectors.button, { hasText: CommonStaticText.continue })
      .click();
    await applicantSolPage
      .locator(Selectors.button, { hasText: CommonStaticText.saveAndContinue })
      .click();
    await Fl401StatementOfTruth.fl401StatementOfTruth({
      page: applicantSolPage,
      accessibilityTest: false,
      errorMessaging: false,
      fl401YesNoToEverything: true,
      subJourney: false,
    });
    await applicantSolPage.waitForResponse(
      `${Config.manageCasesBaseURL}/data/cases/${ccdRef}/events`,
    );
    await page.goto(Config.manageCasesBaseURLCase);
  });

  // to be investigated and fixed as part of FPVTL-773
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
  test("NOC respondent. @nightly @accessibility @regression", async ({
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
