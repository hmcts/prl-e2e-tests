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
import { ManageOrder20Page } from "../pages/exui/orders/manageOrders/manageOrder20.po.js";
import { ManageOrderSubmitPage } from "../pages/exui/orders/manageOrders/manageOrderSubmit.po.js";
import { DraftOrdersPage } from "../pages/exui/caseView/draftOrders.po.js";
import { ManageOrder4Page } from "../pages/exui/orders/manageOrders/manageOrder4.po.js";
import { ManageOrder30Page } from "../pages/exui/orders/manageOrders/manageOrder30.po.js";
import { ManageOrder3Page } from "../pages/exui/orders/manageOrders/manageOrder3.po.js";
import { ManageOrder19Page } from "../pages/exui/orders/manageOrders/manageOrder19.po.js";
import { PowerOfArrestManageOrders12Page } from "../pages/exui/orders/manageOrders/powerOfArrestOrderManageOrder12.po.js";
import { ManageOrder12Page } from "../pages/exui/orders/manageOrders/manageOrder12.po.js";

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
      manageOrder3Page: new ManageOrder3Page(this.page),
      manageOrder4Page: new ManageOrder4Page(this.page),
      manageOrder5Page: new ManageOrder5Page(this.page),
      manageOrder10Page: new ManageOrder10Page(this.page),
      manageOrder12Page: new ManageOrder12Page(this.page),
      powerOfArrestManageOrder12Page: new PowerOfArrestManageOrders12Page(
        this.page,
      ),
      manageOrder19Page: new ManageOrder19Page(this.page),
      manageOrder20Page: new ManageOrder20Page(this.page),
      manageOrder30Page: new ManageOrder30Page(this.page),

      manageOrderSubmitPage: new ManageOrderSubmitPage(this.page),
    };
  }
  get draftedOrders() {
    return {
      draftOrdersPage: new DraftOrdersPage(this.page),
    };
  }
}
