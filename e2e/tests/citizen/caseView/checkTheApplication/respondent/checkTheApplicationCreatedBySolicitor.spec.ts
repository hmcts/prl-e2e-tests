import Config from "../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CheckTheApplication } from "../../../../../journeys/citizen/caseView/checkTheApplication/checkTheApplication.ts";
import { test } from "../../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Respondent confirm contact details tests - Solicitor created application", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Respondent Check the Solicitor created application. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    await CheckTheApplication.checkTheApplication({
      page,
      browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      isApplicant: false,
      applicationSubmittedBy: "Solicitor",
    });
  });
});
