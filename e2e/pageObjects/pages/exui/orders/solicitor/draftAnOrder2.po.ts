import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";
import { OrderTypes, OrderTypesArray } from "../../../../../common/types.js";

export class DraftAnOrder2Page extends EventPage {
  private readonly insetText: Locator = this.page.locator(
    Selectors.GovukInsetText,
    {
      hasText:
        "If the order you need is not on the list, go back to the previous page to upload it.",
    },
  );
  private readonly orderTypeLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "Select the type of order" },
  );

  constructor(page: Page) {
    super(page, "Draft an order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.orderTypeLabel).toBeVisible();
    await this.checkStrings(Selectors.GovukFormLabel, OrderTypesArray);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrderType(orderType: OrderTypes): Promise<void> {
    await this.page.getByRole("radio", { name: orderType }).check();
  }
}
