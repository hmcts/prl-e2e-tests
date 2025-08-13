import { Page, expect, Locator } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";
import { Base } from "../base.po.js";

// Base page for event pages
export abstract class EventPage extends Base {
  readonly headingText: string;
  readonly headingLocator: Locator;

  protected constructor(page: Page, headingText: string) {
    super(page);
    this.headingText = headingText;
    this.headingLocator = page.locator(Selectors.GovukHeadingL, {
      hasText: headingText,
    });
  }

  abstract checkPageContents(): Promise<void>;

  async checkHeading(): Promise<void> {
    await expect(this.headingLocator).toBeVisible();
  }
}
