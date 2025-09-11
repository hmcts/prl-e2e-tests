import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class Fl401AddCaseNumberSubmitPage extends EventPage {
  readonly subHeading: Locator = this.page.locator(Selectors.headingH2, {
    hasText: "Check your answers",
  });
  readonly text16Strings: string[] = [
    "Check the information below carefully.",
    "FamilyMan case number",
  ];
  constructor(page: Page) {
    super(page, "Add case number");
  }

  async checkPageContents(familyManNumber: string): Promise<void> {
    await this.checkHeading();
    await expect(this.subHeading).toBeVisible();
    await this.checkStrings(Selectors.GovukText16, this.text16Strings);
    await expect(
      this.page
        .locator(Selectors.GovukText16)
        .getByText(familyManNumber, { exact: true }),
    ).toBeVisible();
    await expect(this.saveAndContinueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }
}
