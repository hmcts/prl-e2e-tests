import { Base } from "../../base.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CreateBundle1Content } from "../../../../fixtures/manageCases/caseProgression/createBundle/createBundle1Content.js";

export class CreateBundle1Page extends Base {
  private readonly pageTitle: Locator = this.page.locator(
    `${Selectors.GovukHeadingL}:text-is("${CreateBundle1Content.pageTitle}")`,
  );
  private readonly instructionHeading: Locator = this.page.locator(
    `${Selectors.h1}:text-is("${CreateBundle1Content.h1}")`,
  );
  private readonly whatHappensNextHeading: Locator = this.page.locator(
    `${Selectors.h2}:text-is("${CreateBundle1Content.h2}")`,
  );
  private readonly instructionParagraph: Locator = this.page.locator(
    `${Selectors.p}:text-is("${CreateBundle1Content.p}")`,
  );
  private readonly createBundleButton: Locator = this.page.locator(
    `${Selectors.button}:text-is("${CreateBundle1Content.createBundleSubmitButton}")`,
  );

  constructor(page: Page) {
    super(page);
  }

  // NOTE: accessibility audit is intentionally not run on this page. It was
  // failing when last attempted on the equivalent old-style page object
  // (pages/manageCases/caseProgression/createBundle/createBundle1Page.ts) and
  // was disabled with a "need to make a ticket" comment rather than fixed.
  // Preserved as-is here - carried over, not re-verified.
  async assertPageContents(): Promise<void> {
    await this.pageTitle.waitFor();
    await Promise.all([
      expect(this.instructionHeading).toBeVisible(),
      expect(this.whatHappensNextHeading).toBeVisible(),
      expect(this.instructionParagraph).toBeVisible(),
    ]);
  }

  async clickCreateBundle(): Promise<void> {
    await this.createBundleButton.click();
  }
}
