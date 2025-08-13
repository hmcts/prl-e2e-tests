import { Page, expect, Locator } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";
import { AxeUtils } from "@hmcts/playwright-common";
import { Base } from "../base.po.js";

// Base page for event pages
export class EventPage extends Base {
  readonly headingText: string;
  readonly headingLocator: Locator;

  constructor(page: Page, headingText: string) {
    super(page);
    this.headingText = headingText;
    this.headingLocator = page.locator(Selectors.GovukHeadingL, {
      hasText: headingText,
    });
  }

  async checkHeading(): Promise<void> {
    await expect(this.headingLocator).toBeVisible();
  }

  async accessibilityTest(accessibilityTest: boolean): Promise<void> {
    if (accessibilityTest) {
      await new AxeUtils(this.page).audit();
    }
  }

  async checkStrings(selector: string, stringArray: string[]): Promise<void> {
    for (const string of stringArray) {
      await expect(
        this.page.locator(selector).getByText(string, { exact: true }),
      ).toBeVisible();
    }
  }
}
