import { test } from "../../../fixtures";
import { ReviewCitizenUploadedDocuments } from "../../../../journeys/manageCases/caseProgression/reviewDocuments/reviewCitizenUploadedDocuments";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../utils/config.utils";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete Task - Review Documents for DA case tests.", () => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - initial Courtnav case creation doesn't work",
  );

  let ccdRef: string = "";

  test.beforeEach(async ({ page, courtNavUtils }) => {
    ccdRef = await courtNavUtils.createCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
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
      applicationSubmittedBy: "Citizen",
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
      applicationSubmittedBy: "Citizen",
    });
  });
});
