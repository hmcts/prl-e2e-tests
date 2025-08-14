import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
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
  readonly saveAndContinueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.saveAndContinue,
    },
  );
  readonly previousButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.previous,
  });

  constructor(page: Page) {
    super(page, "Add case number");
  }

  async checkPageContents(accessibilityTest: boolean = true): Promise<void> {
    await this.checkHeading();
    await expect(this.subHeading).toBeVisible();
    await this.checkStrings(Selectors.GovukText16, this.text16Strings);
    await expect(this.saveAndContinueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await this.accessibilityTest(accessibilityTest);
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }
}
