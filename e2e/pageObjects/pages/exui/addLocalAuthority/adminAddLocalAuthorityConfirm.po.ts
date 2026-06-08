import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.js";
import { Selectors } from "../../../../common/selectors.js";

export class AdminAddLocalAuthorityConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-header",
  );

  private readonly confirmationBody: Locator = this.page.locator(
    Selectors.GovukPanel,
  );

  constructor(page: Page) {
    super(page, "Add local authority");
  }

  async assertPageContents(): Promise<void> {
    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }

  async closeAndReturn(): Promise<void> {
    await this.clickCloseAndReturnToCaseDetails();
  }
}
