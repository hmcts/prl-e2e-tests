import { test } from "../../../../fixtures";
import config from "../../../../../utils/config.utils";
import { Helpers } from "../../../../../common/helpers";
import { ContactPreferences } from "../../../../../journeys/citizen/caseView/contactPreferences/contactPreferences";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant confirm contact details tests", (): void => {
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

  test("Applicant contact preferences. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await ContactPreferences.contactPreferences({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      contactOption: "Post",
      isApplicant: true,
      applicationSubmittedBy: "Citizen",
    });
  });
});
