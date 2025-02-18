import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import config from "../../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { MakeRequestToCourtAboutCase } from "../../../../../journeys/citizen/caseView/makeRequestToCourtAboutCase/applicant/makeRequestToCourtAboutCase.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant Make a request to the court about your case tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURLCase, ccdRef, "tasks");
  });

  test("Applicant Make a request to the court about your case page. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await MakeRequestToCourtAboutCase.makeRequestToCourtAboutCase({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      isApplicant: true,
      applicationSubmittedBy: "Citizen",
    });
  });
});
