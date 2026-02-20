import { test } from "../../../../fixtures";
import config from "../../../../../utils/config.utils";
import { Helpers } from "../../../../../common/helpers";
import { MakeRequestToCourtAboutCase } from "../../../../../journeys/citizen/caseView/makeRequestToCourtAboutCase/applicant/makeRequestToCourtAboutCase";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant Make a request to the court about your case tests", (): void => {
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

  test("Applicant Make a request to the court about your case page. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await MakeRequestToCourtAboutCase.makeRequestToCourtAboutCase({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      isApplicant: true,
      applicationSubmittedBy: "Citizen",
    });
  });
});
