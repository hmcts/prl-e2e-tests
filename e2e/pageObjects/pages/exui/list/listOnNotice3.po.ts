import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class ListOnNotice3Page extends EventPage {
  private readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Allocated judge",
  });
  private readonly formLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText:
        "Do you want to allocate a specific judge or legal adviser? (Optional)",
    },
  );
  private readonly body: Locator = this.page.locator(Selectors.p, {
    hasText: "You can update this at any point in the case",
  });

  constructor(page: Page) {
    super(page, "List on notice");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading2).toBeVisible();
    await expect(this.body).toBeVisible();
    await expect(this.formLabel).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }
}
