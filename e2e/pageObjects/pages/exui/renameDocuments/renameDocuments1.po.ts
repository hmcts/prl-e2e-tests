import { EventPage } from "../eventPage.po.js";
import { Locator, Page } from "@playwright/test";

export class RenameDocuments1Page extends EventPage {
  private readonly documentDropdown: Locator = this.page.locator(
    "#renameDocumentsList",
  );

  constructor(page: Page) {
    super(page, "Rename documents");
  }

  async selectDocument(documentLabel: string): Promise<void> {
    await this.documentDropdown.waitFor();
    await this.documentDropdown.selectOption({ label: documentLabel });
    await this.clickContinue();
  }
}
