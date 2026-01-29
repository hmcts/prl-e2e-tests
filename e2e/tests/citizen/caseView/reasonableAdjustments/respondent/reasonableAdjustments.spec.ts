import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { ReasonableAdjustments } from "../../../../../journeys/citizen/caseView/reasonableAdjustments/reasonableAdjustments.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent reasonable adjustments tests", (): void => {
  test.slow();
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
      applicationSubmittedBy: "Solicitor",
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
      applicationSubmittedBy: "Solicitor",
    });
  });
});
