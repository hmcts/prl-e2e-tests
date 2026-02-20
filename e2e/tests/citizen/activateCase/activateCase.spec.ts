import { test } from "../../fixtures";
import { ActivateCase } from "../../../journeys/citizen/activateCase/activateCase";
import { Helpers } from "../../../common/helpers";
import config from "../../../utils/config.utils";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Activating case tests", (): void => {
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

  test("Activate case as an applicant and respondent. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      caseUser: "both",
      accessibilityTest: true,
      applicationSubmittedBy: "Citizen",
      isManualSOA: true,
    });
  });
});
