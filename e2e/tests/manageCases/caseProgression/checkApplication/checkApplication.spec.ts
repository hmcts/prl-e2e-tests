import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Check Application task for DA Solicitor case tests.", () => {
  let caseNumber: string;

  test.beforeEach(async ({ browser, caseEventUtils, navigationUtils }) => {
    caseNumber = await caseEventUtils.createDACase(browser);
    await navigationUtils.goToCase(
      config.manageCasesBaseURLCase,
      caseNumber,
      "tasks",
    );
  });

  [{ familyManNumber: "1234", snapshotName: "check-application" }].forEach(
    ({ familyManNumber, snapshotName }) => {
      test("Complete Task - Check Application with accessibility test. @nightly @accessibility @regression", async ({
        summaryPage,
        tasksPage,
        fl401AddCaseNumber1Page,
        fl401AddCaseNumberSubmitPage,
        axeUtils,
      }): Promise<void> => {
        await tasksPage.exuiHeader.checkEuiHeaderIsVisible();
        await tasksPage.assignTaskToMeAndTriggerNextSteps(
          "Check Application",
          "Add Case Number",
        );
        await fl401AddCaseNumber1Page.assertPageContents();
        await axeUtils.audit();
        await fl401AddCaseNumber1Page.fillInFields(familyManNumber);
        await fl401AddCaseNumber1Page.clickContinue();
        await fl401AddCaseNumberSubmitPage.assertPageContents(snapshotName);
        await axeUtils.audit();
        await fl401AddCaseNumberSubmitPage.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Add case number",
        );
        await summaryPage.caseHeader.assertFamilyManNumberIsVisible(
          familyManNumber,
        );
      });
    },
  );
});
