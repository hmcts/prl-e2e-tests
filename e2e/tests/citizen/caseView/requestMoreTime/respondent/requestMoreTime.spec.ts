import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import config from "../../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { RequestMoreTime } from "../../../../../journeys/citizen/caseView/requestMoreTime/respondent/requestMoreTime.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent Request more time to do what is required by a court order tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Respondent Request more time with fees. @regression @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await RequestMoreTime.requestMoreTime({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      isApplicant: false,
      applicationSubmittedBy: "Citizen",
      completedForm: true,
      agreementForRequest: true,
      helpWithFees: true,
      haveRefNumber: true,
      supportingDocuments: true,
      reasonUrgentRequest: true,
    });
  });
});
