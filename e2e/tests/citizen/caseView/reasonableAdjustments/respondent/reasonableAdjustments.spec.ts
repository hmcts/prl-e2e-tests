import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { ReasonableAdjustments } from "../../../../../journeys/citizen/caseView/reasonableAdjustments/reasonableAdjustments.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent reasonable adjustments tests", (): void => {
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

  test("Respondent reasonable adjustments - no reasonable adjustments. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await ReasonableAdjustments.reasonableAdjustments({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      needsReasonableAdjustment: false,
      isApplicant: false,
      accessibilityTest: false,
      applicationSubmittedBy: "Solicitor",
    });
  });

  test("Respondent reasonable adjustments - add reasonable adjustment. @regression @nightly @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await ReasonableAdjustments.reasonableAdjustments({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      needsReasonableAdjustment: true,
      isApplicant: false,
      accessibilityTest: true,
      applicationSubmittedBy: "Solicitor",
    });
  });
});
