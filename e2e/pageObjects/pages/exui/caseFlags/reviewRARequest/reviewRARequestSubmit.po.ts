import { Base } from "../../../base.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { CheckYourAnswersTableComponent } from "../../../../components/exui/checkYourAnswersTable.component.js";

// Not a standard event page so don't extend EventPage
export class ReviewRARequestSubmitPage extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Review RA Request",
  });
  private readonly pageHeading: Locator = this.page.getByRole("heading", {
    name: "Review flag details",
  });
  private readonly table: CheckYourAnswersTableComponent =
    new CheckYourAnswersTableComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(this.pageHeading).toBeVisible();
    await this.table.captureFullTableScreenshot([
      "caseProgression",
      "caseFlags",
      "review-ra-request",
    ]);
    await expect(this.submitButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }
}
