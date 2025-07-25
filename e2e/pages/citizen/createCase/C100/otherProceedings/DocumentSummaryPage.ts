import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { DocumentSummaryContent } from "../../../../../fixtures/citizen/createCase/C100/otherProceedings/DocumentSummaryContent.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface DocumentSummaryPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class DocumentSummaryPage {
  public static async DocumentSummaryPage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: DocumentSummaryPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: DocumentSummaryPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${DocumentSummaryContent.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${DocumentSummaryContent.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukTableCaption}:text-is("${DocumentSummaryContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroupHasText(
        page,
        16,
        DocumentSummaryContent,
        "pdf",
        `${Selectors.GovukTableCell}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukTableCell}:has-text("${Helpers.getCurrentDateFormatted()}")`,
        16,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
  }: Partial<DocumentSummaryPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
