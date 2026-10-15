import { expect, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { DocumentSubmittedContent } from "../../../../../fixtures/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/documentSubmittedContent.ts";

export class DocumentSubmittedPage {
  public static async documentSubmittedPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.closeAndReturnToCase(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
      page.getByRole("heading", { name: DocumentSubmittedContent.h1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: DocumentSubmittedContent.h2 }),
    ).toBeVisible();
    await expect(page.getByText(DocumentSubmittedContent.p)).toBeVisible();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async closeAndReturnToCase(page: Page): Promise<void> {
    await page
      .getByRole("button", { name: DocumentSubmittedContent.button })
      .click();
  }
}
