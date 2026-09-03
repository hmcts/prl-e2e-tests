import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";

export class C100Submit1Page extends EventPage {
  private readonly confidentialityStatementHeading: Locator =
    this.page.getByRole("heading", {
      name: "Confidentiality Statement",
      level: 1,
    });
  private readonly confidentialityChecksSubHeading: Locator =
    this.page.getByRole("heading", {
      name: "Confidentiality checks",
      level: 2,
    });
  private readonly confidentialInstructionSection: Locator = this.page.locator(
    "#confidentialityChecksText",
  );
  private readonly confidentialCheckInstruction: Locator =
    this.confidentialInstructionSection.getByText(
      "Ensure that no private information has been disclosed in the application.",
    );
  private readonly confidentialCheckInstructionList: string[] = [
    "Check:",
    "any documents you complete now",
    "any documents you complete in the future",
    "documents received from other people, such as financial statements",
  ];
  private readonly confidentialCheckWarning: Locator =
    this.confidentialInstructionSection.getByText(
      "The court staff will not be able to make these checks and will not be able to prevent any accidental disclosure of private information.",
    );
  private readonly confidentialCheckCompleteLabel: Locator =
    this.page.getByText(
      "I have checked the application to ensure private information has not been disclosed.",
    );
  private readonly confidentialCheckCompleteCheckbox: Locator =
    this.page.getByRole("checkbox", {
      name: "I have checked the application to ensure private information has not been disclosed.",
    });
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "Submit");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confidentialityStatementHeading).toBeVisible();
    await expect(this.confidentialityChecksSubHeading).toBeVisible();
    await expect(this.confidentialCheckInstruction).toBeVisible();
    await this.pageUtils.assertStrings(
      this.confidentialCheckInstructionList,
      this.confidentialInstructionSection,
    );
    await expect(this.confidentialCheckWarning).toBeVisible();
    await expect(this.confidentialCheckCompleteLabel).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async confirmConfidentialityChecked(): Promise<void> {
    await this.confidentialCheckCompleteCheckbox.check();
  }
}
