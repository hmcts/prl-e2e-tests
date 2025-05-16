import { test } from "@playwright/test";
import Config from "../../../../../utils/config.ts";
import config from "../../../../../utils/config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { MakeRequestToCourtAboutCase } from "../../../../../journeys/citizen/caseView/makeRequestToCourtAboutCase/respondent/makeRequestToCourtAboutCase.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent Make a request to the court about your case tests", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Respondent Make a request to the court about your case page. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await MakeRequestToCourtAboutCase.makeRequestToCourtAboutCase({
      page: page,
      browser: browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      isApplicant: false,
      applicationSubmittedBy: "Citizen",
    });
  });
});
