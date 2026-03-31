import { EventPage } from "../../eventPage.po.js";
import { expect, Page } from "@playwright/test";
import {
  JudgeOrMagistrateTitles,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../common/types.js";
import { OrderDetailsComponent } from "../../../../components/exui/orders/orderDetails.component.js";

interface DayMonthYear {
  day: string;
  month: string;
  year: string;
}

export interface DraftAnOrder5Params {
  orderType: OrderTypes;
  isOrderByConsent: boolean;
  wasOrderApprovedAtAHearing: boolean;
  hearing?: string; // No hearings available is a valid hearing
  judgeOrMagistratesTitle?: JudgeOrMagistrateTitles;
  judgeFullName?: string;
  justicesLegalAdviserFullName?: string;
  dateOrderMade?: DayMonthYear; // this is autofilled to today's date
  isOrderAboutTheChildren?: boolean;
  isOrderAboutAllTheChildren?: boolean;
  allChildrenInOrder?: string[];
  recitalsAndPreamble?: string;
  directions?: string;
}

export class DraftAnOrder5Page extends EventPage {
  private readonly orderDetailsComponent: OrderDetailsComponent =
    new OrderDetailsComponent(this.page);

  constructor(page: Page) {
    super(page, "Create/upload draft order");
  }

  async assertPageContents(
    isDraftAnOrder: boolean,
    caseType: solicitorCaseCreateType,
    orderType: OrderTypes,
  ): Promise<void> {
    await this.assertPageHeadings();
    await this.orderDetailsComponent.assertOrderPageContents(
      isDraftAnOrder, //create or upload
      caseType,
      orderType,
      "draftOrder",
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields(
    isDraftAnOrder: boolean,
    caseType: solicitorCaseCreateType,
    params: DraftAnOrder5Params,
  ): Promise<void> {
    await this.orderDetailsComponent.fillInFields(
      isDraftAnOrder, //create or upload
      caseType,
      "draftOrder",
      params,
    );
  }
}
