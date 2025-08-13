import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Check Application task for DA Solicitor case tests.", () => {
  let caseNumber: string;

  test.beforeEach(async ({ page, browser, caseEventUtils, tasksPage }) => {
    caseNumber = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseNumber,
      "tasks",
    );
    await tasksPage.exuiHeader.checkIsVisible();
  });

  test("Complete Task - Check Application with accessibility test. @nightly @accessibility @regression", async ({
    summaryPage,
    tasksPage,
    fl401AddCaseNumber1Page,
    fl401AddCaseNumberSubmitPage,
  }): Promise<void> => {
    const familManNumber: string = "1234";
    await tasksPage.assignTaskToMeAndTriggerNextSteps(
      "Check Application",
      "Add Case Number",
    );
    await fl401AddCaseNumber1Page.checkPageContent();
    await fl401AddCaseNumber1Page.fillInFields(familManNumber);
    await fl401AddCaseNumber1Page.continueButton.click();
    await fl401AddCaseNumberSubmitPage.checkPageContents();
    await fl401AddCaseNumberSubmitPage.saveAndContinueButton.click();
    await summaryPage.alertBanner.assertEventAlert(
      caseNumber,
      "Add case number",
    );
    await summaryPage.caseHeader.checkFamilyManNumber(familManNumber);
  });
});
