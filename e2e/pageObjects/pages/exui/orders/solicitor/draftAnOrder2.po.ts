import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes, OrderTypesArray } from "../../../../../common/types.js";
import { PageUtils } from "../../../../../utils/page.utils.js";

export class DraftAnOrder2Page extends EventPage {
  private readonly insetText: Locator = this.page.getByText(
    "If the order you need is not on the list, go back to the previous page to upload it.",
  );
  private readonly orderTypeLabel: Locator = this.page.getByText(
    "Select the type of order",
  );
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "Create/upload draft order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.insetText).toBeVisible();
    await expect(this.orderTypeLabel).toBeVisible();
    await this.pageUtils.assertStrings(OrderTypesArray);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrderType(orderType: OrderTypes): Promise<void> {
    await this.page.getByRole("radio", { name: orderType }).check();
  }
}
