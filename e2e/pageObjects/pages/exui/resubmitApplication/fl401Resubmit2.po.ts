import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";

export class Fl401Resubmit2Page extends EventPage {
  private readonly confidentialCheckInstruction: Locator = this.page.getByText(
    "Ensure that no confidential information has been disclosed in the application. Check:",
  );
  private readonly confidentialCheckInstructionList: string[] = [
    "any documents you complete now",
    "any documents you complete in the future",
    "documents received from other people, such as financial statements",
  ];
  private readonly confidentialCheckWarning: Locator = this.page.getByText(
    "The court staff will not be able to make these checks and will not be able to prevent any accidental disclosure of confidential information.",
  );
  private readonly confidentialCheckCompleteLabel: Locator =
    this.page.getByText(
      "I have checked the application to ensure confidential information has not been disclosed.",
    );
  private readonly confidentialCheckCompleteCheckbox: Locator =
    this.page.getByRole("checkbox", {
      name: "I have checked the application to ensure confidential information has not been disclosed.",
    });
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "Statement of Truth and submit");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confidentialCheckInstruction).toBeVisible();
    await this.pageUtils.assertStrings(this.confidentialCheckInstructionList);
    await expect(this.confidentialCheckWarning).toBeVisible();
    await expect(this.confidentialCheckCompleteLabel).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(this.saveAndContinueButton).toBeVisible();
  }

  async confirmCheckedApplication(): Promise<void> {
    await this.confidentialCheckCompleteCheckbox.check();
  }
}
