import { test } from "../../../fixtures.ts";
import {
  caseTypes,
  solicitorCaseCreateType,
} from "../../../../common/types.js";
import { BasicCaseData } from "../../../../utils/manageCaseEvent.utils.js";
import Config from "../../../../utils/config.utils.js";

interface RenameDocumentTestData {
  documentToSelect: string;
  cfvPath: string[];
}

const renameDocumentTestData: Record<
  solicitorCaseCreateType,
  RenameDocumentTestData
> = {
  C100: {
    documentToSelect: "C1A_DocumentDraft.pdf",
    cfvPath: ["Applications", "Applicant documents", "Applicant C1A application"],
  },
  FL401: {
    documentToSelect: "FL401FinalDocument.pdf",
    cfvPath: ["Applications", "Applicant documents", "Applicant application"],
  },
};

caseTypes.forEach((caseType) => {
  test.describe("Rename documents for cases", () => {
    let caseData: BasicCaseData;

    const testData = renameDocumentTestData[caseType];

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
      const newDocumentName = "Test_Document_New_Name";
      const expectedDocumentName = `${newDocumentName}.pdf`;

      const {
        summaryPage,
        caseFileViewPage,
        caseDocumentsPage,
        renameDocuments,
      } = courtAdminStoke;

      await summaryPage.chooseEventFromDropdown("Rename documents");
      await renameDocuments.renameDocuments1Page.assertPageContents();
      await renameDocuments.renameDocuments1Page.verifyAccessibility();
      await renameDocuments.renameDocuments1Page.selectDocument(
        testData.documentToSelect,
      );
      await renameDocuments.renameDocuments1Page.clickContinue();

      await renameDocuments.renameDocuments2Page.assertPageContents();
      await renameDocuments.renameDocuments2Page.verifyAccessibility();
      await renameDocuments.renameDocuments2Page.fillNewDocumentName(
        newDocumentName,
      );
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
      await caseDocumentsPage.assertFinalDocuments([expectedDocumentName]);

      //validate document in Case File View Tab
      await caseFileViewPage.goToPage();
      await caseFileViewPage.validateDocumentExistsInCFV(
        testData.cfvPath,
        expectedDocumentName,
      );
    });
  });
});
