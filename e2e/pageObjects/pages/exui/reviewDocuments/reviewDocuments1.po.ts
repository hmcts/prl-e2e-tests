import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.js";
import { Selectors } from "../../../../common/selectors.js";

export class ReviewDocuments1Page extends EventPage {
  readonly formLabel1Heading: Locator = this.page.locator(Selectors.h3, {
    hasText: "Review documents for sensitive or confidential information",
  });
  readonly hintText: Locator = this.page.getByText(
    "Once you have selected a document to review, you will be asked on the next page if it needs to be restricted.",
  );
  readonly selectDocumentDropdown: Locator =
    this.page.getByLabel("Select document");

  constructor(page: Page) {
    super(page, "Review documents");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.formLabel1Heading).toBeVisible();
    await expect(this.hintText).toBeVisible();
    await expect(this.selectDocumentDropdown).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  /**
   * Verifies the dynamic list contains exactly the expected documents
   * (plus the "--Select a value--" placeholder) and none of the absent ones.
   * File names are matched as a substring since options are suffixed with
   * the upload timestamp, e.g. "CR1_Mockfile.pdf - 10 Jun 2026, 01:45:06 PM".
   */
  async assertDocumentOptions(
    expectedDocuments: string[],
    absentDocuments: string[],
  ): Promise<void> {
    const options: Locator = this.selectDocumentDropdown.locator("option");

    for (const fileName of expectedDocuments) {
      await expect(
        options.filter({ hasText: fileName }),
        `Dynamic list should contain "${fileName}" once`,
      ).toHaveCount(1);
    }
    for (const fileName of absentDocuments) {
      await expect(
        options.filter({ hasText: fileName }),
        `Dynamic list should not contain "${fileName}"`,
      ).toHaveCount(0);
    }
    if (expectedDocuments.length > 0) {
      await expect(
        options,
        "Dynamic list should have exactly the expected options",
      ).toHaveCount(expectedDocuments.length + 1);
    }
  }

  async selectDocumentAndContinue(documentToSelect?: string): Promise<void> {
    if (documentToSelect) {
      // Options are suffixed with the upload timestamp, so resolve the
      // option by file-name substring and select it via its value attribute.
      const option = this.selectDocumentDropdown
        .locator("option")
        .filter({ hasText: documentToSelect });
      await expect(
        option,
        `Dynamic list should contain one option matching "${documentToSelect}"`,
      ).toHaveCount(1);
      const value = await option.getAttribute("value");
      if (value === null) {
        throw new Error(
          `Option matching "${documentToSelect}" has no value attribute`,
        );
      }
      await this.selectDocumentDropdown.selectOption(value);
    } else {
      await this.selectDocumentDropdown.selectOption({ index: 1 });
    }
    await this.clickContinue();
  }
}
