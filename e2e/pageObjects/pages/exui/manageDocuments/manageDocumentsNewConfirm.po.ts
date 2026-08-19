import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class ManageDocumentsNewConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-header",
    { hasText: "Documents submitted" },
  );
  private readonly pageTitle: Locator = this.page.locator(Selectors.headingH1, {
    hasText: "Manage documents",
  });
  private readonly whatHappensNextHeading: Locator = this.page.locator(
    Selectors.h3,
    { hasText: "What happens next" },
  );
  private readonly confirmationBody: Locator = this.page.locator(Selectors.p, {
    hasText: "The court will review the submitted documents.",
  });

  constructor(page: Page) {
    super(page, "Manage documents");
  }

  async assertPageContents(): Promise<void> {
    await this.confirmationHeader.waitFor();
    await expect(this.pageTitle).toBeVisible();
    await expect(this.whatHappensNextHeading).toBeVisible();
    await expect(this.confirmationBody).toBeVisible();
  }
}
