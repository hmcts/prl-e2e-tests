import { test } from "@playwright/test";
import Config from "../../../../config.ts";
import config from "../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { Upload } from "../../../../journeys/citizen/caseView/uploadDocuments/upload.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant upload documents tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Applicant upload documents task page. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await Upload.upload({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      isApplicant: true,
      applicationSubmittedBy: "Citizen",
    });
  });
});
