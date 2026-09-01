import { expect, Locator, Page } from "@playwright/test";
import { Base } from "../../base.po.ts";

export abstract class HearingRequestPage extends Base {
  readonly pageHeading: Locator;

  protected constructor(page: Page, heading: string) {
    super(page);
    this.pageHeading = this.page.getByRole("heading", {
      name: heading,
      exact: true,
    });
  }

  protected async assertPageHeadingAndContinue(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }
}
