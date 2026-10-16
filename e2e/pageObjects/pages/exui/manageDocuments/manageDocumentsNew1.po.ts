import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import config from "../../../../utils/config.utils.ts";

export interface ManageDocumentsNew1PageParams {
    page: Page;
    accessibilityTest: boolean;
    documentParty: string;
    documentCategory: string;
    restrictDocument: boolean;
    confidentialDocument: boolean;
}

export class ManageDocumentsNew1Page extends EventPage {
    private readonly headingH2: Locator = this.page.locator(
        Selectors.headingH2,
        {
            hasText:
                "Add a document",
        },
    );
    private readonly headingH3: Locator = this.page.locator(
        Selectors.headingH3,
        {
            hasText:
                "Add a document",
        },
    );
    private readonly buttonText: Locator = this.page.locator(
        Selectors.button,
        {
            hasText:
                "Add new",
        },
    );
    private readonly buttonText2: Locator = this.page.locator(
        Selectors.button,
        {
            hasText:
                "Remove",
        },
    );
    private readonly p1: Locator = this.page.getByText(
        "Upload a file to the system",
    );
    private readonly p2: Locator = this.page.getByText(
        "File size must be under 1GB.",
    );
    private readonly p3: Locator = this.page.getByText(
        "Before you add a document, remove any confidential details. You cannot delete or edit a document after you submit it.",
    );
    private readonly formHint1: Locator = this.page.getByText(
        "Select a party",
    );
    private readonly formHint2: Locator = this.page.getByText(
        "Select a document category",
    );
    private readonly formHint3: Locator = this.page.getByText(
        "Only HMCTS staff and the judiciary will be able to see it.",
    );
    private readonly formHint4: Locator = this.page.getByText(
        "The court will only restrict a document if there is a very good reason.Only court staff and the judiciary will be able to see it.",
    );
    private readonly formLabel1: Locator = this.page.getByText(
        "Confirm the document is related to this case",
    );
    private readonly formLabel2: Locator = this.page.getByText(
        "Yes, the document belongs to the case",
    );
    private readonly formLabel3: Locator = this.page.getByText(
        "Submitting document on behalf of",
    );
    private readonly formLabel4: Locator = this.page.getByText(
        "Document category",
    );
    private readonly formLabel5: Locator = this.page.getByText(
        "Document",
    );
    private readonly formLabel6: Locator = this.page.getByText(
        "Does the document contain confidential information?",
    );
    private readonly formLabel7: Locator = this.page.getByText(
        "Do you want to request this document is restricted?",
    );

    private readonly warningText: Locator = this.page.locator(
        Selectors.GovukWarningText,
        {
            hasText:
                "There is confidential information in this case.",
        },
    );
    private readonly inputText: Locator = this.page.locator(
        Selectors.button,
        {
            hasText:
                "This needs to be restricted as this is very sensitive information.",
        },
    );
    private readonly documentRelatedToCaseYes: Locator = this.page
        .locator("#manageDocuments_0_documentRelatedToCaseCheckbox-RELATED_TO_CASE");
    private readonly documentParty: Locator = this.page
        .locator("#manageDocuments_0_documentParty");
    private readonly documentCategory: Locator = this.page
        .locator("#manageDocuments_0_documentCategories");
    private readonly uploadDocument: Locator = this.page
        .locator("#manageDocuments_0_document");
    private readonly documentConfidentialYes: Locator = this.page
        .locator("#manageDocuments_0_isConfidential_Yes");
    private readonly documentConfidentialNo: Locator = this.page
        .locator("#manageDocuments_0_isConfidential_No");
    private readonly documentRestrictedYes: Locator = this.page
        .locator("#manageDocuments_0_isRestricted_Yes");
    private readonly documentRestrictedNo: Locator = this.page
        .locator("#manageDocuments_0_isRestricted_No");
    private readonly documentRestrictedReason: Locator = this.page
        .locator("#manageDocuments_0_restrictedDetails");
import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { PageUtils } from "../../../../utils/page.utils.js";
import config from "../../../../utils/config.utils.js";

export class ManageDocumentsNew1Page extends EventPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  private readonly restrictedReasonText: string =
    "This needs to be restricted as this is very sensitive information.";

