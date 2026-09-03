import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";

export class RestrictedCaseAccess2Page extends EventPage {
  private readonly enterTheReasonsHeading: Locator = this.page.getByRole(
    "heading",
    { name: "Enter the reasons to restrict this case" },
  );
  private readonly paragraph1: Locator = this.page.getByText(
    "Briefly explain why this case should be restricted.",
  );
  private readonly textArea: Locator = this.page.locator(
    "#markAsRestrictedReason",
  );

  constructor(page: Page) {
    super(page, "Mark case as restricted");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.enterTheReasonsHeading).toBeVisible();
    await expect(this.paragraph1).toBeVisible();
    await expect(this.markCaseAsRestrictedButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async enterRestrictionReason(reason: string): Promise<void> {
    await this.textArea.fill(reason);
  }
}
