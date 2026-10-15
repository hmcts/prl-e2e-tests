import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../common/types.js";

export class StatementOfServiceConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-header h1",
    { hasText: "Application was served" },
  );
  private readonly nextStepsConfirmationHeader: Locator = this.page.locator(
    "#confirmation-body h3",
    { hasText: "What happens next" },
  );
  private readonly confirmationBody: Locator = this.page.locator(
    "#confirmation-body p",
    {
      hasText:
        "If Cafcass are involved in the case, they will provide the court with a safeguarding letter.",
    },
  );

  constructor(page: Page) {
    super(page, "Statement of service");
  }

  async assertPageContents(caseType: solicitorCaseCreateType): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confirmationHeader).toBeVisible();
    if (caseType === "C100") {
      await expect(this.nextStepsConfirmationHeader).toBeVisible();
      await expect(this.confirmationBody).toBeVisible();
    }
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
