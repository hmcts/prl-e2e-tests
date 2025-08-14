import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class Fl401AddCaseNumber1Page extends EventPage {
  readonly familyManNumberInput: Locator = this.page.locator(
    "#familymanCaseNumber",
  );
  readonly formLabel: Locator = this.page.locator(Selectors.GovukFormLabel, {
    hasText: "FamilyMan case number (Optional)",
  });
  readonly continueButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.continue,
  });
  readonly previousButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.continue,
  });

  constructor(page: Page) {
    super(page, "Add case number");
  }

  async checkPageContents(accessibilityTest: boolean = true): Promise<void> {
    await this.checkHeading();
    await expect(this.formLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await this.accessibilityTest(accessibilityTest);
  }

  async fillInFields(familyManNumber: string): Promise<void> {
    await this.familyManNumberInput.fill(familyManNumber);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
