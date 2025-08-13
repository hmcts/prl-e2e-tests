import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Check Application task for DA Solicitor case tests.", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, caseAccessViewPage }) => {
      caseNumber = await caseEventUtils.createDACase(browser);
      await Helpers.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "tasks",
      );
      await caseAccessViewPage.exuiHeader.checkIsVisible();
    },
  );

  test("Complete Task - Check Application with accessibility test. @nightly @accessibility @regression", async ({
    caseAccessViewPage,
    fl401AddCaseNumber1Page,
    fl401AddCaseNumberSubmitPage,
  }): Promise<void> => {
    await caseAccessViewPage.exuiTasksContainer.assignTaskToMeAndTriggerNextSteps(
      "Check Application",
      "Add Case Number",
    );
    await fl401AddCaseNumber1Page.checkPageContent();
    await fl401AddCaseNumber1Page.fillInFields();
    await fl401AddCaseNumber1Page.continueButton.click();
    await fl401AddCaseNumberSubmitPage.checkPageContents();
    await fl401AddCaseNumberSubmitPage.saveAndContinueButton.click();
    await caseAccessViewPage.alertBanner.assertEventAlert(
      caseNumber,
      "Add case number",
    );
    await caseAccessViewPage.caseHeader.checkFamilyManNumber("1234");
  });
});
