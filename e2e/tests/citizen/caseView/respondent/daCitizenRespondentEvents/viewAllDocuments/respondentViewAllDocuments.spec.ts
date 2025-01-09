import { test } from "@playwright/test";
import Config from "../../../../../../config.ts";
import config from "../../../../../../config.ts";
import { RespondentViewAllDocuments } from "../../../../../../journeys/citizen/caseView/respondent/viewAllDocuments/respondentViewAllDocuments.ts";
import createDaCitizenCourtNavCase from "../../../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../../../common/helpers.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant view all documents tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Applicant view all documents. @regression @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await RespondentViewAllDocuments.respondentViewAllDocuments({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
    });
  });

  test("Applicant view all documents. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await RespondentViewAllDocuments.respondentViewAllDocuments({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
    });
  });
});
