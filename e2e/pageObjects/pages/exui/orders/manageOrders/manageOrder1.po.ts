import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils.js";

export class ManageOrder1Page extends EventPage {
  readonly createOrderRadio: Locator = this.page.locator(
    "#manageOrdersOptions-createAnOrder",
  );
  readonly uploadOrderRadio: Locator = this.page.locator(
    "#manageOrdersOptions-uploadAnOrder",
  );
  readonly amendOrderRadio: Locator = this.page.locator(
    "#manageOrdersOptions-amendOrderUnderSlipRule",
  );
  readonly serveSavedOrdersRadio: Locator = this.page.locator(
    "#manageOrdersOptions-servedSavedOrders",
  );

  private readonly orderOptionsFormLabels: string[] = [
    "What do you want to do?",
    "Create an order",
    "Upload an order",
    "Amend an order",
    "Serve saved orders",
  ];

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await this.pageUtils.assertStrings(this.orderOptionsFormLabels);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectOrderOption(manageOrderOptions: string): Promise<void> {
    switch (manageOrderOptions) {
      case "create order":
        await this.createOrderRadio.check();
        break;
      case "upload order":
        await this.uploadOrderRadio.check();
        break;
      case "amend order":
        await this.amendOrderRadio.check();
        break;
      case "serve order":
        await this.serveSavedOrdersRadio.check();
        break;
    }
  }
}
