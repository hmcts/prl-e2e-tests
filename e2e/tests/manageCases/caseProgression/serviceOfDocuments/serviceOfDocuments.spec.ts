import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.ts";
import { yesNoNA } from "../../../../common/types.ts";

interface ServiceOfDocumentsOptions {
  withCaseDoc: boolean;
  additionalDoc: boolean;
  additionalRecipient: boolean;
  personallyServed: yesNoNA;
  servedByPost: boolean;
  checkDocuments: boolean;
  snapshotName: string;
}

interface CaseDocument {
  documentParty: string;
  documentCategory: string;
  confidentialDocument: boolean;
  restrictDocument: boolean;
  filePath: string;
}

// The document Service of documents page1 expects to find in its "case
// document" dropdown once uploaded via Manage documents.
const APPLICANT_POSITION_STATEMENT: CaseDocument = {
  documentParty: "Applicant",
  documentCategory: "Position statements",
  confidentialDocument: false,
  restrictDocument: false,
  filePath: config.testPdfFile,
};

test.describe("Service of Document event for DA Solicitor case tests as court admin.", () => {
  let caseRef: string = "";

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
        .caseRef;
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  test(`Complete 'Service of Documents' with following options: 
  Additional documents added: no, 
  Witness statement (case doc) added to event: no, 
  Documents should be personally served: Yes, 
  Serve to an additional recipient: yes, 
  Additional recipients served by post or email: post, 
  Documents should be check by manager: yes. @nightly`, async ({
    caseWorker,
  }): Promise<void> => {
    await completeServiceOfDocuments(caseWorker, {
      withCaseDoc: false,
      additionalDoc: false,
      additionalRecipient: true,
      personallyServed: "Yes",
      servedByPost: true,
      checkDocuments: true,
      snapshotName: "service-of-documents-personal-service-post-checked",
    });
  });

  test(`Complete 'Service of Documents' with following options: 
  Additional documents added: yes
  Witness statement (case doc) added to event: yes
  Documents should be personally served: No, 
  Serve to an additional recipient: yes, 
  Additional recipients served by post or email: email, 
  Documents should be check by manager: no. @regression`, async ({
    caseWorker,
  }): Promise<void> => {
    await completeServiceOfDocuments(caseWorker, {
      withCaseDoc: true,
      additionalDoc: true,
      additionalRecipient: true,
      personallyServed: "No",
      servedByPost: false,
      checkDocuments: false,
      snapshotName: "service-of-documents-additional-doc-email-unchecked",
    });
  });

  test(`Complete 'Service of Documents' with following options: 
  Additional documents added: no
  Witness statement (case doc) added to event: no
  Documents should be personally served: Not applicable, 
  Serve to an additional recipient: no, 
  Documents should be check by manager: no. @regression`, async ({
    caseWorker,
  }): Promise<void> => {
    await completeServiceOfDocuments(caseWorker, {
      withCaseDoc: false,
      additionalDoc: false,
      additionalRecipient: false,
      personallyServed: "Not applicable",
      servedByPost: false,
      checkDocuments: false,
      snapshotName: "service-of-documents-not-applicable-no-recipient",
    });
  });
});

async function completeServiceOfDocuments(
  caseWorker: CaseWorkerPagesGroup,
  {
    withCaseDoc,
    additionalDoc,
    additionalRecipient,
    personallyServed,
    servedByPost,
    checkDocuments,
    snapshotName,
  }: ServiceOfDocumentsOptions,
): Promise<void> {
  const { summaryPage, serviceOfDocuments } = caseWorker;
  const { page1, page2, page3, submitPage } = serviceOfDocuments;

  if (withCaseDoc) {
    await uploadCaseDocument(caseWorker, APPLICANT_POSITION_STATEMENT);
  }

  await summaryPage.chooseEventFromDropdown("Service of documents");

  await page1.assertPageContents();
  await page1.selectDocumentsToServe({ additionalDoc, withCaseDoc });
  // await page1.verifyAccessibility(); FPVTL-3627 - “Upload additional documents” file input has no accessible label
  await page1.clickContinue();

  await page2.assertPageContents();
  await page2.selectPersonalService(personallyServed);
  if (additionalRecipient) {
    await page2.addAdditionalRecipient({ servedByPost });
  }
  await page2.verifyAccessibility();
  await page2.clickContinue();

  await page3.assertPageContents();
  await page3.selectDocumentCheckOption(checkDocuments);
  await page3.verifyAccessibility();
  await page3.clickContinue();

  await submitPage.assertPageContents(
    ["caseProgression", "serviceOfDocuments"],
    snapshotName,
  );
  await submitPage.verifyAccessibility();
  await submitPage.clickSaveAndContinue();
}

async function uploadCaseDocument(
  caseWorker: CaseWorkerPagesGroup,
  doc: CaseDocument,
): Promise<void> {
  const { summaryPage, manageDocuments, caseDocumentsPage } = caseWorker;
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

  await caseDocumentsPage.goToPage();
  await caseDocumentsPage.assertCourtStaffUploadedDocuments([doc]);
}
