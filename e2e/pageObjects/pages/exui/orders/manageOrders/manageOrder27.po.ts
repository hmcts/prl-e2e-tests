import { Locator, Page, expect } from "@playwright/test";
import { EventPage } from "../../eventPage.po.ts";
import { FileUploadComponent } from "../../../../components/exui/uploadFile.component.ts";

export class ManageOrder27Page extends EventPage {
  readonly page: Page;

  readonly serveSavedOrdersHeading: Locator;
  readonly addAdditionalDocButton: Locator;
  readonly fileUpload: string;
  readonly orderCheckbox: (orderLabel: string) => Locator;

  constructor(page: Page) {
    super(page, "Manage Orders");
    this.page = page;
    this.fileUpload = "#serveOrderAdditionalDocuments_value";
    this.serveSavedOrdersHeading = page.getByRole("heading", {
      name: "Serve saved orders",
    });
    this.addAdditionalDocButton = page
      .getByRole("button", { name: "Add new" })
      .first();

    // Dynamic locator for the order checkboxes (e.g., "17 Mar 2026")
    this.orderCheckbox = (orderLabel) =>
      page.getByRole("checkbox", { name: orderLabel });
  }

  async verifyAndSelectOrder(orderLabel: string) {
    const checkbox = this.orderCheckbox(orderLabel);
    await expect(checkbox).toBeVisible();
    await checkbox.check();
  }

  /**
   * Adds a new document using the existing upload utility
   * @param filePath Path to the document
   */
  async uploadAdditionalDocument(filePath: string) {
    await this.addAdditionalDocButton.click();
    const fileUpload = new FileUploadComponent(this.page, {
      uploadLabelText: "Serve order additional documents",
      downloadParagraphText:
        "Upload additional documents that you plan to serve",
      chooseFileLocatorID: this.fileUpload,
    });
    await fileUpload.completeUpload(filePath);
  }
}
