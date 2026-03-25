import { EventPage } from "../../eventPage.po.js";
import { expect, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils.js";
import { Selectors } from "../../../../../common/selectors.js";

export interface ManageOrder26Params {
  orderType: string;
  serveOrderNow: boolean;
  whatToDoWithOrder: string;
}

export class ManageOrder26Page extends EventPage {
  private readonly serveTheOrderHeading = this.page.getByRole("heading", {
    name: "When do you want to serve the order?",
  });
  private readonly orderTypeText = this.page.getByText(
    "What type of order is this?",
  );
  private readonly serveOrderNowText = this.page.getByText(
    "Do you want to serve the order now?",
  );
  private readonly yesAndNoLabels: string[] = ["Yes", "No"];
  private readonly orderOptionsFormLabels: string[] = [
    "What would you like to do with the order?",
    "Finalise the order, and save to serve later",
    "Save the order as a draft",
  ];

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.serveTheOrderHeading).toBeVisible();
    await expect(this.orderTypeText).toBeVisible();
    await expect(this.serveOrderNowText).toBeVisible();
    await this.pageUtils.assertStrings(
      this.yesAndNoLabels,
      this.page.locator(`#doYouWantToServeOrder ${Selectors.GovukFormLabel}`),
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectServeOrderOptions({
    orderType,
    serveOrderNow,
    whatToDoWithOrder,
  }: ManageOrder26Params): Promise<void> {
    await this.page.getByRole("combobox").selectOption(orderType);
    await this.page
      .getByRole("group", { name: "Do you want to serve the order now?" })
      .getByLabel(serveOrderNow ? "Yes" : "No")
      .check();
    if (!serveOrderNow) {
      await this.pageUtils.assertStrings(this.orderOptionsFormLabels);
      await this.page.getByRole("radio", { name: whatToDoWithOrder }).check();
    }
  }
}
