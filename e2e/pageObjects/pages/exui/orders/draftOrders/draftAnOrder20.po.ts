import { EventPage } from "../../eventPage.po.js";
import { expect, Page } from "@playwright/test";
import { OrderTypes } from "../../../../../common/types.js";
import { PreviewOrdersComponent } from "../../../../components/exui/orders/previewOrders.component.js";

export class DraftAnOrder20Page extends EventPage {
  private readonly order20PageComponent: PreviewOrdersComponent =
    new PreviewOrdersComponent(this.page);

  constructor(page: Page) {
    super(page, "Create/upload draft order");
  }

  async assertPageContents(
    orderType: OrderTypes,
    caseNumber: string,
    pdfName: string,
    snapshotsPath: string[],
  ): Promise<void> {
    await this.assertPageHeadings();
    await this.order20PageComponent.assertOrdersPage20Contents(
      orderType,
      caseNumber,
      pdfName,
      snapshotsPath,
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }
}
