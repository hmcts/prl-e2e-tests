import { test, expect } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.describe("Check Application task for DA Solicitor case tests.", () => {
  let caseNumber: string;

  test.beforeEach(async ({ browser, caseEventUtils }) => {
    caseNumber = await caseEventUtils.createDACase(browser);
  });

  [{ familyManNumber: "1234", snapshotName: "check-application" }].forEach(
    ({ familyManNumber, snapshotName }) => {
      test("Complete Task - Check Application with accessibility test. @nightly @accessibility @regression", async ({
        caseWorker,
        navigationUtils,
      }): Promise<void> => {
        const { page, tasksPage, fl401AddCaseNumber, summaryPage } = caseWorker;

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
        
        await page.locator("mat-tab-header").getByText("History", { exact: true }).click();
        await expect(page.locator("ccd-event-log-details")).toBeVisible();
        await page.getByRole("link", { name: /Add case number/i }).click();
        
        await expect(page.locator("ccd-event-log-details")).toContainText("End state");
        const endStateValue = page.locator(
         "//ccd-event-log-details//tr[th[normalize-space()='End state']]/td"
        );
        await expect(endStateValue).toBeVisible();
        await expect(endStateValue).toContainText(/Case issued/i);
    },
  );
},
  );
});
