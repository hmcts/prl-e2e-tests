import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class RenameDocuments1Page extends EventPage {
  private readonly formLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Documents",
    },
  );
  private readonly docHint: Locator = this.page.locator(
    Selectors.GovukFormHint,
    {
      hasText: "Select document",
    },
  );

  constructor(page: Page) {
    super(page, "Rename documents");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.formLabel).toBeVisible();
    await expect(this.docHint).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async selectDocument() {
    await this.page.locator("#renameDocumentsList").selectOption({ index: 1 });
  }
}
