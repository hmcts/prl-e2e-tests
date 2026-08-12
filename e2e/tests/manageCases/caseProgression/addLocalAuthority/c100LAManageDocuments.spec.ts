import { expect, test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import { CaseNumberUtils } from "../../../../utils/caseNumber.utils.ts";

const caseNumberUtils = new CaseNumberUtils();

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
    const { summaryPage, addLocalAuthority } = caseWorker;
    const {
      addLocalAuthority1Page,
      addLocalAuthoritySubmitPage,
      addLocalAuthorityConfirmPage,
    } = addLocalAuthority;

    const organisationName =
      "Local Authority Private Law AAT Test Organisation";

    await navigationUtils.goToCase(
      caseWorker.page,
      Config.manageCasesBaseURLCase,
      caseRef,
    );

    await summaryPage.chooseEventFromDropdown("Add local authority");

    await addLocalAuthority1Page.assertPageContents();
    await addLocalAuthority1Page.verifyAccessibility();
    await addLocalAuthority1Page.searchAndSelectOrganisation(organisationName);
    await addLocalAuthority1Page.clickContinue();

    await addLocalAuthoritySubmitPage.assertPageContents(
      ["caseProgression", "addLocalAuthority"],
      "submit",
    );
    await addLocalAuthoritySubmitPage.clickSubmit();

    await addLocalAuthorityConfirmPage.assertPageContents();
    await addLocalAuthorityConfirmPage.verifyAccessibility();

    await summaryPage.goToPage();
    await summaryPage.assertLocalAuthoritySection(organisationName);

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

    const dashedRef = caseNumberUtils.getHyphenatedCaseReference(caseRef);
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
    caseWorker,
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

    await manageDocumentsNew1Page.assertPageContents();

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

    // Only documents that are neither confidential/restricted nor a
    // default-confidential category show up here immediately — the rest
    // stay hidden until the court admin reviews them (see below).
    const DEFAULT_CONFIDENTIAL_CATEGORIES = [
      "CIR extension request",
      "CIR transfer request",
    ];
    const caseDocumentsEligibleDocuments = LA_DOCUMENTS.filter(
      (doc) =>
        !doc.confidentialDocument &&
        !doc.restrictDocument &&
        !DEFAULT_CONFIDENTIAL_CATEGORIES.includes(doc.documentCategory),
    );

    await navigationUtils.goToCase(
      caseWorker.page,
      Config.manageCasesBaseURLCase,
      caseRef,
      "Case documents",
    );
    await caseWorker.caseDocumentsPage.assertLocalAuthorityUploadedDocuments(
      caseDocumentsEligibleDocuments,
    );

    // Court admin reviews the tasks generated by the local authority's upload
    await navigationUtils.goToCase(
      caseWorker.page,
      Config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );

    const { tasksPage, reviewDocuments1Page } = caseWorker;

    await tasksPage.waitForTask("Review CIR Extension Request");
    await tasksPage.task.assertTaskSummary(
      "Review CIR Extension Request",
      "urgent",
      ["Assign to me"],
      "Unassigned",
    );
    await tasksPage.task.assertTaskSummary(
      "Review CIR Transfer Request",
      "urgent",
      ["Assign to me"],
      "Unassigned",
    );
    await tasksPage.task.assertTaskSummary(
      "Review Documents",
      "low",
      ["Assign to me"],
      "Unassigned",
    );

    await tasksPage.assignTaskToMeAndTriggerNextSteps(
      "Review Documents",
      "Review Documents",
      "caseWorker",
    );

    const baseName = (filePath: string): string =>
      filePath.split(/[\\/]/).pop() ?? filePath;
    const section7FileName = baseName(Config.testPdfFileSection7);
    const reviewableFileNames = LA_DOCUMENTS.map((doc) =>
      baseName(doc.filePath),
    ).filter((fileName) => fileName !== section7FileName);

    await reviewDocuments1Page.assertPageContents();
    await reviewDocuments1Page.assertDocumentOptions(reviewableFileNames, [
      section7FileName,
    ]);
    await reviewDocuments1Page.selectDocumentAndContinue();
  });
});
