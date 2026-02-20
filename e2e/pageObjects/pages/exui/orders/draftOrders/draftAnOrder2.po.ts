import { EventPage } from "../../eventPage.po.js";
import { expect, Page } from "@playwright/test";
import { OrderTypes } from "../../../../../common/types.js";
import { OrderOptionsComponent } from "../../../../components/exui/orders/orderOptions.component.js";

export class DraftAnOrder2Page extends EventPage {
  private readonly orderOptionsComponent: OrderOptionsComponent =
    new OrderOptionsComponent(this.page);

  constructor(page: Page) {
    super(page, "Create/upload draft order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await this.orderOptionsComponent.assertOrderPageContents();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrderType(orderType: OrderTypes): Promise<void> {
    await this.page.getByRole("radio", { name: orderType }).check();
  }
}
