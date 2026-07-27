import { test, expect } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.describe("Respond to the application (C7) as the Respondent Solicitor tests.", () => {
  let caseNumber: string;

  test.beforeEach(async ({ browser, caseEventUtils }) => {
      caseNumber = await caseEventUtils.createCACaseServiceOfApplication(browser);
  });
    
  [{ familyManNumber: "1234", snapshotName: "c7-section1" }].forEach(
    ({ familyManNumber, snapshotName }) => {
      test("Complete C7 - Respond to the application with accessibility test. @nightly @accessibility @regression", async ({
        caseWorker,
        navigationUtils,
      }): Promise<void> => {
        const {
          page,
          tasksPage,
          c100noticeOfChange,
          summaryPage,
          historyPage,
        } = caseWorker;

        await navigationUtils.goToCase(
          page, // accessing the destructured page property
          config.manageCasesBaseURLCase,
          caseNumber,
          "tasks",
        );

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
