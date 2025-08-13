import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { ButtonComponent } from "../../../components/exui/button.component.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class Fl401AddCaseNumberSubmitPage extends EventPage {
  readonly subHeading: Locator = this.page.locator(Selectors.headingH2, {
    hasText: "Check your answers",
  });
  readonly text16Strings: string[] = [
    "Check the information below carefully.",
    "FamilyMan case number",
    "1234",
  ];
  readonly saveAndContinueButton: ButtonComponent = new ButtonComponent(
    this.page,
    CommonStaticText.saveAndContinue,
  );
  readonly previousButton: ButtonComponent = new ButtonComponent(
    this.page,
    CommonStaticText.previous,
  );

  constructor(page: Page) {
    super(page, "Add case number");
  }

  async checkPageContents(accessibilityTest: boolean = true): Promise<void> {
    await this.checkHeading();
    await expect(this.subHeading).toBeVisible();
    await this.checkStrings(Selectors.GovukText16, this.text16Strings);
    await this.saveAndContinueButton.isVisible();
    await this.previousButton.isVisible();
    await this.accessibilityTest(accessibilityTest);
  }
}
