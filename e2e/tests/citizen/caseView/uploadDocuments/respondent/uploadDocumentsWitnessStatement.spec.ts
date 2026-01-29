import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { UploadDocumentsWitnessStatement } from "../../../../../journeys/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/respondent/uploadDocumentsWitnessStatement.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant upload documents position statement tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      ccdRef = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        ccdRef,
        "tasks",
      );
    },
  );

  test("Applicant upload documents position statement page. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await UploadDocumentsWitnessStatement.uploadDocumentsWitnessStatement({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      isApplicant: false,
      yesNoNA: "Yes",
      applicationSubmittedBy: "Solicitor",
    });
  });
});
