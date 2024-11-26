import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { ReviewDocuments } from "../../../../journeys/manageCases/caseProgression/reviewDocuments/reviewDocuments";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { CheckApplication } from "../../../../journeys/manageCases/caseProgression/checkApplication/checkApplication";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Review Documents task for DA Citizen case tests. @manageCases", () => {
  test.beforeEach(async ({ page }) => {
    const ccdRef: string = await createDaCitizenCourtNavCase(false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Review Documents without accessibility test. @crossbrowserManageCases", async ({
    page,
  }): Promise<void> => {
    // await CheckApplication.checkApplication({
    //   page: page,
    //   accessibilityTest: false,
    // });

    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: false,
    });
  });

  test("Complete Review Documents with accessibility test. @accessibilityManageCases", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: true,
    });
  });
});
