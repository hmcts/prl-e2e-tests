import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../../common/types.js";

export class ManageOrder12Page extends EventPage {
  private readonly hearingOutcomeLabel: Locator = this.page.getByText(
    "Hearing outcome (Optional)",
  );
  private readonly hearingOutcomeTextArea: Locator = this.page.locator(
    "#fl404CustomFields_fl404bHearingOutcome",
  );

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType).first()).toBeVisible();
    await expect(this.hearingOutcomeLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillHearingOutcomeDetail(): Promise<void> {
    await this.hearingOutcomeTextArea.fill("Test");
  }
}
