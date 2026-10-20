import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CreateCasePage } from "./createCase.po.js";

/**
 * FL401 confidentiality statement.
 */
export class Fl401ConfidentialityStatementPage extends CreateCasePage {
  private readonly subTitle: Locator = this.page.locator(
    `${Selectors.h2}:text-is("Confidentiality Statement")`,
  );
  private readonly accessHeading: Locator = this.page.locator(
    `${Selectors.h3}:text-is("Who will have access to the confidential information")`,
  );
  private readonly understoodCheckbox: Locator = this.page.locator(
    "#confidentialityStatementDisclaimer-confidentialityStatementUnderstood",
  );

  private readonly boldText: string[] = [
    "When completing this form, you have the option to mark information as",
    "confidential and you do not need to complete a C8 form.",
  ];
  private readonly paragraphs: string[] = [
    "You should do this if you wish to keep certain information private.",
    "If you mark information as confidential, it will only be accessible to:",
    "The information will not be revealed to anyone else, unless ordered by the court.",
  ];
  private readonly listItems: string[] = ["the court", "the judiciary"];
  private readonly checkboxLabel: string =
    "I understand that information should be marked as confidential if it is to be kept private.";

  readonly fieldRequiredError: string = "Field is required";

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.subTitle).toBeVisible();
    await expect(this.applicationHeading(false)).toBeVisible();
    await expect(this.accessHeading).toBeVisible();
    await this.assertTextContent(Selectors.strong, this.boldText);
    await this.assertTextContent(Selectors.p, this.paragraphs);
    await this.assertTextContent(Selectors.li, this.listItems);
    await this.assertTextContent(Selectors.GovukFormLabel, [
      this.checkboxLabel,
    ]);
  }

  async confirmStatementUnderstood(): Promise<void> {
    await this.understoodCheckbox.click();
  }
}
