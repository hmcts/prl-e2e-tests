import { test } from "../../../../fixtures";
import config from "../../../../../utils/config.utils";
import { Helpers } from "../../../../../common/helpers";
import { RequestMoreTime } from "../../../../../journeys/citizen/caseView/requestMoreTime/applicant/requestMoreTime";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant Request more time to do what is required by a court order tests", (): void => {
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

  test("Applicant Request more time without fees. @regression @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await RequestMoreTime.requestMoreTime({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: false,
      isApplicant: true,
      applicationSubmittedBy: "Citizen",
      completedForm: true,
      agreementForRequest: true,
      supportingDocuments: true,
      reasonUrgentRequest: true,
    });
  });
});
