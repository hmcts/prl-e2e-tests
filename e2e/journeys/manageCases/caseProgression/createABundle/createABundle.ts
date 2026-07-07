import { Browser, expect, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { CreateBundleSubmitPage } from "../../../../pageObjects/pages/exui/createBundle/createBundleSubmit.po.ts";
import { CreateBundle1Page } from "../../../../pageObjects/pages/exui/createBundle/createBundle1.po.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";
import {
  c100CompleteEventsUpToServiceOfApplication,
  fl401CompleteEventsUpToServiceOfApplication,
} from "../../../../common/caseHelpers/caseEventsHelper.ts";
import {
  applicationSubmittedBy,
  createOrderFL401Options,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.js";
import { ManageDocuments } from "../manageDocuments/manageDocuments.ts";
import { CaseFileViewPage } from "../../../../pageObjects/pages/exui/caseFileView/caseFileView.po.ts";
import { RenameDocuments } from "../renameDocuments/renameDocuments.ts";
import { ExuiMediaViewerPage } from "../../../../pageObjects/pages/exui/exuiMediaViewer.po.ts";
import { NavigationUtils } from "../../../../utils/navigation.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { basename } from "path";

interface ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
  createOrderFL401Options: createOrderFL401Options;
  applicationSubmittedBy: applicationSubmittedBy;
}

interface C100ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
  applicationSubmittedBy: applicationSubmittedBy;
}

const bundleContents: string[] = [
  "Bundle Details",
  "Bundle Creation Date and Time",
  "Case Bundles",
  "Case Bundles 1",
  "Stitch status",
  "DONE",
  "Stitched document",
  "Bundle ID",
];

// The documents uploaded once the case is in Hearing state. documentCategory is
// the label selected in the "Manage documents" dropdown; cfvFolderPath is the
// folder trail (top-level -> leaf) that document should sit under in Case File View.
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

// The uploaded PDF's display name in Case File View (reuses the shared test asset).
const uploadedDocumentFileName: string = basename(config.testPdfFile);

// Negative bundle scenario (Requirement 5): a confidential + a normal document are
// uploaded into the same bundled category. On upload cos-api prefixes a confidential
// file with "Confidential_", and the bundle engine excludes any filename containing
// "Confidential" - so the normal file must appear in the stitched bundle's Index page
// and the confidential file must not.
const bundleExclusionCategory: string = "Other witness statements";
const bundleExclusionParty: string = "Respondent";
const confidentialDocumentFileName: string = `Confidential_${uploadedDocumentFileName}`;

// One document is moved to a different CFV folder via the "Rename documents" event.
// originalDropdownLabel is the hierarchical label cos-api builds for the document
// ("<folder> -> <subfolder> -> <category> -> <fileName>"). Renaming is mandatory,
// so the moved document is identified afterwards by its new (unique) name.
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

export class CreateABundleJourney {
  public static async FL401CreateABundleJourney({
    page,
    accessibilityTest,
    ccdRef,
    browser,
    manageOrderData,
    createOrderFL401Options,
    applicationSubmittedBy,
  }: ServiceOfApplicationJourneyParams): Promise<void> {
    await fl401CompleteEventsUpToServiceOfApplication(
      page,
      browser,
      ccdRef,
      manageOrderData,
      createOrderFL401Options,
      applicationSubmittedBy,
    );
    await this.completeBundleRequirements(page, accessibilityTest, "FL401");
  }

  public static async C100CreateABundleJourney({
    page,
    accessibilityTest,
    browser,
    ccdRef,
    manageOrderData,
    applicationSubmittedBy,
  }: C100ServiceOfApplicationJourneyParams): Promise<void> {
    await c100CompleteEventsUpToServiceOfApplication(
      page,
      ccdRef,
      browser,
      manageOrderData,
      applicationSubmittedBy,
    );
    await this.completeBundleRequirements(page, accessibilityTest, "C100");
  }

  // Shared post-Hearing sequence for both case types (Requirements 1-5): upload
  // the CFV documents, upload the confidential + normal bundle-exclusion docs,
  // create the bundle, then run all verifications. Public so it can be exercised
  // directly against a case that is already in the Hearing state.
  public static async completeBundleRequirements(
    page: Page,
    accessibilityTest: boolean,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await page.reload();
    await this.uploadDocumentsToCFVFolders(page, accessibilityTest, caseType);
    await this.uploadBundleExclusionDocuments(
      page,
      accessibilityTest,
      caseType,
    );
    await page.reload();
    await Helpers.chooseEventFromDropdown(page, "Create a bundle");
    const createBundle1Page = new CreateBundle1Page(page);
    await createBundle1Page.assertPageContents(accessibilityTest);
    await createBundle1Page.fillInFields();
    const createBundleSubmitPage = new CreateBundleSubmitPage(page);
    await createBundleSubmitPage.assertPageContents(accessibilityTest);
    await createBundleSubmitPage.fillInFields();
    await this.checkBundleTab(page);
    await this.verifyConfidentialDocumentExcludedFromBundle(page);
    await this.verifyDocumentsInCaseFileView(page);
    await this.changeDocumentFolderAndVerify(page);
  }

