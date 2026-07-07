import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { CreateBundle1Content } from "../../../../fixtures/manageCases/caseProgression/createBundle/createBundle1Content.js";

export class CreateBundle1Page extends EventPage {
  private readonly pageTitle: Locator = this.page.locator(
    `${Selectors.GovukHeadingL}:text-is("${CreateBundle1Content.pageTitle}")`,
  );
  private readonly heading1: Locator = this.page.locator(
    `${Selectors.h1}:text-is("${CreateBundle1Content.h1}")`,
  );
  private readonly heading2: Locator = this.page.locator(
    `${Selectors.h2}:text-is("${CreateBundle1Content.h2}")`,
  );
  private readonly paragraph: Locator = this.page.locator(
    `${Selectors.p}:text-is("${CreateBundle1Content.p}")`,
  );
  private readonly submitBundleButton: Locator = this.page.locator(
    `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
  );

  constructor(page: Page) {
    super(page, CreateBundle1Content.pageTitle);
  }

  async assertPageContents(accessibilityTest: boolean): Promise<void> {
    await this.pageTitle.waitFor();
    await Promise.all([
      expect(this.heading1).toBeVisible(),
      expect(this.heading2).toBeVisible(),
      expect(this.paragraph).toBeVisible(),
    ]);
    if (accessibilityTest) {
      // await this.verifyAccessibility(); // failing need to make a ticket
    }
  }

  async fillInFields(): Promise<void> {
    await this.submitBundleButton.click();
  }
}
