import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { ReviewCitizenUploadedDocuments } from "../../../../journeys/manageCases/caseProgression/reviewDocuments/reviewCitizenUploadedDocuments.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete Task - Review Documents for DA case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Task - Review Documents - Applicant uploaded documents without accessibility test. @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await ReviewCitizenUploadedDocuments.reviewCitizenUploadedDocuments({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      isApplicant: true,
      yesNoNotSureRestrictDocs: "no",
      documentType: "Position statements",
    });
  });

  test("Complete Task - Review Documents - Respondent uploaded documents without accessibility test. @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await ReviewCitizenUploadedDocuments.reviewCitizenUploadedDocuments({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      isApplicant: false,
      yesNoNotSureRestrictDocs: "no",
      documentType: "Position statements",
    });
  });
});
