import { expect, Locator, Page } from "@playwright/test";
import { Helpers } from "../../../common/helpers.js";

export class CcdCaseHeaderComponent {
  readonly caseHeader: Locator = this.page.locator("ccd-case-header");

  constructor(private page: Page) {}

  async assertCaseNameIsVisible(caseName: string): Promise<void> {
    await expect(
      this.caseHeader.locator("h2", {
        hasText: caseName,
      }),
    ).toBeVisible();
  }

  async assertFamilyManNumberIsVisible(familyManNumber: string): Promise<void> {
    await expect(
      this.caseHeader.locator("h2", {
        hasText: `FamilyMan ID: ${familyManNumber}`,
      }),
    ).toBeVisible();
  }

  async assertCaseNumberIsVisible(caseNumber: string): Promise<void> {
    const formattedCaseNumber = Helpers.getHyphenatedCaseReference(caseNumber);
    await expect(
      this.caseHeader.locator("h2", {
        hasText: `Casenumber: ${formattedCaseNumber}`,
      }),
    ).toBeVisible();
  }
}
