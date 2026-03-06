import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { AnyOtherOrderTypesArray, ChildArrangementOrderTypesArray, DomesticAbuseOrderTypesArray, FcOrderTypesArray, OrderTypesArray } from "../../../../common/types.js";
import { PageUtils } from "../../../../utils/page.utils.js";

export class OrderOptionsComponent {
  private readonly orderTypeLabel: Locator = this.page.getByText(
    "Select the type of order",
  );
  private readonly childArrangementOrdersLabel: Locator = this.page.getByText(
    "Child arrangement orders (Optional)",
  );

  private readonly domesticAbuseOrdersLabel: Locator = this.page.getByText(
    "Domestic abuse orders (Optional)",
  );

  private readonly fcOrdersLabel: Locator = this.page.getByText(
    "FC orders (Optional)",
  );

  private readonly anyOtherOrdersLabel: Locator = this.page.getByText(
    "Any other order (Optional)",
  );

  readonly insetText: Locator = this.page.locator(Selectors.GovukInsetText, {
    hasText:
      " If the order you need is not on the list, go back to the previous page to upload it.",
  });

  constructor(private page: Page) {}

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertCreateOrderPageContents(): Promise<void> {
    await expect(this.insetText).toBeVisible();
    await expect(this.orderTypeLabel).toBeVisible();
    await this.pageUtils.assertStrings(OrderTypesArray);
  }

  async assertUploadOrderPageContents(): Promise<void> {
    await expect(this.insetText).toBeVisible();
    await expect(this.childArrangementOrdersLabel).toBeVisible();
    await expect(this.domesticAbuseOrdersLabel).toBeVisible();
    await expect(this.fcOrdersLabel).toBeVisible();
    await expect(this.anyOtherOrdersLabel).toBeVisible();
    await this.pageUtils.assertStrings(ChildArrangementOrderTypesArray);
    await this.pageUtils.assertStrings(DomesticAbuseOrderTypesArray);
    await this.pageUtils.assertStrings(FcOrderTypesArray);
    await this.pageUtils.assertStrings(AnyOtherOrderTypesArray);
  }
}
