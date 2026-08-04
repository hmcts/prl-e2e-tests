import { expect, test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import { ManageDocumentsNew1Page } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNew1Page.ts";
import { ManageDocumentsNewSubmitPage } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNewSubmit.ts";
import { ManageDocumentsNewConfirmPage } from "../../../../pages/manageCases/caseProgression/manageDocuments/manageDocumentsNewConfirmPage.ts";

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
      "",
    );
    // await caseWorker.addLocalAuthority.addLocalAuthoritySubmitPage.verifyAccessibility();  // TODO add ticket failing accessibility
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

    // TODO: These manage documents pages should become page objects and this functionality should be moved into those page objects
    for (let i = 0; i < LA_DOCUMENTS.length; i++) {
      const doc = LA_DOCUMENTS[i];
      if (i > 0) {
        const addNewBtn = page.locator(
          "#manageDocuments button.write-collection-add-item__bottom",
        );
        await addNewBtn.scrollIntoViewIfNeeded();
        await addNewBtn.click();
        await localAuthority.page
          .locator(
            `#manageDocuments_${i}_documentRelatedToCaseCheckbox-RELATED_TO_CASE`,
          )
          .waitFor({ state: "visible", timeout: 10_000 });
      }
      await ManageDocumentsNew1Page.fillDocumentSlot({
        page: localAuthority.page,
        index: i,
        documentParty: "Local authority",
        documentCategory: doc.documentCategory,
        confidentialDocument: doc.confidentialDocument,
        restrictDocument: doc.restrictDocument,
        filePath: doc.filePath,
      });
    }

    await ManageDocumentsNew1Page.clickContinue(localAuthority.page);

    await ManageDocumentsNewSubmitPage.manageDocumentsNewSubmitPage({
      page: localAuthority.page,
      accessibilityTest: true,
      documentParty: "Local authority",
      documentCategory: LA_DOCUMENTS[0].documentCategory,
      restrictDocument: LA_DOCUMENTS[0].restrictDocument,
      confidentialDocument: LA_DOCUMENTS[0].confidentialDocument,
      documents: LA_DOCUMENTS,
    });

    await ManageDocumentsNewConfirmPage.manageDocumentsNewConfirmPage({
      page: localAuthority.page,
      accessibilityTest: true,
    });
  });
});
