import { test } from "../../fixtures.ts";
import { ActivateCase } from "../../../journeys/citizen/activateCase/activateCase.ts";
import { Helpers } from "../../../common/helpers.ts";
import config from "../../../utils/config.utils.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Activating case tests", (): void => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - initial Courtnav case creation doesn't work",
  );

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

  test("Activate case as an applicant and respondent. @regression @accessibility", async ({
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
      yesNoServiceOfApplication4: false,
      confidentialityCheck: false,
    });
  });
});
