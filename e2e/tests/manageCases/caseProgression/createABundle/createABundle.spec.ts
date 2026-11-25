import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import {
  OrderTypes,
  Party,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { ExuiMediaViewerPage } from "../../../../pageObjects/pages/exui/exuiMediaViewer.po.ts";
import {
  DOCUMENTS,
  Document,
} from "../../../../testData/api/manageDocumentsRequestData.ts";

interface CreateABundleTestData {
  caseType: solicitorCaseCreateType;
  describeTitle: string;
  orderType: OrderTypes;
}

const testData: CreateABundleTestData[] = [
  {
    caseType: "C100",
    describeTitle: "Create a Bundle - C100 Case Type",
    orderType:
      "Child arrangements, specific issue or prohibited steps order (C43)",
  },
  {
    caseType: "FL401",
    describeTitle: "Create a Bundle - FL401 Case Type",
    orderType: "Power of arrest (FL406)",
  },
];

const includedDocuments: {
  party: Party;
  document: Document;
}[] = [
  {
    party: "APPLICANT",
    document: DOCUMENTS.applicantApplication,
  },
  {
    party: "APPLICANT",
    document: DOCUMENTS.medicalReport,
  },
  {
    party: "RESPONDENT",
    document: DOCUMENTS.otherWitnessStatement,
  },
];

const confidentialDocument: {
  party: Party;
  document: Document;
} = {
  party: "RESPONDENT",
  document: DOCUMENTS.confidentialWitnessStatement,
};

const confidentialDocumentFileName: string = `Confidential_${confidentialDocument.document.fileName}`;

testData.forEach((data) => {
  test.describe(data.describeTitle, () => {
    test.describe.configure({ timeout: 900_000 });
    let caseRef: string = "";

    test.beforeEach(
      async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
        caseRef = (
          await manageCasesEventUtils.submitTSSolicitorCase(data.caseType)
        ).caseRef;

        if (data.caseType === "C100") {
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
      manageCasesEventUtils,
    }): Promise<void> => {
      const { summaryPage, createABundle, bundlesPage } = caseWorker;

      for (const document of includedDocuments) {
        await manageCasesEventUtils.uploadDocument(caseRef, {
          caseType: data.caseType,
          party: document.party,
          document: document.document,
          isConfidential: "No",
          isRestricted: "No",
        });
      }

      await manageCasesEventUtils.uploadDocument(caseRef, {
        caseType: data.caseType,
        party: confidentialDocument.party,
        document: confidentialDocument.document,
        isConfidential: "Yes",
        isRestricted: "No",
      });

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
      for (const document of includedDocuments) {
        await mediaViewer.verifyTextPresent(document.document.fileName);
      }
      await mediaViewer.verifyTextNotPresent(confidentialDocumentFileName);
      await pdfPage.close();
    });
  });
});
