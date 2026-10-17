import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { basename } from "path";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.ts";
import { ExuiMediaViewerPage } from "../../../../pageObjects/pages/exui/exuiMediaViewer.po.ts";

interface CreateABundleTestData {
  caseType: solicitorCaseCreateType;
  describeTitle: string;
  orderType: OrderTypes;
  issueToLocalCourt: boolean;
}

const testData: CreateABundleTestData[] = [
  {
    caseType: "C100",
    describeTitle: "Create a Bundle - C100 Case Type",
    orderType:
      "Child arrangements, specific issue or prohibited steps order (C43)",
    issueToLocalCourt: true,
  },
  {
    caseType: "FL401",
    describeTitle: "Create a Bundle - FL401 Case Type",
    orderType: "Power of arrest (FL406)",
    issueToLocalCourt: false,
  },
];

const uploadedDocuments: {
  documentParty: string;
  documentCategory: string;
  cfvFolderPath: string[];
}[] = [
  {
    documentParty: "Applicant",
    documentCategory: "Applicant application",
    cfvFolderPath: [
      "Applications",
      "Applicant documents",
      "Applicant application",
    ],
  },
  {
    documentParty: "Applicant",
    documentCategory: "Medical reports",
    cfvFolderPath: ["Expert report", "Medical reports"],
  },
  {
    documentParty: "Respondent",
    documentCategory: "Other witness statements",
    cfvFolderPath: [
      "Witness statement and evidence",
      "Other witness statements",
    ],
  },
];

const uploadedDocumentFileName: string = basename(config.testPdfFile);

const bundleExclusionCategory: string = "Other witness statements";
const bundleExclusionParty: string = "Respondent";
const confidentialDocumentFileName: string = `Confidential_${uploadedDocumentFileName}`;

const movedDocument = {
  originalDropdownLabel: `Applications -> Applicant documents -> Applicant application -> ${uploadedDocumentFileName}`,
  originalFolderPath: [
    "Applications",
    "Applicant documents",
    "Applicant application",
  ],
  newCategory: "Position statements",
  newName: "movedDocument",
  newFolderPath: ["Preliminary Documents", "Position statements"],
};

async function uploadDocumentWithoutChecks(
  caseWorker: CaseWorkerPagesGroup,
  documentParty: string,
  documentCategory: string,
  confidentialDocument: boolean,
): Promise<void> {
  const { summaryPage, manageDocuments } = caseWorker;
  const {
    manageDocumentsNew1Page,
    manageDocumentsNewSubmitPage,
    manageDocumentsNewConfirmPage,
  } = manageDocuments;

  await summaryPage.chooseEventFromDropdown("Manage documents");
  await manageDocumentsNew1Page.heading2.waitFor();
  await manageDocumentsNew1Page.fillDocumentSlot({
    index: 0,
    documentParty,
    documentCategory,
    confidentialDocument,
    restrictDocument: false,
  });
  await manageDocumentsNew1Page.clickContinue();
  await manageDocumentsNewSubmitPage.clickSaveAndContinue();
  await manageDocumentsNewConfirmPage.clickCloseAndReturnToCaseDetails();
}

testData.forEach((data) => {
  test.describe(data.describeTitle, () => {
    test.describe.configure({ timeout: 900_000 });
    let caseRef: string = "";

    test.beforeEach(
      async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
        caseRef = (
          await manageCasesEventUtils.submitTSSolicitorCase(data.caseType)
        ).caseRef;

        if (data.issueToLocalCourt) {
          await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
        }

        await manageCasesEventUtils.sendToGatekeeper(caseRef, data.caseType);
        await manageCasesEventUtils.createOrder({
          caseRef,
          orderType: data.orderType,
          isDraft: false,
          doServe: false,
        });
        await manageCasesEventUtils.serviceOfApplication(
          caseRef,
          data.caseType,
          data.orderType,
        );
        await manageCasesEventUtils.confidentialityCheck(caseRef);
        await navigationUtils.goToCase(
          caseWorker.page,
          config.manageCasesBaseURLCase,
          caseRef,
          "tasks",
        );
      },
    );

    test(`Complete Task - Create a Bundle - ${data.orderType} with accessibility test. @nightly @regression @accessibility`, async ({
      caseWorker,
    }): Promise<void> => {
      const {
        summaryPage,
        createABundle,
        bundlesPage,
        caseFileViewPage,
        renameDocuments,
      } = caseWorker;

      for (const document of uploadedDocuments) {
        await uploadDocumentWithoutChecks(
          caseWorker,
          document.documentParty,
          document.documentCategory,
          false,
        );
      }

      await uploadDocumentWithoutChecks(
        caseWorker,
        bundleExclusionParty,
        bundleExclusionCategory,
        true,
      );
      await uploadDocumentWithoutChecks(
        caseWorker,
        bundleExclusionParty,
        bundleExclusionCategory,
        false,
      );

      await summaryPage.chooseEventFromDropdown("Create a bundle");

      await createABundle.page1.assertPageContents();
      await createABundle.page1.clickCreateBundle();

      await createABundle.submitPage.assertPageContents();
      await createABundle.submitPage.clickCreateBundle();
      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
        "Create a bundle",
      );

      await bundlesPage.goToPage();
      await bundlesPage.waitForBundleStitched();
      await bundlesPage.assertBundleContents();

      const pdfPage = await bundlesPage.openStitchedBundle();
      const mediaViewer = new ExuiMediaViewerPage(pdfPage);
      await mediaViewer.waitForLoad();
      await mediaViewer.toolbar.pageDownBtn.click();
      await mediaViewer.verifyTextPresent(uploadedDocumentFileName);
      await mediaViewer.verifyTextNotPresent(confidentialDocumentFileName);
      await pdfPage.close();

      await caseFileViewPage.goToPage();
      for (const document of uploadedDocuments) {
        await caseFileViewPage.verifyDocumentInFolder(
          document.cfvFolderPath,
          uploadedDocumentFileName,
        );
      }

      await summaryPage.chooseEventFromDropdown("Rename documents");
      await renameDocuments.page1.selectDocument(
        movedDocument.originalDropdownLabel,
      );
      await renameDocuments.page2.changeCategoryAndName(
        movedDocument.newCategory,
        movedDocument.newName,
      );
      await renameDocuments.submitPage.submit();

      await caseFileViewPage.goToPage();
      await caseFileViewPage.verifyDocumentNotInFolder(
        movedDocument.originalFolderPath,
        movedDocument.newName,
      );
      await caseFileViewPage.verifyDocumentInFolder(
        movedDocument.newFolderPath,
        movedDocument.newName,
      );
    });
  });
});
