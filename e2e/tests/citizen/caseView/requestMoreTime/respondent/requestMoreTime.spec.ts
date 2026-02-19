import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { RequestMoreTime } from "../../../../../journeys/citizen/caseView/requestMoreTime/respondent/requestMoreTime.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent Request more time to do what is required by a court order tests", (): void => {
  let ccdRef: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      ccdRef = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        ccdRef,
        "tasks",
      );
    },
  );

  test("Respondent Request more time with fees. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await RequestMoreTime.requestMoreTime({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false, // TODO create ticket for this accessibility failure
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
