import { EventPage } from "../eventPage.po.js";
import { Locator, Page } from "@playwright/test";

export class RenameDocuments2Page extends EventPage {
  private readonly categoryDropdown: Locator = this.page.locator(
    "#categoryDocumentsList",
  );
  private readonly newNameInput: Locator = this.page.locator(
    "#newNameForDocument",
  );

  constructor(page: Page) {
    super(page, "Rename documents");
  }

  async changeCategoryAndName(
    newCategory: string,
    newName: string,
  ): Promise<void> {
    await this.categoryDropdown.waitFor();
    await this.categoryDropdown.selectOption({ label: newCategory });
    await this.newNameInput.fill(newName);
    await this.clickContinue();
  }
}
