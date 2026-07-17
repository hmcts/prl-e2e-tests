import Config from "../../../../utils/config.utils.ts";
import { NoticeOfChange } from "../../../../journeys/manageCases/caseProgression/noticeOfChange/noticeOfChange.ts";
import { test } from "../../../fixtures.ts";
import { Helpers } from "../../../../common/helpers.js";
import config from "../../../../utils/config.utils.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { Selectors } from "../../../../common/selectors.js";
import { Fl401StatementOfTruth } from "../../../../journeys/manageCases/createCase/FL401StatementOfTruth/fl401StatementOfTruth.js";

test.use({ storageState: Config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Notice of Change tests for DA case", () => {
  let caseRef: string = "";

  test.beforeEach(
    async ({ page, manageCasesEventUtils, navigationUtils, browser }) => {
      // need to re-complete applicant details as a workaround to trigger OrgPolicyCaseAssignedRole updates
      // TS-support application doesn't do this naturally
      caseRef = (
        await manageCasesEventUtils.createDraftTSSolicitorCase("FL401")
      ).caseRef;
      console.log(caseRef);
      const applicantSolPage = await Helpers.openNewBrowserWindow(
        browser,
        "solicitor",
      );
      await navigationUtils.goToCase(
        applicantSolPage,
        config.manageCasesBaseURLCase,
        caseRef,
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
        .locator(Selectors.button, {
          hasText: CommonStaticText.saveAndContinue,
        })
        .click();
      await applicantSolPage.waitForResponse(
        `${Config.manageCasesBaseURL}/data/cases/${caseRef}/events`,
      );
      await Fl401StatementOfTruth.fl401StatementOfTruth({
        page: applicantSolPage,
        accessibilityTest: false,
        errorMessaging: false,
        fl401YesNoToEverything: true,
        subJourney: false,
      });
      await applicantSolPage.waitForResponse(
        `${Config.manageCasesBaseURL}/data/cases/${caseRef}/events`,
      );
      await applicantSolPage.close();
      await page.goto(Config.manageCasesBaseURLCase);
    },
  );

  // to be investigated and fixed as part of FPVTL-773
  test("NOC applicant. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await NoticeOfChange.noticeOfChange({
      page: page,
      browser: browser,
      caseType: "FL401",
      caseRef: caseRef,
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
      caseRef: caseRef,
      isApplicant: false,
      accessibilityTest: true,
    });
  });
});
