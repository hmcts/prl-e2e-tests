import { test } from "@playwright/test";
import Config from "../../../../../../config.ts";
import config from "../../../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { DaCitizenApplicantDashboardTasks } from "../../../../../../journeys/citizen/caseView/applicant/daCitizenApplicantDashboardTasks/daCitizenApplicantDashboardTasks.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant confirm contact details tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Applicant confirm contact details. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await DaCitizenApplicantDashboardTasks.daCitizenApplicantDashboardTasks({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      event: "confirmContactDetails",
      startAlternativeYesNo: true,
      yesNoDontKnow: "yes",
      contactOption: "Post",
    });
  });
});
