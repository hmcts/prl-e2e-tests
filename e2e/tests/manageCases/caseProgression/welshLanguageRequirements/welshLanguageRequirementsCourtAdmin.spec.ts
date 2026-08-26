import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import {
  WelshLanguageRequirementsCaseWorkerScenarios as scenarios,
  WelshLanguageRequirementsScenario,
} from "../../../../testData/ui/welshLanguageRequirements.ts";

test.describe("Welsh Language Requirements task for DA Solicitor case tests as Court Admin.", () => {
  let caseRef: string = "";

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
        .caseRef;
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  scenarios.forEach((scenario: WelshLanguageRequirementsScenario) => {
    test(`Complete Welsh Language Requirements with ${scenario.description}. @regression @accessibility @nightly`, async ({
      caseWorker,
    }): Promise<void> => {
      const { summaryPage, caseDocumentsPage, welshLanguageRequirements } =
        caseWorker;
      const { page1, submitPage } = welshLanguageRequirements;

      // answering the Welsh language requirements event
      await summaryPage.chooseEventFromDropdown("Welsh language requirements");
      await page1.assertPageContents();
      await page1.verifyAccessibility();
      await page1.selectWelshLanguageRequirements(scenario);
      await page1.clickContinue();

      // confirming those answers on check your answers, then saving
      await submitPage.assertPageContents(
        scenario.snapshotPath,
        scenario.snapshotName,
      );
      await submitPage.verifyAccessibility();
      await submitPage.clickSaveAndContinue();

      // CCD returns to the summary tab once the event is saved
      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
        "Welsh language requirements",
      );

      // checking the application documents CCD regenerated as a result
      await caseDocumentsPage.goToPage();
      await caseDocumentsPage.assertFinalDocuments(
        scenario.expectedFinalDocuments,
      );
    });
  });
});
