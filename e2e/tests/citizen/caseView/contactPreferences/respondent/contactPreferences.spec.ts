import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { ContactPreferences } from "../../../../../journeys/citizen/caseView/contactPreferences/contactPreferences.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent confirm contact details tests", (): void => {
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
      applicationSubmittedBy: "Citizen",
    });
  });
});
