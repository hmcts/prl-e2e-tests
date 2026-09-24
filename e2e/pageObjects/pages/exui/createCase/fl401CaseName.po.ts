import { expect, Locator, Page } from "@playwright/test";
import { CreateCasePage } from "./createCase.po.js";

/**
 * Final FL401 create-case screen 
 */
export class Fl401CaseNamePage extends CreateCasePage {
  private readonly caseNameField: Locator = this.page.locator(
    "#applicantOrRespondentCaseName",
  );

  readonly caseNameRequiredError: string = "Case Name is required";

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.applicationHeading(false)).toBeVisible();
  }

  async assertDummyPageContents(): Promise<void> {
    await expect(this.applicationHeading(true)).toBeVisible();
  }

  async fillCaseName(caseName: string): Promise<void> {
    await this.caseNameField.fill(caseName);
  }
}