  readonly heading2: Locator = this.page.locator(Selectors.headingH2, {
    hasText: "Add a document",
  });
  readonly heading3: Locator = this.page.locator(Selectors.headingH3, {
    hasText: "Add a document",
  });
  readonly removeButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.remove,
  });
  readonly warningText: Locator = this.page.locator(
    Selectors.GovukWarningText,
    { hasText: "There is confidential information in this case." },
  );
  readonly addNewDocumentButton: Locator = this.page.locator(
    "#manageDocuments button.write-collection-add-item__bottom",
  );

  readonly paragraphs: string[] = [
    "Upload a file to the system",
    "File size must be under 1GB.",
    "Before you add a document, remove any confidential details. You cannot delete or edit a document after you submit it.",
  ];

  readonly formHints: string[] = [
    "Select a party",
    "Select a document category",
    "Only HMCTS staff and the judiciary will be able to see it.",
    "The court will only restrict a document if there is a very good reason.Only court staff and the judiciary will be able to see it.",
  ];

  readonly formLabels: string[] = [
    "Confirm the document is related to this case",
    "Yes, the document belongs to the case",
    "Submitting document on behalf of",
    "Document category",
    "Document",
    "Does the document contain confidential information?",
    "Do you want to request this document is restricted?",
  ];

  constructor(page: Page) {
    super(page, "Manage documents");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading2).toBeVisible();
    await expect(this.heading3).toBeVisible();
    await expect(this.removeButton).toBeVisible();
    await expect(this.warningText).toBeVisible();
    await this.pageUtils.assertStrings(this.paragraphs);
    await this.pageUtils.assertStrings(this.formHints);
    await this.pageUtils.assertStrings(this.formLabels);
    await expect(
      this.page.locator(Selectors.GovukFormLabel, {
        hasText: new RegExp(`^${CommonStaticText.yes}$`),
      }),
    ).toHaveCount(2);
    await expect(
      this.page.locator(Selectors.GovukFormLabel, {
        hasText: new RegExp(`^${CommonStaticText.no}$`),
      }),
    ).toHaveCount(2);
  }

  private documentRelatedToCaseCheckbox(index: number): Locator {
    return this.page.locator(
      `#manageDocuments_${index}_documentRelatedToCaseCheckbox-RELATED_TO_CASE`,
    );
  }

  private documentPartySelect(index: number): Locator {
    return this.page.locator(`#manageDocuments_${index}_documentParty`);
  }

  private documentCategorySelect(index: number): Locator {
    return this.page.locator(`#manageDocuments_${index}_documentCategories`);
  }

  private documentUploadInput(index: number): Locator {
    return this.page.locator(`#manageDocuments_${index}_document`);
  }

  private documentUploadErrorMessage(index: number): Locator {
    return this.page.locator(
      `label[for="manageDocuments_${index}_document"] ~ span.error-message`,
    );
  }

  private documentConfidentialYesRadio(index: number): Locator {
    return this.page.locator(`#manageDocuments_${index}_isConfidential_Yes`);
  }

  private documentConfidentialNoRadio(index: number): Locator {
    return this.page.locator(`#manageDocuments_${index}_isConfidential_No`);
  }

  private documentRestrictedYesRadio(index: number): Locator {
    return this.page.locator(`#manageDocuments_${index}_isRestricted_Yes`);
  }

  private documentRestrictedNoRadio(index: number): Locator {
    return this.page.locator(`#manageDocuments_${index}_isRestricted_No`);
  }

  private documentRestrictedReasonInput(index: number): Locator {
    return this.page.locator(`#manageDocuments_${index}_restrictedDetails`);
  }

  async addAnotherDocument(nextIndex: number): Promise<void> {
    await this.addNewDocumentButton.scrollIntoViewIfNeeded();
    await this.addNewDocumentButton.click();
    await this.documentRelatedToCaseCheckbox(nextIndex).waitFor({
      state: "visible",
      timeout: 10_000,
    });
  }

  /**
   * Fills a single document slot by index (0-based). Used for both the initial
   * slot and any additional slots added via "Add new" when uploading multiple
   * documents in one Manage Documents event.
   */
  async fillDocumentSlot({
    index,
    documentParty,
    documentCategory,
    confidentialDocument,
    restrictDocument,
    filePath,
  }: {
    index: number;
    documentParty: string;
    documentCategory: string;
    confidentialDocument: boolean;
    restrictDocument: boolean;
    filePath?: string;
  }): Promise<void> {
    await this.documentRelatedToCaseCheckbox(index).click();
    await this.documentPartySelect(index).selectOption({
      label: documentParty,
    });
    await this.documentCategorySelect(index).selectOption({
      label: documentCategory,
    });

    await this.documentUploadInput(index).setInputFiles(
      filePath ?? config.testPdfFile,
    );
    // Allow 10 seconds for the upload to register before checking completion.
    // NOTE: this spacing also keeps document uploads under the doc-store rate
    // limit — cutting it shorter causes "Your request was rate limited" errors.
    await this.page.waitForTimeout(10_000);
    await this.documentUploadErrorMessage(index).waitFor({
      state: "hidden",
      timeout: 60_000,
    });

    if (confidentialDocument) {
      await this.documentConfidentialYesRadio(index).click();
    } else {
      await this.documentConfidentialNoRadio(index).click();
    }

    if (restrictDocument) {
      await this.documentRestrictedYesRadio(index).click();
      await this.documentRestrictedReasonInput(index).fill(
        this.restrictedReasonText,
      );
    } else {
      await this.documentRestrictedNoRadio(index).click();
    }
  }
}
