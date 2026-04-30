import { EventPage } from "../../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import {
  clippingCoords,
  ExuiMediaViewerPage,
} from "../../exuiMediaViewer.po.ts";
import { NavigationUtils } from "../../../../../utils/navigation.utils.ts";
import { OrderTypes } from "../../../../../common/types.ts";

// this page does use the same ManageOrders5 page in the backend but is significantly different so is a separate page
export class CustomOrderManageOrder20Page extends EventPage {
  private readonly navigationUtils: NavigationUtils = new NavigationUtils();

  private readonly previewOrderHeading: Locator = this.page.getByRole(
    "heading",
    { name: "Preview of order header" },
  );
  private readonly ifYouWantToMakeFurtherChangesLabel: Locator =
    this.page.getByText(
      "If you want to make further changes, go back to the previous screen.",
    );

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(
    caseNumber: string,
    snapshotsPath: string[],
    orderType: OrderTypes,
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.previewOrderHeading).toBeVisible();
    await expect(this.ifYouWantToMakeFurtherChangesLabel).toBeVisible();
    // check generated order heading
    const customOrderHeaderPreviewLink: Locator = this.page.getByRole(
      "button",
      {
        name: `custom_order_header_preview_${caseNumber}.docx`,
      },
    );
    await expect(customOrderHeaderPreviewLink).toBeVisible();
    await this.assertCustomOrderHeading(
      customOrderHeaderPreviewLink,
      caseNumber,
      snapshotsPath,
      orderType,
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  private async assertCustomOrderHeading(
    customOrderHeaderPreviewLink: Locator,
    caseNumber: string,
    snapshotsPath: string[],
    orderType: OrderTypes,
  ): Promise<void> {
    const docPage: Page = await this.navigationUtils.openPdfLink(
      this.page,
      customOrderHeaderPreviewLink,
    );
    // locators to mask in screenshot
    const formattedCaseNumber: string = `${caseNumber.slice(0, 4)}-${caseNumber.slice(4, 8)}-${caseNumber.slice(8, 12)}-${caseNumber.slice(12, 16)}`;
    const caseNumberLocator: Locator = docPage.getByText(formattedCaseNumber);
    const snapshotPath: string[] = [
      ...snapshotsPath,
      this.getSnapshotName(orderType),
    ];
    const mediaViewerPage = new ExuiMediaViewerPage(docPage);
    await mediaViewerPage.runVisualTestOnAllPages(
      docPage,
      snapshotPath,
      clippingCoords.centeredPageWithoutToolbar,
      [caseNumberLocator],
    );
    await docPage.close();
  }

  private getSnapshotName(orderType: OrderTypes): string {
    let snapshotName: string = "";
    switch (orderType) {
      case "Amended, discharged or varied order (FL404B)":
        snapshotName = "amended-discharged-or-varied-custom-order-draft-header";
        break;
      case "Parental responsibility order (C45A)":
        snapshotName = "parental-responsibility-custom-order-draft-header";
        break;
    }
    return snapshotName;
  }
}
