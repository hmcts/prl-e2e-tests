import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class ListOnNotice2Page extends EventPage {
  private readonly editMessageLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Edit your message (Optional)",
    },
  );
  private readonly reasonHint: Locator = this.page.locator(
    Selectors.GovukFormHint,
    {
      hasText:
        "You can include additional reasons which may not have been previously listed.",
    },
  );

  constructor(page: Page) {
    super(page, "List on notice");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.editMessageLabel).toBeVisible();
    await expect(this.reasonHint).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }
}
