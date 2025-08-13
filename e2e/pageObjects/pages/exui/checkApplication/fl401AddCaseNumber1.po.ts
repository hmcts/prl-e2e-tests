import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { ButtonComponent } from "../../../components/exui/button.component.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class Fl401AddCaseNumber1 extends EventPage {
  readonly familyManNumberInput: Locator;
  readonly formLabel: Locator;
  readonly continueButton: ButtonComponent;
  readonly previousButton: ButtonComponent;

  constructor(page: Page) {
    super(page, "Add case number");
    this.familyManNumberInput = page.locator("#familymanCaseNumber");
    this.formLabel = page.locator(Selectors.GovukFormLabel, {
      hasText: "FamilyMan case number (Optional)",
    });
    this.continueButton = new ButtonComponent(page, CommonStaticText.continue);
    this.previousButton = new ButtonComponent(page, CommonStaticText.previous);
  }

  async checkPageContent(accessibilityTest: boolean = true): Promise<void> {
    await this.checkHeading();
    await expect(this.formLabel).toBeVisible();
    await this.continueButton.isVisible();
    await this.previousButton.isVisible();
    await this.accessibilityTest(accessibilityTest);
  }

  async fillInFields(): Promise<void> {
    await this.familyManNumberInput.fill("1234");
  }
}
