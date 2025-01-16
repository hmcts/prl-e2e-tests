import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import config from "../../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { ReasonableAdjustments } from "../../../../../journeys/citizen/caseView/reasonableAdjustments/reasonableAdjustments.ts";

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
    await ReasonableAdjustments.reasonableAdjustments({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      needsReasonableAdjustment: false,
      isApplicant: true,
      accessibilityTest: true,
    });
  });

  test("Applicant reasonable adjustments - add reasonable adjustment. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await ReasonableAdjustments.reasonableAdjustments({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      needsReasonableAdjustment: true,
      isApplicant: true,
      accessibilityTest: false,
    });
  });
});
