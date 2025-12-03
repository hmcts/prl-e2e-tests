import { test } from "../../../fixtures/fixtures.ts";
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
      });
    },
  );
});
