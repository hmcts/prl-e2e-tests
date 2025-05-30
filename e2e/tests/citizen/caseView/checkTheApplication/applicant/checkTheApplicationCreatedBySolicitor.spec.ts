import { test } from "@playwright/test";
import Config from "../../../../../utils/config.utils.ts";
import { SolicitorDACaseCreator } from "../../../../../common/caseHelpers/solicitorDACaseCreator.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CheckTheApplication } from "../../../../../journeys/citizen/caseView/checkTheApplication/checkTheApplication.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant confirm contact details tests - Solicitor created application", (): void => {
  test.slow();
  let ccdRef: string;

  test.beforeEach(async ({ page, browser }) => {
    await page.goto(Config.manageCasesBaseURLCase);
    const solicitorPage = await Helpers.openNewBrowserWindow(
      browser,
      "solicitor",
    );
    await solicitorPage.goto(Config.manageCasesBaseURLCase);
    ccdRef =
      await SolicitorDACaseCreator.createCaseStatementOfTruthAndSubmit(
        solicitorPage,
      );
    await solicitorPage.close();
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Applicant check the Solicitor created application. @regression @accessibility @nightly", async ({
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
