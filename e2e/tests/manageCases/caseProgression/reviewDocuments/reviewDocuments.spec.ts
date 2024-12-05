import { test } from "@playwright/test";
import Config from "../../../../config";
import { ReviewDocuments } from "../../../../journeys/manageCases/caseProgression/reviewDocuments/reviewDocuments";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createDACourtNavCaseHelper";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Review Documents task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, true);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Review Documents without accessibility test. Saying yes to Restrict Access @regression", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: false,
      yesNoNotSureReviewDocs: "yes",
    });
  });

  test("Complete Review Documents without accessibility test. Saying no to Restrict Access @regression", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: false,
      yesNoNotSureReviewDocs: "no",
    });
  });

  test("Complete Review Documents with accessibility test. Saying not sure to Restrict Access @regression", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: false,
      yesNoNotSureReviewDocs: "dontKnow",
    });
  });

  test("Complete Review Documents with accessibility test. Saying yes to Restrict Access @accessibility @nightly", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: true,
      yesNoNotSureReviewDocs: "yes",
    });
  });
});
