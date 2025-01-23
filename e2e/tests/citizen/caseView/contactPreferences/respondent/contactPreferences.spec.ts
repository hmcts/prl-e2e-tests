import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import config from "../../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { ContactPreferences } from "../../../../../journeys/citizen/caseView/contactPreferences/contactPreferences.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });
// comment to run test in pipeline - remove before merging
test.describe("Respondent confirm contact details tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Respondent contact preferences. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await ContactPreferences.contactPreferences({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      contactOption: "Post",
      isApplicant: false,
    });
  });
});
