import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

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
  private readonly closeAndReturnToCaseDetailsButton: Locator =
    this.page.locator(Selectors.button, {
      hasText: CommonStaticText.closeAndReturnToCaseDetails,
    });

  constructor(page: Page) {
    super(page, "Remove legal representative");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.confirmationBody).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }

  async clickCloseAndReturnToCaseDetails(): Promise<void> {
    await this.closeAndReturnToCaseDetailsButton.click();
  }
}
