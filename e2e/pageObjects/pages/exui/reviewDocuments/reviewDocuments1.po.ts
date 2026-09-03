import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class ReviewDocuments1Page extends EventPage {
  private readonly documentDropdown: Locator = this.page.locator(
    "#reviewDocsDynamicList",
  );

  readonly subHeading: Locator = this.page.locator(Selectors.h3, {
    hasText: "Review documents for sensitive or confidential information",
  });
  readonly bodyText: Locator = this.page.locator(Selectors.p, {
    hasText:
      "Once you have selected a document to review, you will be asked on the next page if it needs to be restricted.",
  });
  readonly selectDocumentLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "Select document" },
  );

  constructor(page: Page) {
    super(page, "Review documents");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.subHeading).toBeVisible();
    await expect(this.bodyText).toBeVisible();
    await expect(this.selectDocumentLabel).toBeVisible();
  }

  /**
   * Selects the first document in the dynamic list, matching the legacy
   * journey's behaviour (`selectOption({ index: 1 })` — index 0 is the
   * unselected placeholder option).
   */
  async selectFirstDocument(): Promise<void> {
    await this.documentDropdown.selectOption({ index: 1 });
  }
}
