import { test } from "../../../../fixtures.ts";
import Config from "../../../../../utils/config.utils.ts";
import config from "../../../../../utils/config.utils.ts";
import { ViewAllDocuments } from "../../../../../journeys/citizen/caseView/viewAllDocuments/viewAllDocuments.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent view all documents tests", (): void => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - initial Courtnav case creation doesn't work",
  );

  let ccdRef: string;

  test.beforeEach(async ({ page, courtNavUtils, navigationUtils }) => {
    ccdRef = await courtNavUtils.createCase(true, false);
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Respondent view all documents. @regression @nightly @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await ViewAllDocuments.applicantViewAllDocuments({
      page: page,
      browser: browser,
      accessibilityTest: true,
      caseRef: ccdRef,
      isApplicant: false,
      applicationSubmittedBy: "Citizen",
    });
  });
});
