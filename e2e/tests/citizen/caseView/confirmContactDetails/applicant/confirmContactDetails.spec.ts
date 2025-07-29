import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { ConfirmContactDetails } from "../../../../../journeys/citizen/caseView/confirmContactDetails/confirmContactDetails.ts";

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

  test("Applicant confirm contact details. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await ConfirmContactDetails.confirmContactDetails({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      isApplicant: true,
      accessibilityTest: true,
      applicationSubmittedBy: "Citizen",
    });
  });
});
