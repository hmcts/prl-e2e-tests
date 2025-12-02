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
        const {
          page,
          tasksPage,
          fl401AddCaseNumber1Page,
          fl401AddCaseNumberSubmitPage,
          summaryPage,
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
        );

        await fl401AddCaseNumber1Page.assertPageContents();
        await fl401AddCaseNumber1Page.verifyAccessibility();
        await fl401AddCaseNumber1Page.fillInFields(familyManNumber);
        await fl401AddCaseNumber1Page.clickContinue();

        await fl401AddCaseNumberSubmitPage.assertPageContents(
          ["caseProgression", "checkApplication"],
          snapshotName,
        );
        await fl401AddCaseNumberSubmitPage.verifyAccessibility();
        await fl401AddCaseNumberSubmitPage.clickSaveAndContinue();

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
