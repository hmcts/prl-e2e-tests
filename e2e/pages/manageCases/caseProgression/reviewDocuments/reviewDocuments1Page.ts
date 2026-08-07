import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";

export enum ReviewDocuments1Content {
  pageTitle = "Review documents",
  formLabel1 = "Review documents for sensitive or confidential information",
  hintText = "Once you have selected a document to review, you will be asked on the next page if it needs to be restricted.",
  selectLabel = "Select document",
}

interface ReviewDocuments1PageParams {
  page: Page;
  accessibilityTest: boolean;
  documentToSelect?: string;
  /**
   * File names that must each appear once in the dynamic list, e.g.
   * "CR1_Mockfile.pdf". Matched as a substring since options are suffixed
   * with the upload timestamp ("CR1_Mockfile.pdf - 10 Jun 2026, 01:45:06 PM").
   */
  expectedDocuments?: string[];
  absentDocuments?: string[];
}

export class ReviewDocuments1Page {
  public static async reviewDocuments1Page({
    page,
    accessibilityTest,
    documentToSelect,
    expectedDocuments = [],
    absentDocuments = [],
  }: ReviewDocuments1PageParams): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.checkDocumentOptions(page, expectedDocuments, absentDocuments);
    await this.selectDocumentAndContinue(page, documentToSelect);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ReviewDocuments1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      // CCD renders this field label as markdown -> a plain, unclassed <h3>
      // (<markdown class="markdown"><h3>…</h3></markdown>), so match the <h3>
      // by text rather than .form-label / .govuk-fieldset__heading.
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ReviewDocuments1Content.formLabel1}")`,
        1,
      ),
      expect
        .soft(page.getByText(ReviewDocuments1Content.hintText))
        .toBeVisible(),
      expect
        .soft(page.getByLabel(ReviewDocuments1Content.selectLabel))
        .toBeVisible(),
      expect
        .soft(
          page.locator(
            `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
          ),
        )
        .toBeVisible(),
    ]);

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  /**
   * Verifies the dynamic list contains exactly the expected documents
   * (plus the "--Select a value--" placeholder) and none of the absent ones.
   */
  private static async checkDocumentOptions(
    page: Page,
    expectedDocuments: string[],
    absentDocuments: string[],
  ): Promise<void> {
    if (expectedDocuments.length === 0 && absentDocuments.length === 0) {
      return;
    }
    const options = page
      .getByLabel(ReviewDocuments1Content.selectLabel)
      .locator("option");

    const assertions: Promise<void>[] = [
      ...expectedDocuments.map((fileName) =>
        expect
          .soft(
            options.filter({ hasText: fileName }),
            `Dynamic list should contain "${fileName}" once`,
          )
          .toHaveCount(1),
      ),
      ...absentDocuments.map((fileName) =>
        expect
          .soft(
            options.filter({ hasText: fileName }),
            `Dynamic list should not contain "${fileName}"`,
          )
          .toHaveCount(0),
      ),
      // placeholder + one option per reviewable document
      ...(expectedDocuments.length > 0
        ? [
            expect
              .soft(
                options,
                `Dynamic list should have exactly the expected options`,
              )
              .toHaveCount(expectedDocuments.length + 1),
          ]
        : []),
    ];
    await Promise.all(assertions);
  }

  private static async selectDocumentAndContinue(
    page: Page,
    documentToSelect?: string,
  ): Promise<void> {
    const dropdown = page.getByLabel(ReviewDocuments1Content.selectLabel);
    if (documentToSelect) {
      // Options are suffixed with the upload timestamp, so resolve the option
      // by file-name substring and select it via its value attribute.
      const option = dropdown
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
      await dropdown.selectOption(value);
    } else {
      await dropdown.selectOption({ index: 1 });
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
