import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Base } from "../../base.po.ts";

export class HearingAdditionalInstructionsPage extends Base {
  readonly instructionsLabel: Locator = this.page.locator(
    Selectors.GovukLabel,
    { hasText: "Enter any additional instructions for the hearing" },
  );
  readonly instructionsHint: Locator = this.page.locator(Selectors.GovukHint, {
    hasText:
      "Add details of any additional facilities or instructions for this hearing.",
  });
  readonly manualReviewInformation: Locator = this.page.locator(
    Selectors.GovukInsetText,
    {
      hasText:
        "This hearing request will need to be manually reviewed before listing if you enter additional details.",
    },
  );
  readonly instructionsInput: Locator = this.page.locator(
    "#additionalInstructionsTextarea",
  );

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await Promise.all([
      expect(this.instructionsLabel).toBeVisible(),
      expect(this.instructionsHint).toBeVisible(),
      expect(this.manualReviewInformation).toBeVisible(),
      expect(this.continueButton).toBeVisible(),
    ]);
  }

  async fillInFields(): Promise<void> {
    await this.instructionsInput.fill("Test");
  }
}
