import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import config from "../../../../../config.ts";
import { KeepDetailsPrivate } from "../../../../../journeys/citizen/caseView/respondent/keepDetailsPrivate/keepDetailsPrivate.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent keep details private tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Respondent keep details private with yes response. @regression @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      yesNoDontKnow: "yes",
      startAlternativeYesNo: true,
    });
  });

  test("Respondent keep details private with no response. @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      yesNoDontKnow: "no",
      startAlternativeYesNo: false,
    });
  });

  test("Respondent keep details private with dontKnow response. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      yesNoDontKnow: "dontKnow",
      startAlternativeYesNo: false,
    });
  });
});
