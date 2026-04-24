import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../common/types.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";

export interface OrderInformation {
  Order: OrderTypes;
  typeOfOrder: string;
  welshDocument?: string;
  childrenList?: string[];
  isOrderAboutAllTheChildren?: boolean;
  englishDocument: string;
  otherDetails: OtherDetails;
  isOrderAboutChildren?: boolean;
  serveOrderDetails: ServeOrderDetails;
}

interface OtherDetails {
  orderMadeBy?: string;
  orderCreatedBy: string;
  dateOrderCreated?: string; // example format: 13 Nov 2025, 2:16:51 PM
  dateOrderMade?: string;
  dateOrderServed?: string;
}

interface ServeOrderDetails {
  recipients?: string[];
  serveCafcass?: boolean;
  responsibleToServe: string;
}

export class OrdersPage extends CaseAccessViewPage {
  private readonly OrdersTable: Locator = this.page.locator(
    "#case-viewer-field-read--orderCollection",
  );

  private dateHelper: DateHelperUtils = new DateHelperUtils();

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Orders" }).click();
  }

  async assertOrders(Orders: OrderInformation[]): Promise<void> {
    for (let i = 0; i < Orders.length; i++) {
      const Order: OrderInformation = Orders[i];
      const OrderTable: Locator = this.OrdersTable.getByRole("cell", {
        name: `Orders ${i + 1}`,
      });
      const OrdersHeading: Locator = OrderTable.getByText(`Orders ${i + 1}`);
      await expect(OrdersHeading).toBeVisible();
      await this.assertTableRow(OrderTable, "Type of order", Order.typeOfOrder);
      if (Order.welshDocument) {
        await this.assertTableRow(
          OrderTable,
          "Welsh document",
          Order.welshDocument,
        );
      }
      await this.assertTableRow(
        OrderTable,
        "English document",
        Order.englishDocument,
      );
      // specific to FL401
      if (Order.isOrderAboutChildren) {
        await this.assertTableRow(
          OrderTable,
          "Is the order about the children?",
          `${Order.isOrderAboutChildren ? "Yes" : "No"}`,
        );
      }
      // specific to C100
      if (Order.isOrderAboutAllTheChildren) {
        await this.assertTableRow(
          OrderTable,
          "Is the order about all the children?",
          `${Order.isOrderAboutAllTheChildren ? "Yes" : "No"}`,
        );
      }
      if (Order.childrenList) {
        await this.assertTableRow(
          OrderTable,
          "Children list",
          `${Order.childrenList.join(", ")}`,
        );
      }

      //serve order details
      const serveOrderDetailsHeading: Locator = OrderTable.getByText(
        "Serve order details",
      );
      await expect(serveOrderDetailsHeading).toBeVisible();
      if (Order.serveOrderDetails.recipients) {
        await this.assertTableRow(
          OrderTable,
          "Recipients",
          `${Order.serveOrderDetails.recipients.join(", ")}`,
        );
      }
      if (Order.serveOrderDetails.serveCafcass) {
        await this.assertTableRow(
          OrderTable,
          "Is Cafcass Cymru involved?",
          `${Order.serveOrderDetails.serveCafcass ? "Yes" : "No"}`,
        );
      }
      if (Order.serveOrderDetails.responsibleToServe) {
        await this.assertTableRow(
          OrderTable,
          "Who is responsible for serving the respondent?",
          Order.serveOrderDetails.responsibleToServe,
        );
      }

      // other details
      const otherDetailsHeading: Locator =
        OrderTable.getByText("Other details");
      await expect(otherDetailsHeading).toBeVisible();
      if (Order.otherDetails.orderMadeBy) {
        await this.assertTableRow(
          OrderTable,
          "Order made by",
          Order.otherDetails.orderMadeBy,
        );
      }
      await this.assertTableRow(
        OrderTable,
        "Order created by",
        Order.otherDetails.orderCreatedBy,
      );
      if (Order.otherDetails.dateOrderCreated) {
        await this.assertTableRow(
          OrderTable,
          "Date order created",
          Order.otherDetails.dateOrderCreated,
        );
      } else {
        await this.assertTableRow(
          OrderTable,
          "Date order created",
          this.dateHelper.todayDate() as string,
        );
      }
      if (Order.otherDetails.dateOrderMade) {
        await this.assertTableRow(
          OrderTable,
          "Date order made",
          Order.otherDetails.dateOrderMade,
        );
      } else {
        await this.assertTableRow(
          OrderTable,
          "Date order made",
          this.dateHelper.todayDate() as string,
        );
      }
      if (Order.otherDetails.dateOrderServed) {
        await this.assertTableRow(
          OrderTable,
          "Date on which the order was served",
          Order.otherDetails.dateOrderServed,
        );
      } else {
        await this.assertTableRow(
          OrderTable,
          "Date on which the order was served",
          this.dateHelper.todayDate() as string,
        );
      }
    }
  }

  private async assertTableRow(
    OrderTable: Locator,
    label: string,
    value: string,
  ): Promise<void> {
    const labelLocator: Locator = OrderTable.getByRole("rowheader", {
      name: label,
      exact: true,
    }).first();
    // date order made only checks against date by default and not time because the time is to the second
    // so don't use exact value for the date order was created
    const exactValue: boolean = !label.includes("Date");
    const valueLocator: Locator = OrderTable.getByRole("cell", {
      name: value,
      exact: exactValue,
    }).first();
    await expect(labelLocator).toBeVisible();
    await expect(valueLocator).toBeVisible();
  }
}
