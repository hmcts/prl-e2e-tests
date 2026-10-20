import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CreateCasePage } from "./createCase.po.js";

/**
 * Check your answers screen of the dummy (TS) create-case event. The real
 * solicitor event submits straight from its case name screen and never
 * reaches this page.
 */
export class CreateCaseSubmitPage extends CreateCasePage {
  private readonly subTitle: Locator = this.page.locator(
    `${Selectors.h2}:text-is("Check your answers")`,
  );
  private readonly createMyDummyCaseButton: Locator = this.page.locator(
    `${Selectors.button}:text-is("Create my dummy case")`,
  );

  private readonly summaryText: string[] = [
    "Check the information below carefully.",
    "Case Name",
    "Change",
  ];

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(caseName: string): Promise<void> {
    await expect(this.subTitle).toBeVisible();
    await this.assertTextContent(Selectors.GovukText16, [
      ...this.summaryText,
      caseName,
    ]);
  }

  async clickCreateMyDummyCase(): Promise<void> {
    await this.createMyDummyCaseButton.click();
  }
}
