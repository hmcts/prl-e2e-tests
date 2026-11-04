import { EventPage } from "../../eventPage.po.js";
import { expect, Page } from "@playwright/test";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../common/types.js";
import { OrderDetailsComponent } from "../../../../components/exui/orders/orderDetails.component.js";

export class EditAndApproveAnOrder5Page extends EventPage {
  private readonly orderDetailsComponent: OrderDetailsComponent =
    new OrderDetailsComponent(this.page);

  constructor(page: Page) {
    super(page, "Edit and approve a draft order");
  }

  async assertPageContents(
    caseType: solicitorCaseCreateType,
    orderType: OrderTypes,
  ): Promise<void> {
    await this.assertPageHeadings();
    await this.orderDetailsComponent.assertOrderPageContents(
      true,
      caseType,
      orderType,
      "manageOrder",
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async assertPartiesAndRepresentation(value: string): Promise<void> {
    await this.orderDetailsComponent.assertPartiesAndRepresentationValue(value);
  }

  async fillPartiesAndRepresentation(value: string): Promise<void> {
    await this.orderDetailsComponent.fillPartiesAndRepresentation(value);
  }
}
