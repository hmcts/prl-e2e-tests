import Config from "../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CheckTheApplication } from "../../../../../journeys/citizen/caseView/checkTheApplication/checkTheApplication.ts";
import { test } from "../../../../fixtures.ts";
import { ActivateCase } from "../../../../../journeys/citizen/activateCase/activateCase.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Applicant confirm contact details tests - Solicitor created application", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    caseRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test("Applicant check the Solicitor created application. @regression @accessibility @nightly", async ({
    page,
    browser,
  }): Promise<void> => {
    // activate case
    page = await ActivateCase.activateCase({
      page,
      browser,
      caseRef,
      caseUser: "applicant",
      accessibilityTest: false,
      applicationSubmittedBy: "Solicitor",
      isManualSOA: true,
    });

    await CheckTheApplication.checkTheApplication({
      page,
      isApplicant: true,
      applicationSubmittedBy: "Solicitor",
    });
  });
});
