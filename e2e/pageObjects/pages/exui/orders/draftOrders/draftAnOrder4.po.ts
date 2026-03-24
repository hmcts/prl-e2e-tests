import { EventPage } from "../../eventPage.po.js";
import { PageUtils } from "../../../../../utils/page.utils.js";
import { expect, Page } from "@playwright/test";

export interface DraftAnOrder4Params {
  C21OrderSubType: string;
}

export class DraftAnOrder4Page extends EventPage {
  private readonly selectOrderLabel = this.page.getByText(
    "Select the type of order",
  );

  private readonly orderOptionsFormLabels: string[] = [
    "Blank order or directions (C21): application refused",
    "Blank order or directions (C21): to withdraw application",
    "Blank order or directions (C21): no order made",
    "Blank order or directions (C21): Other",
  ];

  constructor(page: Page) {
    super(page, "Create/upload draft order");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.selectOrderLabel).toBeVisible();
    await this.pageUtils.assertStrings(this.orderOptionsFormLabels);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectC21OrderDetails({
    C21OrderSubType,
  }: DraftAnOrder4Params): Promise<void> {
    await this.page.getByLabel(C21OrderSubType, { exact: true }).check();
  }
}
