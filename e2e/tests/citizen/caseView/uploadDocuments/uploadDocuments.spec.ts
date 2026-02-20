import { test } from "../../../fixtures";
import config from "../../../../utils/config.utils";
import { Helpers } from "../../../../common/helpers";
import { Upload } from "../../../../journeys/citizen/caseView/uploadDocuments/upload";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant upload documents tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page, courtNavUtils }) => {
    ccdRef = await courtNavUtils.createCase(true, false);
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
