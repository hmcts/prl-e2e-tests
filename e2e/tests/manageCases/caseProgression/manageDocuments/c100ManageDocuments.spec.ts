import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.ts";
import { NavigationUtils } from "../../../../utils/navigation.utils.ts";

interface CourtAdminDocument {
  documentParty: string;
  documentCategory: string;
  confidentialDocument: boolean;
  restrictDocument: boolean;
  filePath: string;
}

const APPLICANT_POSITION_STATEMENT: CourtAdminDocument = {
  documentParty: "Applicant",
  documentCategory: "Position statements",
  confidentialDocument: true,
  restrictDocument: true,
  filePath: Config.testPdfFilePositionStatement,
};

const RESPONDENT_GUARDIAN_REPORT: CourtAdminDocument = {
  documentParty: "Respondent",
  documentCategory: "Section 16.4 Guardian Report",
  confidentialDocument: false,
  restrictDocument: false,
  filePath: Config.testPdfFileGuardianReport,
};

const LOCAL_AUTHORITY_MIAM_CERTIFICATE: CourtAdminDocument = {
  documentParty: "Local authority",
  documentCategory: "MIAM certificate/Exemption",
  confidentialDocument: true,
  restrictDocument: false,
  filePath: Config.testPdfFileMIAMCertificate,
};

async function uploadDocumentAndVerify(
  caseWorker: CaseWorkerPagesGroup,
  navigationUtils: NavigationUtils,
  caseRef: string,
  doc: CourtAdminDocument,
): Promise<void> {
  await navigationUtils.goToCase(
    caseWorker.page,
    Config.manageCasesBaseURLCase,
    caseRef,
  );

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
  await manageDocumentsNew1Page.fillDocumentSlot({
    index: 0,
    documentParty: doc.documentParty,
    documentCategory: doc.documentCategory,
    confidentialDocument: doc.confidentialDocument,
    restrictDocument: doc.restrictDocument,
    filePath: doc.filePath,
  });
  await manageDocumentsNew1Page.clickContinue();

  await manageDocumentsNewSubmitPage.assertDocumentsPageContents(
    doc.documentParty,
    [doc],
  );
  await manageDocumentsNewSubmitPage.verifyAccessibility();
  await manageDocumentsNewSubmitPage.clickSaveAndContinue();

  await manageDocumentsNewConfirmPage.assertPageContents();
  await manageDocumentsNewConfirmPage.verifyAccessibility();
  await manageDocumentsNewConfirmPage.clickCloseAndReturnToCaseDetails();

  // Confidential and/or restricted documents show up on the Confidential
  // details tab; everything else shows up on the Case documents tab straight away.
  if (doc.confidentialDocument || doc.restrictDocument) {
    await confidentialDetailsPage.goToPage();
    await confidentialDetailsPage.assertManageDocumentsSection(doc);
  } else {
    await caseDocumentsPage.goToPage();
    await caseDocumentsPage.assertCourtStaffUploadedDocuments([doc]);
  }
}

test.describe("Manage documents event for C100 case tests as a court admin.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ manageCasesEventUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
  });

  test("Court admin uploads a confidential and restricted Position statement for the Applicant, with accessibility test. @nightly @regression @accessibility", async ({
    caseWorker,
    navigationUtils,
  }): Promise<void> => {
    await uploadDocumentAndVerify(
      caseWorker,
      navigationUtils,
      caseRef,
      APPLICANT_POSITION_STATEMENT,
    );
  });

  test("Court admin uploads an unrestricted Section 16.4 Guardian Report for the Respondent, with accessibility test. @nightly @regression @accessibility", async ({
    caseWorker,
    navigationUtils,
  }): Promise<void> => {
    await uploadDocumentAndVerify(
      caseWorker,
      navigationUtils,
      caseRef,
      RESPONDENT_GUARDIAN_REPORT,
    );
  });

  test("Court admin uploads a confidential MIAM certificate/Exemption for the Local authority, with accessibility test. @nightly @regression @accessibility", async ({
    caseWorker,
    navigationUtils,
  }): Promise<void> => {
    await uploadDocumentAndVerify(
      caseWorker,
      navigationUtils,
      caseRef,
      LOCAL_AUTHORITY_MIAM_CERTIFICATE,
    );
  });
});
