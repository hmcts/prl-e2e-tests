import { test } from "../../fixtures.ts";
import { ActivateCase } from "../../../journeys/citizen/activateCase/activateCase.ts";
import config from "../../../utils/config.utils.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Activating case tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      ccdRef = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        ccdRef,
      );
    },
  );

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
      applicationSubmittedBy: "Solicitor",
      isManualSOA: true,
      yesNoServiceOfApplication4: false,
      confidentialityCheck: true,
    });
  });
});
