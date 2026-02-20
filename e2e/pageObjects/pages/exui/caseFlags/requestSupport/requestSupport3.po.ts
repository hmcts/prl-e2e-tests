import { Base } from "../../../base.po";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils";

// Not a standard event page so don't extend EventPage
export class RequestSupport3Page extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Request Support",
  });
  private readonly pageHeading: Locator = this.page.getByRole("heading", {
    name: "Reasonable adjustment",
  });
  private readonly reasonableAdjustments = [
    "I need documents in an alternative format",
    "I need help with forms",
    "I need adjustments to get to, into and around our buildings",
    "I need to bring support with me to a hearing",
    "I need something to feel comfortable during my hearing",
    "I need to request a certain type of hearing",
    "I need help communicating and understanding",
    "Other",
  ];
  private pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(this.pageHeading).toBeVisible();
    await this.pageUtils.assertStrings(this.reasonableAdjustments);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectReasonableAdjustment(
    reasonableAdjustment: string,
  ): Promise<void> {
    await this.page.getByRole("radio", { name: reasonableAdjustment }).check();
  }
}
