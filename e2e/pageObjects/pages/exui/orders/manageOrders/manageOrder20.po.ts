import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../../common/types.js";
import { PreviewOrdersComponent } from "../../../../components/exui/orders/previewOrders.component.js";
import { ExuiMediaViewerPage } from "../../exuiMediaViewer.po.ts";

export class ManageOrder20Page extends EventPage {
  private readonly previewOrderComponent: PreviewOrdersComponent =
    new PreviewOrdersComponent(this.page);
  private customOrderLink: Locator;
  constructor(page: Page) {
    super(page, "Manage orders");

  }

  async assertPageContents(
    orderType: OrderTypes,
    caseNumber: string,
    pdfName: string,
    snapshotsPath: string[],
  ): Promise<void> {
    await this.assertPageHeadings();
    await this.previewOrderComponent.assertOrdersPage20Contents(
      orderType,
      caseNumber,
      pdfName,
      snapshotsPath,
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async checkCustomOrderPreviewLink(caseRef) {
    this.customOrderLink = this.page.getByRole("button", {
        name: `custom_order_header_preview_${caseRef}.docx`,
      })
    await expect(this.customOrderLink).toBeVisible();
    await this.customOrderLink.click();
    const mediaViewer = new ExuiMediaViewerPage(this.page);
    await mediaViewer.waitForLoad(); 
    return mediaViewer;
  }
}