  private static async uploadDocumentsToCFVFolders(
    page: Page,
    accessibilityTest: boolean,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    for (const document of uploadedDocuments) {
      await ManageDocuments.manageDocuments({
        page,
        accessibilityTest,
        caseType,
        documentParty: document.documentParty,
        documentCategory: document.documentCategory,
        restrictDocument: false,
        confidentialDocument: false,
        verifyDocumentInTab: false,
        // Skip the shared page-content checks: they assert content whose
        // visibility depends on the case's confidential state, which is not
        // relevant to the bundle journey (see FPVTL-2825).
        verifyPageContent: false,
      });
    }
  }

  private static async uploadBundleExclusionDocuments(
    page: Page,
    accessibilityTest: boolean,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    // Confidential document - stored as "Confidential_mockFile.pdf" and excluded from the bundle.
    await ManageDocuments.manageDocuments({
      page,
      accessibilityTest,
      caseType,
      documentParty: bundleExclusionParty,
      documentCategory: bundleExclusionCategory,
      restrictDocument: false,
      confidentialDocument: true,
      verifyDocumentInTab: false,
      // See uploadDocumentsToCFVFolders - skip confidential-state-dependent
      // page-content checks that are irrelevant to the bundle journey.
      verifyPageContent: false,
    });
    // Normal document in the same category - positive control, included in the bundle.
    await ManageDocuments.manageDocuments({
      page,
      accessibilityTest,
      caseType,
      documentParty: bundleExclusionParty,
      documentCategory: bundleExclusionCategory,
      restrictDocument: false,
      confidentialDocument: false,
      verifyDocumentInTab: false,
      verifyPageContent: false,
    });
  }

  private static async verifyConfidentialDocumentExcludedFromBundle(
    page: Page,
  ): Promise<void> {
    // The Bundles tab only exposes the stitched PDF; the list of included
    // documents lives on the PDF's Index page, so open it in the media viewer.
    // CCD renders the stitched document as a <button class="govuk-js-link">, NOT
    // an <a>, so it must be matched with role "button" (role "link" finds nothing).
    const stitchedDocumentLink = page.getByRole("button", {
      name: "Bundle.pdf",
    });
    const pdfPage = await new NavigationUtils().openPdfLink(
      page,
      stitchedDocumentLink,
    );
    const mediaViewer = new ExuiMediaViewerPage(pdfPage);
    await mediaViewer.waitForLoad();
    // Page 1 is the cover sheet; page 2 is the Index page listing bundled documents.
    await mediaViewer.toolbar.pageDownBtn.click();
    await mediaViewer.verifyTextPresent(uploadedDocumentFileName);
    await mediaViewer.verifyTextNotPresent(confidentialDocumentFileName);
    await pdfPage.close();
  }

  private static async verifyDocumentsInCaseFileView(
    page: Page,
  ): Promise<void> {
    const caseFileViewPage = new CaseFileViewPage(page);
    await caseFileViewPage.openTab();
    for (const document of uploadedDocuments) {
      await caseFileViewPage.verifyDocumentInFolder(
        document.cfvFolderPath,
        uploadedDocumentFileName,
      );
    }
  }

  private static async changeDocumentFolderAndVerify(
    page: Page,
  ): Promise<void> {
    await RenameDocuments.renameDocument({
      page,
      documentToSelect: movedDocument.originalDropdownLabel,
      newCategory: movedDocument.newCategory,
      newName: movedDocument.newName,
    });
    const caseFileViewPage = new CaseFileViewPage(page);
    await caseFileViewPage.openTab();
    await caseFileViewPage.verifyDocumentNotInFolder(
      movedDocument.originalFolderPath,
      movedDocument.newName,
    );
    await caseFileViewPage.verifyDocumentInFolder(
      movedDocument.newFolderPath,
      movedDocument.newName,
    );
  }

  private static async checkBundleTab(page: Page): Promise<void> {
    await expect
      .poll(
        async () => {
          // Re-click the Bundles tab every iteration: page.reload() drops the tab
          // selection (the case URL has no #Bundles fragment), so "DONE" would
          // never become visible on subsequent iterations otherwise.
          await page.locator(Selectors.tab, { hasText: "Bundles" }).click();
          // Give the freshly-loaded tab a moment to render its bundle table.
          await page.waitForTimeout(3_000);
          const bundleGenerated = await page.getByText("DONE").isVisible();
          if (!bundleGenerated) {
            await page.reload();
            await page.waitForLoadState("domcontentloaded");
          }
          return bundleGenerated;
        },
        {
          // Allow 5s delay before retrying
          intervals: [5_000],
          // Bundle stitching can take a few minutes to complete.
          timeout: 300_000,
        },
      )
      .toBeTruthy();
    for (const bundleString of bundleContents) {
      await expect(page.getByText(bundleString, { exact: true })).toBeVisible();
    }
  }
}
