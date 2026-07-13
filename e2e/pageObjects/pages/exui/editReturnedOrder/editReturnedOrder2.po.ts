import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";

export class EditReturnedOrder2Page extends EventPage {
    private readonly h2: Locator = this.page.locator(Selectors.h2, {
        hasText:
            "Instructions from the judge"
    },
    );
    private readonly h3: Locator = this.page.locator(Selectors.h3, {
        hasText:
            "Edit the order"
    },
    );
    private readonly p: Locator = this.page.locator(Selectors.p, {
        hasText:
            "Use continue to edit the order."
    },
    );


  constructor(page: Page) {
    super(page, "Edit a returned order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.h2).toBeVisible();
    await expect(this.h3).toBeVisible();
    await expect(this.p).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }
}
