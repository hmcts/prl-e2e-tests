import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { PageUtils } from "../../../../utils/page.utils.js";
import config from "../../../../utils/config.utils.js";

export class ServiceOfDocuments1Page extends EventPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  private readonly uploadAdditionalDocumentsHeading: Locator =
    this.page.locator(
      `${Selectors.headingH2}:text-is("Upload additional documents (Optional)")`,
    );
  private readonly documentsHeading2: Locator = this.page.locator(
    `${Selectors.headingH2}:text-is("Documents")`,
  );
  private readonly documentsHeading3: Locator = this.page.locator(
    `${Selectors.headingH3}:text-is("Documents")`,
  );
  private readonly formHint: Locator = this.page.locator(
    `${Selectors.GovukFormHint}:text-is("Select the document")`,
  );
  private readonly paragraphsContainer: Locator = this.page.locator(
    Selectors.p,
  );
  private readonly paragraphs: string[] = [
    "Please upload cover letter as first document if any, that is to be sent to both the applicant and the respondent.",
    "Select a document to reference",
  ];

  private readonly selectDocumentField: Locator = this.page.getByLabel(
    "Select the document (Optional)",
  );
  private readonly addAdditionalDocumentButton: Locator = this.page
    .locator("#sodAdditionalDocumentsList")
    .getByRole("button", { name: CommonStaticText.addNew });
  private readonly additionalDocumentUpload: Locator = this.page
    .locator("#sodAdditionalDocumentsList_0")
    .getByLabel("", { exact: true });
  // The case-doc slot is the third "Add new" button on the page - the first
  // two belong to the additional-documents list above it.
  private readonly addCaseDocumentButton: Locator = this.page
    .getByRole("button", { name: CommonStaticText.addNew })
    .nth(2);
  private readonly caseDocumentField: Locator = this.page.locator(
    "#sodDocumentsList_1_documentsList",
  );

  constructor(page: Page) {
    super(page, "Service of documents");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.uploadAdditionalDocumentsHeading).toBeVisible();
    await expect(this.documentsHeading2).toBeVisible();
    await expect(this.documentsHeading3).toBeVisible();
    await expect(this.formHint).toBeVisible();
    await this.pageUtils.assertStrings(
      this.paragraphs,
      this.paragraphsContainer,
    );
  }

  /**
   * Selects the document(s) to be served. `additionalDoc` uploads a second,
   * ad-hoc document via "Add new"; `withCaseDoc` adds a second entry to the
   * documents list pointing at the case document uploaded earlier in the
   * test (via Manage documents), rather than uploading a new file.
   */
  async selectDocumentsToServe({
    additionalDoc,
    withCaseDoc,
  }: {
    additionalDoc: boolean;
    withCaseDoc: boolean;
  }): Promise<void> {
    if (additionalDoc) {
      await this.addAdditionalDocumentButton.click();
      await this.additionalDocumentUpload.setInputFiles(config.testPdfFile);
    }

    await this.selectDocumentField.selectOption(
      "1: applications -> applicantDocuments -> applicant",
    );

    if (withCaseDoc) {
      await this.addCaseDocumentButton.click();
      await this.caseDocumentField.selectOption({
        label: "Preliminary Documents -> Position statements -> mockFile.pdf",
      });
    }
  }
}
