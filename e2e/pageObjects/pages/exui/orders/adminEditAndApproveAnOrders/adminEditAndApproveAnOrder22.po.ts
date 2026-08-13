import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";

export class AdminEditAndApproveAnOrder22Page extends EventPage {
  private readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Serve saved orders",
  });
  private readonly heading21: Locator = this.page.locator(Selectors.h2, {
    hasText: " Serve order additional documents (Optional) ",
  });
  private readonly heading3: Locator = this.page.locator(Selectors.h3, {
    hasText: "Upload additional documents (Optional)",
  });
  private readonly uploadAddDocPara: Locator = this.page.locator(Selectors.p, {
    hasText: "Upload additional documents that you plan to serve",
  });
  private readonly selectOrderLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Select the orders you plan to serve :",
    },
  );

  constructor(page: Page) {
    super(page, "Edit and serve an order");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading2).toBeVisible();
    await expect(this.heading21).toBeVisible();
    await expect(this.heading3).toBeVisible();
    await expect(this.uploadAddDocPara).toBeVisible();
    await expect(this.selectOrderLabel).toBeVisible();
    await expect(
      this.page.locator('input[name="serveOrderDynamicList"]'),
    ).toBeChecked();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }
}
