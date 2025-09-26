import { expect, Locator, Page } from "@playwright/test";
import { CaseNumberUtils } from "../../../utils/caseNumber.utils.js";

export class CcdCaseHeaderComponent {
  private readonly caseHeader: Locator = this.page.locator("ccd-case-header");
  private readonly caseNumberUtils: CaseNumberUtils = new CaseNumberUtils();

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
    const formattedCaseNumber =
      this.caseNumberUtils.getHyphenatedCaseReference(caseNumber);
    await expect(
      this.caseHeader.locator("h2", {
        hasText: `Casenumber: ${formattedCaseNumber}`,
      }),
    ).toBeVisible();
  }
}
