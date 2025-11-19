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
  readonly continueButton: Locator = this.page.getByRole("button", {
    name: "Continue",
  });
  readonly submitButton: Locator = this.page.getByRole("button", {
    name: "Submit",
  });
  readonly saveAndContinueButton = this.page.getByRole("button", {
    name: "Save and continue",
  });
  readonly closeAndReturnToCaseDetailsButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: "Close and Return to case details",
    },
  );

  protected constructor(page: Page, headingText: string) {
    super(page);
    this.headingText = headingText;
    this.pageHeading = page.locator(Selectors.GovukHeadingL, {
      hasText: headingText,
    });
  }

  async assertPageHeadings(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.familyManHeading).toBeVisible();
    await expect(this.caseNumberHeading).toBeVisible();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async clickSaveAndContinue() {
    await this.saveAndContinueButton.click();
  }

  async clickCloseAndReturnToCaseDetails(): Promise<void> {
    await this.closeAndReturnToCaseDetailsButton.click();
  }
}
