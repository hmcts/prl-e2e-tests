import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CreateCasePage } from "./createCase.po.js";

/**
 * Final C100 create-case screen.
 */
export class C100CaseNamePage extends CreateCasePage {
  private readonly caseNameField: Locator =
    this.page.locator("#applicantCaseName");
  private readonly caseNameHint: Locator = this.page.locator(
    `${Selectors.GovukFormHint}:text-is("Enter the eldest child’s full name. For example, John Smith")`,
  );

  private readonly paragraphs: string[] = [
    "If the applicant has applied for Help with Fees, you should continue to process their application online.",
    "You will still have to pay the fee. You can apply for a refund by contacting the court and providing the applicant's Help with Fees reference.",
  ];

  readonly caseNameRequiredError: string = "Case Name is required";

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.applicationHeading(false)).toBeVisible();
    await this.assertTextContent(Selectors.p, this.paragraphs);
  }

  async assertDummyPageContents(): Promise<void> {
    await expect(this.caseNameHint).toBeVisible();
    await expect(this.applicationHeading(true)).toBeVisible();
  }

  async fillCaseName(caseName: string): Promise<void> {
    await this.caseNameField.fill(caseName);
  }
}
