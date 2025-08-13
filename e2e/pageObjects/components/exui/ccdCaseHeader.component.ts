import { expect, Locator, Page } from "@playwright/test";
import { Helpers } from "../../../common/helpers.js";

export class CcdCaseHeaderComponent {
  readonly page: Page;
  readonly caseHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.caseHeader = this.caseHeader = page.locator("ccd-case-header");
  }

  async checkCaseName(caseName: string): Promise<void> {
    await expect(
      this.caseHeader.locator("h2", {
        hasText: caseName,
      }),
    ).toBeVisible();
  }

  async checkFamilyManNumber(familyManNumber: string): Promise<void> {
    await expect(
      this.caseHeader.locator("h2", {
        hasText: `FamilyMan ID: ${familyManNumber}`,
      }),
    ).toBeVisible();
  }

  async checkCaseNumber(caseNumber: string): Promise<void> {
    const formattedCaseNumber = Helpers.getHyphenatedCaseReference(caseNumber);
    await expect(
      this.caseHeader.locator("h2", {
        hasText: `Casenumber: ${formattedCaseNumber}`,
      }),
    ).toBeVisible();
  }
}
