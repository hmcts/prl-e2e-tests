import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { MakeRequestToCourtAboutCase } from "../../../../../journeys/citizen/caseView/makeRequestToCourtAboutCase/respondent/makeRequestToCourtAboutCase.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent Make a request to the court about your case tests", (): void => {
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
      applicationSubmittedBy: "Solicitor",
    });
  });
});
