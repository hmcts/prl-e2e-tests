import { Base } from "../../../base.po";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils";

// Not a standard event page so don't extend EventPage
export class RequestSupport4Page extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Request Support",
  });
  private adjustmentsList: string[];
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(reasonableAdjustment: string): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(
      this.page.getByRole("heading", { name: reasonableAdjustment }),
    ).toBeVisible();
    switch (reasonableAdjustment) {
      case "I need documents in an alternative format":
        this.adjustmentsList = [
          "Documents in a specified colour",
          "Documents in easy read format",
          "Braille documents",
          "Documents in large print",
          "Audio translation of documents",
          "Documents read out to me",
          "Information emailed to me",
          "Other",
        ];
        break;
    }
    await this.pageUtils.assertStrings(this.adjustmentsList);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectAdjustment(adjustment: string): Promise<void> {
    await this.page.getByRole("radio", { name: adjustment }).check();
  }
}
