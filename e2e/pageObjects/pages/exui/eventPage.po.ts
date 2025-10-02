import { Page, expect, Locator } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { Base } from "../base.po.js";
import { CommonStaticText } from "../../../common/commonStaticText.ts";

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
  readonly continueButton: Locator;
  readonly saveAndContinueButton: Locator;
  readonly previousButton: Locator;
  readonly submitButton: Locator;

  protected constructor(page: Page, headingText: string) {
    super(page);
    this.headingText = headingText;
    this.pageHeading = page.locator(Selectors.GovukHeadingL, {
      hasText: headingText,
    });
    this.continueButton = this.page.locator(Selectors.button, {
      hasText: CommonStaticText.continue,
    });
    this.saveAndContinueButton = this.page.locator(Selectors.button, {
      hasText: CommonStaticText.saveAndContinue,
    });
    this.previousButton = this.page.locator(Selectors.button, {
      hasText: CommonStaticText.previous,
    });
    this.submitButton = this.page.locator(Selectors.button, {
      hasText: CommonStaticText.submit,
    });
  }

  async assertPageHeadings(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.familyManHeading).toBeVisible();
    await expect(this.caseNumberHeading).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickPrevious(): Promise<void> {
    await this.previousButton.click();
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }
}
