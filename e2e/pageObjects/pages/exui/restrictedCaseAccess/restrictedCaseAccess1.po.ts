import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";

export class RestrictedCaseAccess1Page extends EventPage {
  private readonly beforeYouStartHeading: Locator = this.page.getByRole(
    "heading",
    {
      name: "Before you start",
    },
  );
  private readonly paragraph1: Locator = this.page.getByText(
    "Restricted cases will not appear in search results.",
  );
  private readonly paragraph2: Locator = this.page.getByText(
    "They can only be accessed by people who have been given the right permissions.",
  );
  private readonly userWithAccessTable: Locator = this.page.locator(
    "#assignedUserDetailsLabel",
  );

  constructor(page: Page) {
    super(page, "Mark case as restricted");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.beforeYouStartHeading).toBeVisible();
    await expect(this.paragraph1).toBeVisible();
    await expect(this.paragraph2).toBeVisible();
    // TODO: assert table
    await expect(this.beforeYouStartHeading).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }
}
