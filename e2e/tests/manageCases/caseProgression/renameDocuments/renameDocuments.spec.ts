import { test } from "../../../fixtures.ts";
import { caseTypes } from "../../../../common/types.js";
import { BasicCaseData } from "../../../../utils/manageCaseEvent.utils.js";
import Config from "../../../../utils/config.utils.js";

caseTypes.forEach((caseType) => {
  test.describe("Rename documents for cases", () => {
    let caseData: BasicCaseData;

    test.beforeEach(
      async ({ courtAdminStoke, manageCasesEventUtils, navigationUtils }) => {
        caseData = await manageCasesEventUtils.submitTSSolicitorCase(caseType);
        await navigationUtils.goToCase(
          courtAdminStoke.page,
          Config.manageCasesBaseURLCase,
          caseData.caseRef,
        );
      },
    );

    test(`Rename Documents for ${caseType} case @nightly @regression`, async ({
      courtAdminStoke,
    }): Promise<void> => {
      const expectedDocumentName = "Test_Document_New_Name";

      const {
        summaryPage,
        caseFileViewPage,
        caseDocumentsPage,
        renameDocuments,
      } = courtAdminStoke;

      await summaryPage.chooseEventFromDropdown("Rename documents");
      await renameDocuments.renameDocuments1Page.assertPageContents();
      await renameDocuments.renameDocuments1Page.verifyAccessibility();
      await renameDocuments.renameDocuments1Page.selectDocument();
      await renameDocuments.renameDocuments1Page.clickContinue();

      await renameDocuments.renameDocuments2Page.assertPageContents();
      await renameDocuments.renameDocuments2Page.verifyAccessibility();
      await renameDocuments.renameDocuments2Page.fillNewDocumentName(
        expectedDocumentName,
      );
      // Capture the existing CFV folder path
      const folderPath: string[] =
        await renameDocuments.renameDocuments2Page.getSelectedDocumentPath();
      await renameDocuments.renameDocuments2Page.clickContinue();

      await renameDocuments.submitPage.assertPageContents(
        ["caseProgression", "renameDocuments"],
        `${caseType}-rename-documents`,
      );
      await renameDocuments.submitPage.verifyAccessibility();
      await renameDocuments.submitPage.clickSubmit();

      await summaryPage.alertBanner.assertEventAlert(
        caseData.caseRef,
        "Rename documents",
      );

      // checking the Case Documents tab
      await caseDocumentsPage.goToPage();
      await caseDocumentsPage.assertFinalDocuments([
        expectedDocumentName + ".pdf",
      ]);

      //validate document in Case File View Tab
      await caseFileViewPage.goToPage();
      await caseFileViewPage.validateDocumentExistsInCFV(
        folderPath,
        expectedDocumentName + ".pdf",
      );
    });
  });
});
