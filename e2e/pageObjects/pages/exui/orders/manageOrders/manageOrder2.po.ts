import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../../common/types.js";
import { Selectors } from "../../../../../common/selectors.js";
import { OrderOptionsComponent } from "../../../../components/exui/orders/orderOptions.component.js";

export class ManageOrder2Page extends EventPage {
  readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Create an order",
  });

  private readonly orderOptionsComponent: OrderOptionsComponent =
    new OrderOptionsComponent(this.page);

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading2).toBeVisible();
    await this.orderOptionsComponent.assertOrderPageContents();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrderType(orderType: OrderTypes): Promise<void> {
    await this.page.getByRole("radio", { name: orderType }).check();
  }
}
