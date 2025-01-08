import { test } from "@playwright/test";
import Config from "../../../../config.ts";
import config from "../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { DaCitizenRespondentDashboardTasks } from "../../../../journeys/citizen/caseView/respondent/daCitizenRespondentDashboardTasks/daCitizenRespondentDashboardTasks.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent reasonable adjustments tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    console.log(ccdRef);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Respondent reasonable adjustments - no reasonable adjustments. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await DaCitizenRespondentDashboardTasks.daCitizenRespondentDashboardTasks({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      event: "reasonableAdjustments",
      needsReasonableAdjustment: false,
    });
  });

  test("Respondent reasonable adjustments - add reasonable adjustment. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await DaCitizenRespondentDashboardTasks.daCitizenRespondentDashboardTasks({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      event: "reasonableAdjustments",
      needsReasonableAdjustment: true,
    });
  });
});
