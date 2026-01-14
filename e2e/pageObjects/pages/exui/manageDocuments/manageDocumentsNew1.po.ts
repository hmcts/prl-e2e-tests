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

  constructor(page: Page) {
    super(page, "Manage documents");
  }

async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.headingH2).toBeVisible();
    await expect(this.headingH3).toBeVisible();
    await expect(this.buttonText).toBeVisible();
    await expect(this.buttonText2).toBeVisible();
    await expect(this.p1).toBeVisible();
    await expect(this.p2).toBeVisible();
    await expect(this.p3).toBeVisible();
    await expect(this.formHint1).toBeVisible();
    await expect(this.formHint2).toBeVisible();
    await expect(this.formHint3).toBeVisible();
    await expect(this.formHint4).toBeVisible();
    await expect(this.formLabel1).toBeVisible();
    await expect(this.formLabel2).toBeVisible();
    await expect(this.formLabel3).toBeVisible();
    await expect(this.formLabel4).toBeVisible();
    await expect(this.formLabel5).toBeVisible();
    await expect(this.formLabel6).toBeVisible();
    await expect(this.formLabel7).toBeVisible();
    await expect(this.warningText).toBeVisible();
    await expect(this.inputText).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
}

    async fillInFields(
        page,
        documentParty,
        documentCategory,
        confidentialDocument,
        restrictDocument,
    ): Promise<void> {
        if (!page) {
            throw new Error("No page found");
        }
        await this.documentRelatedToCaseYes.check();
        await page.selectOption(this.documentParty, {
              label: documentParty,
            });
        await page.selectOption(this.documentCategory, {
            label: documentCategory,
        });
        const fileInput = page.locator(this.uploadDocument);
        await fileInput.setInputFiles(config.testPdfFile);
        // wait for upload of document to be complete before continuing
        await page
            .locator(Selectors.GovukErrorMessage, { hasText: "Uploading..." })
            .waitFor({ state: "hidden" });
        if (confidentialDocument) {
            await page.click(this.documentConfidentialYes);
        } else {
            await page.click(this.documentConfidentialNo);
        }
        if (restrictDocument) {
            await page.click(this.documentRestrictedYes);
            await page.fill(
            this.documentRestrictedReason,
            this.inputText,
            );
        } else {
            await page.click(this.documentRestrictedNo);
        }
    }
}
