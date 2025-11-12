import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";

export class C100RemoveLegalRepresentativeConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-header h1",
    { hasText: "Representative removed" },
  );
  private readonly confirmationBody: Locator = this.page.locator(
    "#confirmation-body p",
    {
      hasText:
        "Sr Legal Solicitor is no longer representing Martina Graham in this case. Legal Solicitor is no longer representing John Doe in this case. Legal Solicitor Jr is no longer representing Jeremy Anderson in this case. All other parties have been notified about this change",
    },
  );

  constructor(page: Page) {
    super(page, "Remove legal representative");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.confirmationBody).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
