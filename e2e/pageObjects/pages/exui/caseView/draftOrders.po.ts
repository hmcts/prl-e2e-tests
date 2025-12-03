import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../common/types.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";

export interface OrderInformation {
  typeOfOrder: OrderTypes;
  welshDocument?: string;
  englishDocument: string;
  otherDetails: OtherDetails;
  childrenList?: string[];
  isOrderAboutChildren?: boolean;
  isOrderAboutAllTheChildren?: boolean;
}

interface OtherDetails {
  orderMadeBy?: string;
  orderCreatedBy: string;
  dateOrderMade?: string; // example format: 13 Nov 2025, 2:16:51 PM
  status: string;
}

export class DraftOrdersPage extends CaseAccessViewPage {
  private readonly draftOrdersTable: Locator = this.page.locator(
    "#case-viewer-field-read--draftOrderCollection",
  );

  private dateHelper: DateHelperUtils = new DateHelperUtils();

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    // double check this is the right name
    await this.page.getByRole("tab", { name: "Draft Orders" }).click();
  }

  async assertDraftOrders(draftOrders: OrderInformation[]): Promise<void> {
    for (let i = 0; i < draftOrders.length; i++) {
      const draftOrder: OrderInformation = draftOrders[i];
      const draftOrderTable: Locator = this.draftOrdersTable.getByRole("cell", {
        name: `Draft orders ${i + 1}`,
      });
      const draftOrdersHeading: Locator = draftOrderTable.getByText(
        `Draft orders ${i + 1}`,
      );
      await expect(draftOrdersHeading).toBeVisible();
      await this.assertTableRow(
        draftOrderTable,
        "Type of order",
        draftOrder.typeOfOrder,
      );
      if (draftOrder.welshDocument) {
        await this.assertTableRow(
          draftOrderTable,
          "Welsh document",
          draftOrder.welshDocument,
        );
      }
      await this.assertTableRow(
        draftOrderTable,
        "English document",
        draftOrder.englishDocument,
      );
      // specific to FL401
      if (draftOrder.isOrderAboutChildren) {
        await this.assertTableRow(
          draftOrderTable,
          "Is the order about the children?",
          `${draftOrder.isOrderAboutChildren ? "Yes" : "No"}`,
        );
      }
      // specific to C100
      if (draftOrder.isOrderAboutAllTheChildren) {
        await this.assertTableRow(
          draftOrderTable,
          "Is the order about all the children?",
          `${draftOrder.isOrderAboutAllTheChildren ? "Yes" : "No"}`,
        );
      }
      if (draftOrder.childrenList) {
        await this.assertTableRow(
          draftOrderTable,
          "Children list",
          `${draftOrder.childrenList.join(", ")}`,
        );
      }

      // other details
      const otherDetailsHeading: Locator =
        draftOrderTable.getByText("Other details");
      await expect(otherDetailsHeading).toBeVisible();
      if (draftOrder.otherDetails.orderMadeBy) {
        await this.assertTableRow(
          draftOrderTable,
          "Type of order",
          draftOrder.otherDetails.orderMadeBy,
        );
      }
      await this.assertTableRow(
        draftOrderTable,
        "Order created by",
        draftOrder.otherDetails.orderCreatedBy,
      );
      if (draftOrder.otherDetails.dateOrderMade) {
        await this.assertTableRow(
          draftOrderTable,
          "Date order created",
          draftOrder.otherDetails.dateOrderMade,
        );
      } else {
        await this.assertTableRow(
          draftOrderTable,
          "Date order created",
          this.dateHelper.todayDate() as string,
        );
      }
      await this.assertTableRow(
        draftOrderTable,
        "Status",
        draftOrder.otherDetails.status,
      );
    }
  }

  private async assertTableRow(
    draftOrderTable: Locator,
    label: string,
    value: string,
  ): Promise<void> {
    const labelLocator: Locator = draftOrderTable
      .getByRole("cell", {
        name: label,
        exact: true,
      })
      .first();
    // date order made only checks against date by default and not time because the time is to the second
    // so don't use exact value for the date order was created
    const exactValue: boolean = label !== "Date order created";
    const valueLocator: Locator = draftOrderTable
      .getByRole("cell", {
        name: value,
        exact: exactValue,
      })
      .first();
    await expect(labelLocator).toBeVisible();
    await expect(valueLocator).toBeVisible();
  }
}
