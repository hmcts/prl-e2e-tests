import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";
import { OrderTypes } from "../../../../../common/types.js";
import { PreviewOrdersComponent } from "../../../../components/exui/orders/previewOrders.component.js";

export class AdminEditAndApproveAnOrder4Page extends EventPage {
  private readonly previewOrderComponent: PreviewOrdersComponent =
    new PreviewOrdersComponent(this.page);
  private readonly previewOrderPara: Locator = this.page.locator(Selectors.p, {
    hasText: "Preview the draft order",
  });
  private readonly editOrderFormLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Do you want to edit the order?",
    },
  );

  constructor(page: Page) {
    super(page, "Edit and serve an order");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("button", {
        name: this.previewOrderComponent.getOrderNameFromOrderType(
          orderType,
          true,
        ),
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      this.page.getByRole("button", {
        name: this.previewOrderComponent.getOrderNameFromOrderType(
          orderType,
          false,
        ),
        exact: true,
      }),
    ).toBeVisible();
    await expect(this.page.getByText(orderType, { exact: true })).toBeVisible();
    await expect(this.previewOrderPara).toBeVisible();
    await expect(this.editOrderFormLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async editOrder(wantToEditOrder: boolean) {
    await this.page
      .getByRole("group", { name: "Do you want to edit the order?" })
      .getByLabel(wantToEditOrder ? "Yes" : "No")
      .check();
  }
}
