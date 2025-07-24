import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { Upload } from "../../../../journeys/citizen/caseView/uploadDocuments/upload.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant upload documents tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
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
      applicationSubmittedBy: "Solicitor",
    });
  });
});
