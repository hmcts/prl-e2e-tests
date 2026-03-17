import { EventPage } from "../../../eventPage.po.ts";
import { Page, Locator, expect } from "@playwright/test";
import {
  JudgeOrMagistrateTitles,
  OrderTypes,
  solicitorCaseCreateType,
  c43OrderDetails,
  c43CAOrderType,
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
  readonly c43OrderSelectText: Locator;
  readonly fileUpload: string = "#customOrderDoc";

  constructor(page: Page) {
    super(page, "Manage orders");
    this.orderDetailsComponent = new OrderDetailsComponent(this.page);
    this.orderOptionsComponent = new OrderOptionsComponent(this.page);
    
    this.formLabelSelectOrderName = this.page.getByText("Select order name");
    this.c43OrderDetailsHeading = this.page.getByRole("heading", { name: "C43 Order Details" });
    this.c43OrderSelectText = this.page.getByText("Select orders to issue");
  }

  async assertPageContents(caseType: solicitorCaseCreateType, orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await this.orderDetailsComponent.assertOrderPageContents(caseType, orderType, "manageOrder");
  }

  async selectC43OrderDetails(ordersToIssue: c43OrderDetails): Promise<void> {
    await this.page.getByLabel(ordersToIssue, { exact: true }).check();
  }

  async selectTypeOfChildArrangementsOrder(typeOfCAOrder: c43CAOrderType): Promise<void> {
    await expect(this.page.getByLabel(typeOfCAOrder)).toBeVisible();
    await this.page.getByLabel(typeOfCAOrder, { exact: true }).check();
  }

  async uploadCustomOrderTemplate(filePath: string): Promise<void> {
    const fileUpload = new FileUploadComponent(this.page, {
      uploadLabelText: "Upload custom order template (.docx only)",
      downloadParagraphText: "Please upload a .docx file. Other formats will be rejected.",
      chooseFileLocatorID: this.fileUpload,
    });
    await fileUpload.completeUpload(filePath);
  }

  async fillJudgeAndDateDetails(title: JudgeOrMagistrateTitles, name: string, isAllChildren: boolean): Promise<void> {
    await this.orderDetailsComponent.selectJudgeOrMagistrateTitle(title);
    await this.orderDetailsComponent.inputJudgeFullName(name);
    await this.orderDetailsComponent.selectifOrderAboutAllChildren(isAllChildren);
  }

  async completeC43CustomOrderConfiguration(params: {
    orderTypeLabel: c43OrderDetails;
    caOrderType: c43CAOrderType;
    filePath: string;
    orderByConsent: boolean;
    judgeTitle: JudgeOrMagistrateTitles;
    judgeName: string;
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
    await this.fillJudgeAndDateDetails(params.judgeTitle, params.judgeName, params.isAllChildren);
  }
}