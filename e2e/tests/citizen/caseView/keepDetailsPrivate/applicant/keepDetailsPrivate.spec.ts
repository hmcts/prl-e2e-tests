import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import config from "../../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import {
  KeepDetailsPrivate
} from "../../../../../journeys/citizen/caseView/keepDetailsPrivate/applicant/keepDetailsPrivate.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant confirm contact details tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Applicant keep details private with yes response. @regression @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      startAlternativeYesNo: true,
      yesNoDontKnow: "yes",
      contactOption: "Post"
    });
  });

  test("Applicant keep details private with no response. @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      startAlternativeYesNo: false,
      yesNoDontKnow: "no",
      contactOption: "Post"
    });
  });

  test("Applicant keep details private with dontKnow response. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await KeepDetailsPrivate.keepDetailsPrivate({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      startAlternativeYesNo: true,
      yesNoDontKnow: "dontKnow",
      contactOption: "Post"
    });
  });
});
