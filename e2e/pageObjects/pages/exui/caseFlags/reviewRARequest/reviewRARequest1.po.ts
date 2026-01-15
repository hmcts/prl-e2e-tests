import { Base } from "../../../base.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../../common/types.ts";

// Not a standard event page so don't extend EventPage
export class ReviewRARequest1Page extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Review RA Request",
  });
  private readonly pageHeading: Locator = this.page.getByRole("heading", {
    name: "Manage case flags",
  });

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(
    recipient: string,
    recipientRole: string,
    supportType: string,
    adjustment: string,
    reason: string,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(this.pageHeading).toBeVisible();
    const caseFlagRadioLabel: string = `${recipient} (${recipientRole}) - ${supportType}, ${adjustment} (${reason})`;
    await expect(this.page.getByText(caseFlagRadioLabel)).toBeVisible();
    // not sure why the buttons are different for the different case types
    if (caseType === "C100") {
      await expect(this.submitButton).toBeVisible();
    } else {
      await expect(this.continueButton).toBeVisible();
    }
  }

  async selectSupportRequest(recipient: string): Promise<void> {
    await this.page.getByRole("radio", { name: recipient }).check();
  }
}
