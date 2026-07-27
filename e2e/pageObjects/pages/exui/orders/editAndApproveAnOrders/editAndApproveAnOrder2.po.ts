import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils.js";
import { Selectors } from "../../../../../common/selectors.js";
import { PreviewOrdersComponent } from "../../../../components/exui/orders/previewOrders.component.js";
import { OrderTypes } from "../../../../../common/types.js";

export class EditAndApproveAnOrder2Page extends EventPage {

  private readonly previewOrderComponent: PreviewOrdersComponent =
    new PreviewOrdersComponent(this.page);

  readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Check the order",
  });
  readonly heading3: Locator = this.page.locator(Selectors.h3, {
    hasText: "Open the order and review the content",
  });

  private readonly editOrderOptionsFormLabels: string[] = [
    "What do you want to do with this order?",
    "Send to admin to serve",
    "Give admin further directions then serve",
    "Edit the order myself and send to admin to serve",
  ];


  constructor(page: Page) {
    super(page, "Edit and approve a draft order");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(
    orderType: OrderTypes,
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("button", {
        name: this.previewOrderComponent.getOrderNameFromOrderType(orderType, true),
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      this.page.getByRole("button", {
        name: this.previewOrderComponent.getOrderNameFromOrderType(orderType, false),
        exact: true,
      }),
    ).toBeVisible();
    await expect(this.heading2).toBeVisible();
    await expect(this.heading3).toBeVisible();
    await this.pageUtils.assertStrings(this.editOrderOptionsFormLabels);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrderCheckOptions(judeOrderAction: string,): Promise<void> {
    await this.page.getByRole("radio", { name: judeOrderAction }).check();
  }
}