import { EventPage } from "../../eventPage.po.js";
import { expect, Page } from "@playwright/test";
import { OrderTypes } from "../../../../../common/types.js";

export class ManageOrder27Page extends EventPage {
  private readonly serveSavedOrdersText = this.page.getByRole("heading", {
    name: "Serve saved orders",
  });
  private readonly selectOrderText = this.page.getByText(
    "Select the orders you plan to serve :",
  );
  private readonly uploadAdditionalDocText = this.page.getByText(
    "Upload additional documents (Optional)",
  );
  private readonly serveSavedAddDocsText = this.page.getByText(
    "Serve order additional documents (Optional)",
  );
  private readonly addButtons = this.page.getByRole("button", {
    name: "Add new",
  });
  private readonly uploadAdditionalDocToServeText = this.page.getByText(
    "Upload additional documents that you plan to serve",
  );

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.serveSavedOrdersText).toBeVisible();
    await expect(this.selectOrderText).toBeVisible();
    await expect(this.uploadAdditionalDocText).toBeVisible();
    await expect(this.serveSavedAddDocsText).toBeVisible();
    await expect(this.addButtons).toBeVisible();
    await expect(this.uploadAdditionalDocToServeText).toBeVisible();
    await expect(
      this.page
        .locator("label.form-label", { hasText: orderType })
        .locator("..")
        .locator('input[type="checkbox"]'),
    ).toBeChecked();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }
}
