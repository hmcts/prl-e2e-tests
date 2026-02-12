import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils.js";
import { Selectors } from "../../../../../common/selectors.js";
import { OrderTypes } from "../../../../../common/types.js";

export interface ManageOrder10Params {
  childArrangementOrderType: string;
  allC43OrdersSubType?: string[];
}

export class ManageOrder10Page extends EventPage {
  readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Add order details",
  });

  private readonly orderOptionsFormLabels: string[] = [
    "Select orders to issue",
    "Child Arrangements Order",
    "Prohibited Steps Order",
    "Specific Issue Order",
    "Serve saved orders",
  ];

  private readonly hiddenC43orderOptionsFormLabels: string[] = [
    "Select type of child arrangements order",
    "Spend time with order",
    "Live with order",
    "Both live with and spend time with order",
  ];

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType)).toBeVisible();
    await expect(this.heading2).toBeVisible();
    await this.pageUtils.assertStrings(this.orderOptionsFormLabels);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectC45OrderDetails({
    childArrangementOrderType,
    allC43OrdersSubType,
  }: ManageOrder10Params): Promise<void> {
    for (const orderLabelText of allC43OrdersSubType) {
      await this.page.getByLabel(orderLabelText, { exact: true }).check();
    }

    await this.pageUtils.assertStrings(this.hiddenC43orderOptionsFormLabels);
    await this.page
      .getByLabel(childArrangementOrderType, { exact: true })
      .check();
  }
}
