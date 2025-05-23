import { test } from "@playwright/test";
import Config from "../../../../../utils/config.utils.ts";
import config from "../../../../../utils/config.utils.ts";
import createDaCitizenCourtNavCase from "../../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { ViewAllDocuments } from "../../../../../journeys/citizen/caseView/viewAllDocuments/viewAllDocuments.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant view all documents tests", (): void => {
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

  test("Applicant view all documents. @regression @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await ViewAllDocuments.applicantViewAllDocuments({
      page: page,
      browser: browser,
      accessibilityTest: false,
      caseRef: ccdRef,
      isApplicant: true,
      applicationSubmittedBy: "Citizen",
    });
  });

  test("Applicant view all documents. @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await ViewAllDocuments.applicantViewAllDocuments({
      page: page,
      browser: browser,
      accessibilityTest: true,
      caseRef: ccdRef,
      isApplicant: true,
      applicationSubmittedBy: "Citizen",
    });
  });
});
