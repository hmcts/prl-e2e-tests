import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class RenameDocuments2Page extends EventPage {
  private readonly docSelectedText = this.page.getByText("Document selected :");
  private readonly docCategoryText = this.page.getByText("Document Category");
  private readonly docHint1: Locator = this.page.locator(
    Selectors.GovukFormHint,
    {
      hasText:
        "Changing the category will change the document's location in Case File View",
    },
  );
  private readonly changeDocNameText = this.page.getByText(
    "Change document name",
  );
  private readonly docHint2: Locator = this.page.locator(
    Selectors.GovukFormHint,
    {
      hasText:
        "You should make sure not to use the same name as existing documents. Do not include the file type such as '.pdf' in the name.",
    },
  );

  constructor(page: Page) {
    super(page, "Rename documents");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.docSelectedText).toBeVisible();
    await expect(this.docCategoryText).toBeVisible();
    await expect(this.docHint1).toBeVisible();
    await expect(this.changeDocNameText).toBeVisible();
    await expect(this.docHint2).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillNewDocumentName(expectedDocumentName: string) {
    await this.page.locator("#newNameForDocument").fill(expectedDocumentName);
  }

  async getSelectedDocumentPath(): Promise<string[]> {
    const documentSelectedField = this.page.locator("dl.case-field").filter({
      has: this.page.getByText("Document selected :", { exact: true }),
    });

    const pathText = await documentSelectedField
      .locator(".case-field__value")
      .innerText();

    return pathText
      .split("->")
      .map((value) => value.trim())
      .slice(0, -1);
  }
}
