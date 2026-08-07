import { expect, test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";

test.describe.configure({ mode: "serial" });

const LA_DOCUMENTS: Array<{
  documentCategory: string;
  confidentialDocument: boolean;
  restrictDocument: boolean;
  filePath: string;
}> = [
  {
    documentCategory: "Child Impact Report 1",
    confidentialDocument: true,
    restrictDocument: false,
    filePath: Config.testPdfFileCR1,
  },
  {
    documentCategory: "Child Impact Report 2",
    confidentialDocument: false,
    restrictDocument: true,
    filePath: Config.testPdfFileCR2,
  },
  {
    documentCategory: "CIR extension request",
    confidentialDocument: false,
    restrictDocument: false,
    filePath: Config.testPdfFileExtention,
  },
  {
    documentCategory: "CIR transfer request",
    confidentialDocument: false,
    restrictDocument: false,
    filePath: Config.testPdfFileRequest,
  },
  {
    documentCategory: "Section 7 report",
    confidentialDocument: false,
    restrictDocument: false,
    filePath: Config.testPdfFileSection7,
  },
];

test.describe("Add local authority event for C100 case tests as a Local Authority User.", () => {
  let caseRef: string = "";

  test.beforeAll(async ({ manageCasesEventUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
  });

  test("Complete Add Local Authority with accessibility test. @nightly @regression @accessibility", async ({
    navigationUtils,
    caseWorker,
    manageOrgUtils,
    localAuthority,
  }): Promise<void> => {
    const organisationName =
      "Local Authority Private Law AAT Test Organisation";
    const organisationAddress = [
      "7 Fitzhamon Embankment",
      "Caerdydd",
      "United Kingdom",
      "CF11 6AN",
    ];

    await navigationUtils.goToCase(
      caseWorker.page,
      Config.manageCasesBaseURLCase,
      caseRef,
    );

    await caseWorker.summaryPage.chooseEventFromDropdown("Add local authority");

    await caseWorker.addLocalAuthority.addLocalAuthority1Page.assertPageContents();
    await caseWorker.addLocalAuthority.addLocalAuthority1Page.verifyAccessibility();
    await caseWorker.addLocalAuthority.addLocalAuthority1Page.searchSelectAndContinue(
      organisationName,
    );

    await caseWorker.addLocalAuthority.addLocalAuthoritySubmitPage.assertPageContents(
      ["caseProgression", "addLocalAuthority"],
      "submit",
    );
    await caseWorker.addLocalAuthority.addLocalAuthoritySubmitPage.assertOrganisationDetails(
      organisationName,
      organisationAddress,
    );
    await caseWorker.addLocalAuthority.addLocalAuthoritySubmitPage.submitForm();

    await caseWorker.addLocalAuthority.addLocalAuthorityConfirmPage.assertPageContents();
    await caseWorker.addLocalAuthority.addLocalAuthorityConfirmPage.verifyAccessibility();

    await caseWorker.summaryPage.goToPage();
    await caseWorker.summaryPage.assertLocalAuthoritySection(organisationName);

    // Assign the case to the local authority user via the case-assignments API
    await manageOrgUtils.assignCaseToUser(
      caseRef,
      process.env.LOCAL_AUTHORITY_USERNAME,
    );

    // LA user checks they can find the case after it has been assigned to them
    await localAuthority.page.goto(`${Config.manageCasesBaseURL}/cases`);
    await expect
      .poll(
        async () => {
          const visible = await localAuthority.page
            .locator("ccd-search-result")
            .isVisible();
          if (!visible) {
            await localAuthority.page.reload();
          }
          return visible;
        },
        { intervals: [5_000], timeout: 60_000 },
      )
      .toBeTruthy();

    const dashedRef = caseRef.match(/.{1,4}/g)?.join("-") ?? caseRef;
    await localAuthority.page
      .locator(`a[aria-label="go to case with Case reference:${dashedRef}"]`)
      .click();

    await localAuthority.page.waitForLoadState("domcontentloaded");
    await expect(localAuthority.page.locator("ccd-case-header")).toBeVisible();
    await expect(localAuthority.page.locator("ccd-case-header")).toContainText(
      dashedRef,
    );
  });

  test("Local authority uploads documents and admin reviews tasks. @nightly @regression", async ({
    localAuthority,
    navigationUtils,
  }): Promise<void> => {
    const { page, summaryPage } = localAuthority;

    await navigationUtils.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      caseRef,
    );

    await summaryPage.chooseEventFromDropdown("Manage documents");

    const {
      manageDocumentsNew1Page,
      manageDocumentsNewSubmitPage,
      manageDocumentsNewConfirmPage,
    } = localAuthority.manageDocuments;

    for (let i = 0; i < LA_DOCUMENTS.length; i++) {
      const doc = LA_DOCUMENTS[i];
      if (i > 0) {
        await manageDocumentsNew1Page.addAnotherDocument(i);
      }
      await manageDocumentsNew1Page.fillDocumentSlot({
        index: i,
        documentParty: "Local authority",
        documentCategory: doc.documentCategory,
        confidentialDocument: doc.confidentialDocument,
        restrictDocument: doc.restrictDocument,
        filePath: doc.filePath,
      });
    }
    await manageDocumentsNew1Page.clickContinue();

    await manageDocumentsNewSubmitPage.assertDocumentsPageContents(
      "Local authority",
      LA_DOCUMENTS,
    );
    await manageDocumentsNewSubmitPage.verifyAccessibility();
    await manageDocumentsNewSubmitPage.clickSaveAndContinue();

    await manageDocumentsNewConfirmPage.assertPageContents();
    await manageDocumentsNewConfirmPage.verifyAccessibility();
    await manageDocumentsNewConfirmPage.clickCloseAndReturnToCaseDetails();
  });
});
