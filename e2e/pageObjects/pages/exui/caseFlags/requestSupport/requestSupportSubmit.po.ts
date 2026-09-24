import { Base } from "../../../base.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { CheckYourAnswersTableComponent } from "../../../../components/exui/checkYourAnswersTable.component.ts";
import { solicitorCaseCreateType } from "../../../../../common/types.ts";

// Not a standard event page so don't extend EventPage
export class RequestSupportSubmitPage extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Request Support",
  });
  private readonly pageHeading: Locator = this.page.getByRole("heading", {
    name: "Review support request",
  });
  private readonly table: CheckYourAnswersTableComponent =
    new CheckYourAnswersTableComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(
    caseType: solicitorCaseCreateType,
    captureScreenshot: boolean = true,
  ): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(this.pageHeading).toBeVisible();
    if (captureScreenshot) {
      await this.table.captureFullTableScreenshot([
        "caseProgression",
        "caseFlags",
        `request-support-${caseType}`,
      ]);
    }
    await expect(this.submitButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async assertRequestDetails(details: string[]): Promise<void> {
    const table: Locator = this.page.locator(".form-table");
    for (const detail of details) {
      await expect(
        table
          .locator("dd.govuk-summary-list__value", { hasText: detail })
          .first(),
      ).toBeVisible();
    }
  }
}
