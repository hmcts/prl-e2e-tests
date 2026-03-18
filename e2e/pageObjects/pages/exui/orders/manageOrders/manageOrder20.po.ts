import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../../common/types.js";
import { PreviewOrdersComponent } from "../../../../components/exui/orders/previewOrders.component.js";
import {
  ExuiMediaViewerPage,
  clippingCoords,
} from "../../exuiMediaViewer.po.ts";
import { NavigationUtils } from "../../../../../utils/navigation.utils.ts";
import { Helpers } from "../../../../../common/helpers.ts";
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

  async checkCustomOrderHeader(caseRef, snapshotPath) {
    this.customOrderLink = this.page.getByRole("button", {
      name: `custom_order_header_preview_${caseRef}.docx`,
    });
    await expect(this.customOrderLink).toBeVisible();
    const navigationUtils = new NavigationUtils();
    const pdfPage: Page = await navigationUtils.openPdfLink(
      this.page,
      this.customOrderLink,
    );
    const caseRefLocator: Locator = pdfPage.getByText(caseRef);
    const dateLocator: Locator = pdfPage.getByText(
      Helpers.getTodaySlashDate() as string,
    );
    const snapshotPathName: string[] = [
      ...snapshotPath,
      "custom-order-header-preview",
    ];
    const mediaViewerPage = new ExuiMediaViewerPage(pdfPage);
    await mediaViewerPage.runVisualTestOnAllPages(
      pdfPage,
      snapshotPathName,
      clippingCoords.centeredPageWithoutToolbar,
      [caseRefLocator, dateLocator],
    );
    await pdfPage.close();
  }
}
