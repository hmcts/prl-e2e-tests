import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";

const COURT_ADMIN_DOCUMENTS: Array<{
  documentParty: string;
  documentCategory: string;
  confidentialDocument: boolean;
  restrictDocument: boolean;
  filePath: string;
}> = [
  {
    documentParty: "Applicant",
    documentCategory: "Position statements",
    confidentialDocument: true,
    restrictDocument: true,
    filePath: Config.testPdfFilePositionStatement,
  },
  {
    documentParty: "Respondent",
    documentCategory: "Section 16.4 Guardian Report",
    confidentialDocument: false,
    restrictDocument: false,
    filePath: Config.testPdfFileGuardianReport,
  },
  {
    documentParty: "Local authority",
    documentCategory: "MIAM certificate/Exemption",
    confidentialDocument: true,
    restrictDocument: false,
    filePath: Config.testPdfFileMIAMCertificate,
  },
];

test.describe("Manage documents event for C100 case tests as a court admin.", () => {
  let caseRef: string = "";

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
      await navigationUtils.goToCase(
        caseWorker.page,
        Config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  test("Complete Manage Documents uploading documents for the Applicant, Respondent and Local authority in one event — mixing restricted, confidential and unrestricted documents, with accessibility test. @nightly @regression @accessibility", async ({
    caseWorker,
  }): Promise<void> => {
    const {
      summaryPage,
      manageDocuments,
      caseDocumentsPage,
      confidentialDetailsPage,
    } = caseWorker;
    const {
      manageDocumentsNew1Page,
      manageDocumentsNewSubmitPage,
      manageDocumentsNewConfirmPage,
    } = manageDocuments;

    await summaryPage.chooseEventFromDropdown("Manage documents");

    await manageDocumentsNew1Page.assertPageContents();

    for (let i = 0; i < COURT_ADMIN_DOCUMENTS.length; i++) {
      const doc = COURT_ADMIN_DOCUMENTS[i];
      if (i > 0) {
        await manageDocumentsNew1Page.addAnotherDocument(i);
      }
      await manageDocumentsNew1Page.fillDocumentSlot({
        index: i,
        documentParty: doc.documentParty,
        documentCategory: doc.documentCategory,
        confidentialDocument: doc.confidentialDocument,
        restrictDocument: doc.restrictDocument,
        filePath: doc.filePath,
      });
    }
    await manageDocumentsNew1Page.clickContinue();

    await manageDocumentsNewSubmitPage.assertDocumentsPageContents(
      "", // unused — every entry in COURT_ADMIN_DOCUMENTS sets its own documentParty
      COURT_ADMIN_DOCUMENTS,
    );
    await manageDocumentsNewSubmitPage.verifyAccessibility();
    await manageDocumentsNewSubmitPage.clickSaveAndContinue();

    await manageDocumentsNewConfirmPage.assertPageContents();
    await manageDocumentsNewConfirmPage.verifyAccessibility();
    await manageDocumentsNewConfirmPage.clickCloseAndReturnToCaseDetails();

    // Documents that are neither confidential nor restricted show up on the
    // Case documents tab straight away.
    const caseDocumentsEligibleDocuments = COURT_ADMIN_DOCUMENTS.filter(
      (doc) => !doc.confidentialDocument && !doc.restrictDocument,
    );
    await caseDocumentsPage.goToPage();
    await caseDocumentsPage.assertCourtStaffUploadedDocuments(
      caseDocumentsEligibleDocuments,
    );

    // Confidential and/or restricted documents show up on the Confidential
    // details tab instead.
    const confidentialDetailsEligibleDocuments = COURT_ADMIN_DOCUMENTS.filter(
      (doc) => doc.confidentialDocument || doc.restrictDocument,
    );
    if (confidentialDetailsEligibleDocuments.length > 0) {
      await confidentialDetailsPage.goToPage();
      for (const doc of confidentialDetailsEligibleDocuments) {
        await confidentialDetailsPage.assertManageDocumentsSection({
          documentParty: doc.documentParty,
          documentCategory: doc.documentCategory,
          restrictDocument: doc.restrictDocument,
          confidentialDocument: doc.confidentialDocument,
          filePath: doc.filePath,
        });
      }
    }
  });
});
