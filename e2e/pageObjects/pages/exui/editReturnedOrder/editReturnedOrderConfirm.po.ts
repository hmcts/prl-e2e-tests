import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";

export class EditReturnedOrderConfirmPage extends EventPage {
    private readonly h1: Locator = this.page.locator(
        Selectors.h1,
        {
            hasText:
                "Draft order resubmitted",
        },
    );
    private readonly h1welsh: Locator = this.page.locator(
        Selectors.h1,
        {
            hasText:
                "Gorchymyn drafft wedi’i ailgyflwyno",
        },
    );
    private readonly h3: Locator = this.page.locator(
        Selectors.h3,
        {
            hasText:
                "What happens next",
        },
    );
    private readonly h3welsh: Locator = this.page.locator(
        Selectors.h3,
        {
            hasText:
                "Beth fydd yn digwydd nesaf",
        },
    );
    private readonly p: Locator = this.page.locator(
        Selectors.p,
        {
            hasText:
                " The judge will review the edits you have made to this order.",
        },
    );
    private readonly pwelsh: Locator = this.page.locator(
        Selectors.p,
        {
            hasText:
                "Bydd y Barnwr yn adolygu’r newidiadau rydych wedi’u gwneud i’r gorchymyn hwn",
        },
    );


  constructor(page: Page) {
    super(page, "Edit a returned order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.h1).toBeVisible();
    await expect(this.h1welsh).toBeVisible();
    await expect(this.h3).toBeVisible();
    await expect(this.h3welsh).toBeVisible();
    await expect(this.p).toBeVisible();
    await expect(this.pwelsh).toBeVisible();
    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
