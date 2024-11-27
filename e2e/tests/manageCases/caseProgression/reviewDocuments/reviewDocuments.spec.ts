import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { ReviewDocuments } from "../../../../journeys/manageCases/caseProgression/reviewDocuments/reviewDocuments";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Review Documents task for DA Citizen case tests. @manageCases", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, true);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Review Documents without accessibility test. Saying yes to Restrict Access @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: false,
      yesNoNotSureReviewDocs: "yes",
    });
  });

  test("Complete Review Documents without accessibility test. Saying no to Restrict Access @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: false,
      yesNoNotSureReviewDocs: "no",
    });
  });

  test("Complete Review Documents with accessibility test. Saying not sure to Restrict Access @accessibilityManageCases", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: true,
      yesNoNotSureReviewDocs: "dontKnow",
    });
  });
});
