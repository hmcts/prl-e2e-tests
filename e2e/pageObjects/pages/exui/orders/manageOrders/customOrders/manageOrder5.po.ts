import { EventPage } from "../../../eventPage.po.ts";
import { Page, Locator, expect } from "@playwright/test";
import {
  JudgeOrMagistrateTitles,
  OrderTypes,
  solicitorCaseCreateType,
  c43OrderDetails,
  c43CAOrderType,
  c21OrderDetails,
} from "../../../../../../common/types.ts";
import { OrderDetailsComponent } from "../../../../../components/exui/orders/orderDetails.component.ts";
import { OrderOptionsComponent } from "../../../../../components/exui/orders/orderOptions.component.ts";
import { FileUploadComponent } from "../../../../../components/exui/uploadFile.component.ts";

export class ManageOrder5CustomOrderPage extends EventPage {
  // Components
  readonly orderDetailsComponent: OrderDetailsComponent;
  readonly orderOptionsComponent: OrderOptionsComponent;

  // Locators
  readonly formLabelSelectOrderName: Locator;
  readonly c43OrderDetailsHeading: Locator;
  readonly c21OrderDetailsHeading: Locator;
  readonly c43OrderSelectText: Locator;
  readonly fileUpload: string = "#customOrderDoc";

  constructor(page: Page) {
    super(page, "Manage orders");
    this.orderDetailsComponent = new OrderDetailsComponent(this.page);
    this.orderOptionsComponent = new OrderOptionsComponent(this.page);

    this.formLabelSelectOrderName = this.page.getByText("Select order name");

    this.c43OrderDetailsHeading = this.page.getByRole("heading", {
      name: "C43 Order Details",
    });

    this.c21OrderDetailsHeading = this.page.getByRole("heading", {
      name: "C21 Order Details",
    });

    this.c43OrderSelectText = this.page.getByText("Select orders to issue");
  }

  async assertPageContents(
    caseType: solicitorCaseCreateType,
    orderType: OrderTypes,
  ): Promise<void> {
    await this.assertPageHeadings();
    await this.orderDetailsComponent.assertOrderPageContents(
      caseType,
      orderType,
      "manageOrder",
    );
  }

  async selectC43OrderDetails(ordersToIssue: c43OrderDetails): Promise<void> {
    await this.page.getByLabel(ordersToIssue, { exact: true }).check();
  }

  async selectC21OrderDetails(orderSubtype: c21OrderDetails): Promise<void> {
    // Exact match is safer as these strings are very similar
    await this.page.getByLabel(orderSubtype, { exact: true }).check();
  }

  async selectTypeOfChildArrangementsOrder(
    typeOfCAOrder: c43CAOrderType,
  ): Promise<void> {
    await expect(this.page.getByLabel(typeOfCAOrder)).toBeVisible();
    await this.page.getByLabel(typeOfCAOrder, { exact: true }).check();
  }

  async uploadCustomOrderTemplate(filePath: string): Promise<void> {
    const fileUpload = new FileUploadComponent(this.page, {
      uploadLabelText: "Upload custom order template (.docx only)",
      downloadParagraphText:
        "Please upload a .docx file. Other formats will be rejected.",
      chooseFileLocatorID: this.fileUpload,
    });
    await fileUpload.completeUpload(filePath);
  }

  /**
   * Helper for the Judge flow where title and name are read-only/pre-filled.
   * Only interacts with the mandatory "All children" radio button.
   */
  async selectOrderAboutAllChildren(isAllChildren: boolean): Promise<void> {
    await this.orderDetailsComponent.selectifOrderAboutAllChildren(
      isAllChildren,
    );
  }

  /**
   * High-level flow for C21 Custom Orders
   */
  async completeC21CustomOrderConfiguration(params: {
    c21Type: c21OrderDetails;
    filePath: string;
    isAllChildren: boolean;
  }): Promise<void> {
    await this.orderOptionsComponent.selectOrderType(
      "Blank order or directions (C21)",
    );
    await expect(this.c21OrderDetailsHeading).toBeVisible();

    await this.selectC21OrderDetails(params.c21Type);
    await this.uploadCustomOrderTemplate(params.filePath);
    await this.selectOrderAboutAllChildren(params.isAllChildren);
  }

  /**
   * High-level flow for C43 Custom Orders
   */
  async completeC43CustomOrderConfiguration(params: {
    orderTypeLabel: c43OrderDetails;
    caOrderType: c43CAOrderType;
    filePath: string;
    orderByConsent: boolean;
    isAllChildren: boolean;
  }): Promise<void> {
    await this.orderOptionsComponent.selectOrderType(
      "Child arrangements, specific issue or prohibited steps order (C43)",
    );
    await expect(this.c43OrderDetailsHeading).toBeVisible();

    await this.selectC43OrderDetails(params.orderTypeLabel);
    await this.selectTypeOfChildArrangementsOrder(params.caOrderType);
    await this.uploadCustomOrderTemplate(params.filePath);
    await this.orderDetailsComponent.isOrderByConsent(params.orderByConsent);
    await this.selectOrderAboutAllChildren(params.isAllChildren);
  }
}
