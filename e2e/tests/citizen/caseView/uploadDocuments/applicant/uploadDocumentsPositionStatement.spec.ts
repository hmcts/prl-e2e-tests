import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import config from "../../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { UploadDocumentsPositionStatement } from "../../../../../journeys/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/applicant/uploadDocumentsPositionStatement.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant upload documents position statement tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Applicant upload documents position statement page. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await UploadDocumentsPositionStatement.uploadDocumentsPositionStatement({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      isApplicant: true,
      yesNoNA: "Yes",
    });
  });
});
