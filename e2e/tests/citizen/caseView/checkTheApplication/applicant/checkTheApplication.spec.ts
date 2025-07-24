import { test } from "../../../../fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CheckTheApplication } from "../../../../../journeys/citizen/caseView/checkTheApplication/checkTheApplication.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant confirm contact details tests", (): void => {
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

  test("Applicant Check The Application. @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await CheckTheApplication.checkTheApplication({
      page,
      browser,
      caseRef: ccdRef,
      accessibilityTest: true,
      isApplicant: true,
      applicationSubmittedBy: "Solicitor",
    });
  });
});
