import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";

export class RemoveDraftOrder2Page extends EventPage {
  private readonly checkRemovingRightOrderHeading: Locator =
    this.page.getByRole("heading", {
      name: "Check you're removing the right order",
    });
  private readonly youWillNotBeAbleToReinstateText: Locator =
    this.page.getByText(
      "You will not be able to reinstate it after it’s removed",
    );
  private readonly whyIsOrderBeingRemovedLabel: Locator = this.page.getByText(
    "Why is the order being removed?",
  );

  constructor(page: Page) {
    super(page, "Remove draft order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.checkRemovingRightOrderHeading).toBeVisible();
    await expect(this.youWillNotBeAbleToReinstateText).toBeVisible();
    await expect(this.whyIsOrderBeingRemovedLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async inputOrderRemovalReason(removalReason: string): Promise<void> {
    await this.page
      .getByRole("textbox", { name: "Why is the order being removed?" })
      .fill(removalReason);
  }
}
