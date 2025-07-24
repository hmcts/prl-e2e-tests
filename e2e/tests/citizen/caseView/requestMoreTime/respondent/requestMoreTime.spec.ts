import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { RequestMoreTime } from "../../../../../journeys/citizen/caseView/requestMoreTime/respondent/requestMoreTime.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent Request more time to do what is required by a court order tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
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
      applicationSubmittedBy: "Solicitor",
      completedForm: true,
      agreementForRequest: true,
      helpWithFees: true,
      haveRefNumber: true,
      supportingDocuments: true,
      reasonUrgentRequest: true,
    });
  });
});
