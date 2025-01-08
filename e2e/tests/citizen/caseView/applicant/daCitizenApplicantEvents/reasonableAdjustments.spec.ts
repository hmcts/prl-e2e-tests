import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import config from "../../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { DaCitizenApplicantDashboardTasks } from "../../../../../journeys/citizen/caseView/applicant/daCitizenApplicantDashboardTasks/daCitizenApplicantDashboardTasks.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant reasonable adjustments tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    console.log(ccdRef);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Applicant reasonable adjustments - no reasonable adjustments. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await DaCitizenApplicantDashboardTasks.daCitizenApplicantDashboardTasks({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      event: "reasonableAdjustments",
      startAlternativeYesNo: false,
      yesNoDontKnow: "dontKnow",
      needsReasonableAdjustment: false,
    });
  });

  test("Applicant reasonable adjustments - add reasonable adjustment. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await DaCitizenApplicantDashboardTasks.daCitizenApplicantDashboardTasks({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      event: "reasonableAdjustments",
      startAlternativeYesNo: false,
      yesNoDontKnow: "dontKnow",
      needsReasonableAdjustment: true,
    });
  });
});
