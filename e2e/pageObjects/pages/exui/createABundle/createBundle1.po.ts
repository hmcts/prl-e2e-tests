import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class CreateBundle1Page extends EventPage {
  private readonly instructionHeading: Locator = this.page.locator(
    `${Selectors.h1}:text-is("Please continue and select CreateBundle button in the next page for generating the bundle")`,
  );
  private readonly whatHappensNextHeading: Locator = this.page.locator(
    `${Selectors.h2}:text-is("What happens next")`,
  );
  private readonly instructionParagraph: Locator = this.page.locator(
    `${Selectors.p}:text-is("Please wait for sometime and refresh the page manually to see the generated bundle if StitchedDocument field is not populated in the bundles Tab after clicking on CreateBundle button in the next page")`,
  );
  private readonly createBundleButton: Locator = this.page.locator(
    `${Selectors.button}:text-is("Create Bundle")`,
  );

  constructor(page: Page) {
    super(page, "Create a bundle");
  }

  // NOTE: accessibility audit is intentionally not run on this page. It was
  // failing when last attempted on the equivalent old-style page object
  // (pages/manageCases/caseProgression/createBundle/createBundle1Page.ts) and
  // was disabled with a "need to make a ticket" comment rather than fixed.
  // Preserved as-is here - carried over, not re-verified.
  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
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
