import { Page, expect, Locator } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";
import { Base } from "../base.po.js";
import { CommonStaticText } from "../../../common/commonStaticText.ts";

// Base page for event pages
export abstract class EventPage extends Base {
  readonly headingText: string;
  readonly headingLocator: Locator;
  readonly continueButton: Locator;
  readonly saveAndContinueButton: Locator;
  readonly previousButton: Locator;

  protected constructor(page: Page, headingText: string) {
    super(page);
    this.headingText = headingText;
    this.headingLocator = page.locator(Selectors.GovukHeadingL, {
      hasText: headingText,
    });
    this.continueButton = this.page.locator(Selectors.button, {
      hasText: CommonStaticText.continue,
    });
    this.saveAndContinueButton = this.page.locator(
      Selectors.button,
      {
        hasText: CommonStaticText.saveAndContinue,
      },
    );
    this.previousButton = this.page.locator(Selectors.button, {
      hasText: CommonStaticText.previous,
    });
  }

  async checkHeading(): Promise<void> {
    await expect(this.headingLocator).toBeVisible();
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
}
