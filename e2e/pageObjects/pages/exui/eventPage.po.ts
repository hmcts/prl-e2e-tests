import { Page, expect, Locator } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";
import { Base } from "../base.po.js";

// Base page for event pages
export abstract class EventPage extends Base {
  readonly headingText: string;
  readonly pageHeading: Locator;
  readonly familyManHeading: Locator = this.page.locator(Selectors.h2, {
    hasText: "FamilyMan ID",
  });
  readonly caseNumberHeading: Locator = this.page.locator(Selectors.h2, {
    hasText: "Casenumber",
  });

  protected constructor(page: Page, headingText: string) {
    super(page);
    this.headingText = headingText;
    this.pageHeading = page.locator(Selectors.GovukHeadingL, {
      hasText: headingText,
    });
  }

  async checkPageHeadings(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.familyManHeading).toBeVisible();
    await expect(this.caseNumberHeading).toBeVisible();
  }
}
