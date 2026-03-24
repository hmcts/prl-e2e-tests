import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../../common/types.js";
import { Selectors } from "../../../../../common/selectors.js";
import { OrderOptionsComponent } from "../../../../components/exui/orders/orderOptions.component.js";

export class ManageOrder3Page extends EventPage {
  readonly heading3: Locator = this.page.locator(Selectors.h3, {
    hasText: "Upload an order",
  });
  readonly p: Locator = this.page.locator(Selectors.p, {
    hasText: "Select an order",
  });

  private readonly orderOptionsComponent: OrderOptionsComponent =
    new OrderOptionsComponent(this.page);

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading3).toBeVisible();
    await expect(this.p).toBeVisible();
    await this.orderOptionsComponent.assertUploadOrderPageContents();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrderTypeAndConsent(
    orderType: OrderTypes,
    isOrderByConsent: boolean,
  ): Promise<void> {
    await this.page.getByRole("radio", { name: orderType }).check();
    await this.page
      .getByRole("group", { name: "Is the order by consent?" })
      .getByLabel(isOrderByConsent ? "Yes" : "No")
      .check();
  }
}
