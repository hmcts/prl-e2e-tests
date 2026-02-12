import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { OrderTypesArray } from "../../../../common/types.js";
import { PageUtils } from "../../../../utils/page.utils.js";

export class OrderOptionsComponent {
  private readonly orderTypeLabel: Locator = this.page.getByText(
    "Select the type of order",
  );

  readonly insetText: Locator = this.page.locator(Selectors.GovukInsetText, {
    hasText:
      " If the order you need is not on the list, go back to the previous page to upload it.",
  });

  constructor(private page: Page) {}

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertOrderPageContents(): Promise<void> {
    await expect(this.insetText).toBeVisible();
    await expect(this.orderTypeLabel).toBeVisible();
    await this.pageUtils.assertStrings(OrderTypesArray);
  }
}
