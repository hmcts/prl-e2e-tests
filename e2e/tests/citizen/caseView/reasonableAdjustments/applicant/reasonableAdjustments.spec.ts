import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { ReasonableAdjustments } from "../../../../../journeys/citizen/caseView/reasonableAdjustments/reasonableAdjustments.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant reasonable adjustments tests", (): void => {
  let ccdRef: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      ccdRef = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        ccdRef,
        "tasks",
      );
    },
  );

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
      applicationSubmittedBy: "Solicitor",
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
      applicationSubmittedBy: "Solicitor",
    });
  });
});
