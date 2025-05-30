import { test } from "@playwright/test";
import Config from "../../../../../utils/config.utils.ts";
import config from "../../../../../utils/config.utils.ts";
import createDaCitizenCourtNavCase from "../../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { ReasonableAdjustments } from "../../../../../journeys/citizen/caseView/reasonableAdjustments/reasonableAdjustments.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent reasonable adjustments tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Respondent reasonable adjustments - no reasonable adjustments. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await ReasonableAdjustments.reasonableAdjustments({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      needsReasonableAdjustment: false,
      isApplicant: false,
      accessibilityTest: true,
      applicationSubmittedBy: "Citizen",
    });
  });

  test("Respondent reasonable adjustments - add reasonable adjustment. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await ReasonableAdjustments.reasonableAdjustments({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      needsReasonableAdjustment: true,
      isApplicant: false,
      accessibilityTest: false,
      applicationSubmittedBy: "Citizen",
    });
  });
});
