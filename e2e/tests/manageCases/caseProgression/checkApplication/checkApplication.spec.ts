import { test, expect } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.describe("Check Application task for DA Solicitor case tests.", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseNumber = await manageCasesEventUtils.submitSolicitorCase("FL401");
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "tasks",
      );
    },
  );

  [{ familyManNumber: "1234", snapshotName: "check-application" }].forEach(
    ({ familyManNumber, snapshotName }) => {
      test("Complete Task - Check Application with accessibility test. @nightly @accessibility @regression", async ({
        caseWorker,
      }): Promise<void> => {
        const { tasksPage, fl401AddCaseNumber, summaryPage, historyPage } =
          caseWorker;

        await tasksPage.assignTaskToMeAndTriggerNextSteps(
          "Check Application",
          "Add Case Number",
          "caseWorker",
        );

        await fl401AddCaseNumber.page1.assertPageContents();
        await fl401AddCaseNumber.page1.verifyAccessibility();
        await fl401AddCaseNumber.page1.fillInFields(familyManNumber);
        await fl401AddCaseNumber.page1.clickContinue();

        await fl401AddCaseNumber.submitPage.assertPageContents(
          ["caseProgression", "checkApplication"],
          snapshotName,
        );
        await fl401AddCaseNumber.submitPage.verifyAccessibility();
        await fl401AddCaseNumber.submitPage.clickSaveAndContinue();

        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Add case number",
        );
        await summaryPage.caseHeader.assertFamilyManNumberIsVisible(
          familyManNumber,
        );

        await historyPage.goToPage();
        await expect(historyPage.eventHistoryName).toBeVisible();
        await expect(historyPage.endStateRow).toBeVisible();
        await expect(historyPage.endStateValue).toBeVisible();
      });
    },
  );
});
