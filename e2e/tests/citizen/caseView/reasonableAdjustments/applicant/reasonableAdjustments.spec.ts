import { test } from "../../../../fixtures";
import config from "../../../../../utils/config.utils";
import { Helpers } from "../../../../../common/helpers";
import { ReasonableAdjustments } from "../../../../../journeys/citizen/caseView/reasonableAdjustments/reasonableAdjustments";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant reasonable adjustments tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page, courtNavUtils }) => {
    ccdRef = await courtNavUtils.createCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
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
      applicationSubmittedBy: "Citizen",
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
      applicationSubmittedBy: "Citizen",
    });
  });
});
