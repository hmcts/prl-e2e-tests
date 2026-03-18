import { Page } from "@playwright/test";
import { SendAndReplyToMessages1Page } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessages1.po.js";
import { SendAndReplyToMessages4Page } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessages4.po.js";
import { SendAndReplyToMessages5Page } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessages5.po.js";
import { SendAndReplyToMessagesConfirmPage } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessagesConfirm.po.js";
import { SendAndReplyToMessagesSubmitPage } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessagesSubmit.po.js";
import { SummaryPage } from "../pages/exui/caseView/summary.po.js";
import { ManageOrder1Page } from "../pages/exui/orders/manageOrders/manageOrder1.po.js";
import { ManageOrder2Page } from "../pages/exui/orders/manageOrders/manageOrder2.po.js";
import { ManageOrder5Page } from "../pages/exui/orders/manageOrders/manageOrder5.po.js";
import { ManageOrder10Page } from "../pages/exui/orders/manageOrders/manageOrder10.po.js";
import { ManageOrder19Page } from "../pages/exui/orders/manageOrders/manageOrder19.po.js";
import { ManageOrder20Page } from "../pages/exui/orders/manageOrders/manageOrder20.po.js";
import { ManageOrder24Page } from "../pages/exui/orders/manageOrders/manageOrder24.po.js";
import { ManageOrderSubmitPage } from "../pages/exui/orders/manageOrders/manageOrderSubmit.po.js";
import { ManageOrder12Page } from "../pages/exui/orders/manageOrders/manageOrder12.po.js";
import { ManageOrder102Page } from "../pages/exui/orders/manageOrders/customOrders/manageOrder102.po.ts";
import { ManageOrder5CustomOrderPage } from "../pages/exui/orders/manageOrders/customOrders/manageOrder5.po.ts";
import { ManageOrder26Page } from "../pages/exui/orders/manageOrders/manageOrder26.po.ts";
import { ManageOrder27Page } from "../pages/exui/orders/manageOrders/manageOrder27.po.ts";
import { ManageOrder28Page } from "../pages/exui/orders/manageOrders/manageOrder28.po.ts";
export class JudgePagesGroup {
  constructor(public readonly page: Page) {}

  get summaryPage() {
    return new SummaryPage(this.page);
  }

  get sendAndReplyToMessages() {
    return {
      sendAndReplyToMessages1Page: new SendAndReplyToMessages1Page(this.page),
      sendAndReplyToMessages4Page: new SendAndReplyToMessages4Page(this.page),
      sendAndReplyToMessages5Page: new SendAndReplyToMessages5Page(this.page),
      sendAndReplyToMessagesConfirmPage: new SendAndReplyToMessagesConfirmPage(
        this.page,
      ),
      sendAndReplyToMessagesSubmitPage: new SendAndReplyToMessagesSubmitPage(
        this.page,
      ),
    };
  }

  get manageOrders() {
    return {
      manageOrder1Page: new ManageOrder1Page(this.page),
      manageOrder2Page: new ManageOrder2Page(this.page),
      manageOrder5Page: new ManageOrder5Page(this.page),
      manageOrder10Page: new ManageOrder10Page(this.page),
      manageOrder12Page: new ManageOrder12Page(this.page),
      manageOrder19Page: new ManageOrder19Page(this.page),
      manageOrder20Page: new ManageOrder20Page(this.page),
      manageOrder24Page: new ManageOrder24Page(this.page),
      manageOrder26Page: new ManageOrder26Page(this.page),
      manageOrder27Page: new ManageOrder27Page(this.page),
      manageOrder28Page: new ManageOrder28Page(this.page),
      manageOrderSubmitPage: new ManageOrderSubmitPage(this.page),
    };
  }

  get customOrders() {
    return {
      manageOrder102Page: new ManageOrder102Page(this.page),
      manageOrder5Page: new ManageOrder5CustomOrderPage(this.page),
    };
  }
}
