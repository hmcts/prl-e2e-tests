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
import { ManageOrder102Page } from "../pages/exui/orders/manageOrders/manageOrder102.po.ts";
import { CustomOrdersManageOrder5Page } from "../pages/exui/orders/manageOrders/customOrderManageOrder5.po.ts";
import { CustomOrderManageOrder20Page } from "../pages/exui/orders/manageOrders/customOrderManageOrder20.po.ts";
import { ManageOrderUrgentPage } from "../pages/exui/orders/manageOrders/manageOrderUrgent.po.ts";
import { EditAndApproveAnOrder2Page } from "../pages/exui/orders/editAndApproveAnOrders/editAndApproveAnOrder2.po.js";
import { EditAndApproveAnOrder21Page } from "../pages/exui/orders/editAndApproveAnOrders/editAndApproveAnOrder21.po.js";
import { TasksPage } from "../pages/exui/caseView/tasks.po.js";
import { EditAndApproveAnOrderSubmitPage } from "../pages/exui/orders/editAndApproveAnOrders/editAndApproveAnOrderSubmit.po.js";
import { EditAndApproveAnOrderConfirmPage } from "../pages/exui/orders/editAndApproveAnOrders/editAndApproveAnOrderConfirm.po.js";
import { HistoryPage } from "../pages/exui/caseView/history.po.js";
import { ListOnNotice1Page } from "../pages/exui/list/listOnNotice1.po.js";
import { ListOnNotice2Page } from "../pages/exui/list/listOnNotice2.po.js";
import { ListOnNotice3Page } from "../pages/exui/list/listOnNotice3.po.js";
import { Fl401ListOnNotice2Page } from "../pages/exui/list/fl401ListOnNotice2.po.js";
import { Fl401OnNoticeSubmitPage } from "../pages/exui/list/fl401OnNoticeSubmit.po.js";
import { Fl401ListOnNoticeConfirmPage } from "../pages/exui/list/fl401ListOnNoticeConfirm.po.js";
import { ListWithoutNotice1Page } from "../pages/exui/list/listWithoutNotice1.po.js";
import { ListWithoutNoticeSubmitPage } from "../pages/exui/list/listWithoutNoticeSubmit.po.js";
import { ListWithoutNoticeConfirmPage } from "../pages/exui/list/listWithoutNoticeConfirm.po.js";
import { CaseNotesPage } from "../pages/exui/caseView/caseNotes.po.js";

export class JudgePagesGroup {
  constructor(public readonly page: Page) {}

  get summaryPage() {
    return new SummaryPage(this.page);
  }
  get tasksPage() {
    return new TasksPage(this.page);
  }
  get historyPage() {
    return new HistoryPage(this.page);
  }
  get caseNotesPage() {
    return new CaseNotesPage(this.page);
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
      manageOrder102Page: new ManageOrder102Page(this.page),
      manageOrder2Page: new ManageOrder2Page(this.page),
      manageOrder3Page: new ManageOrder3Page(this.page),
      manageOrder4Page: new ManageOrder4Page(this.page),
      manageOrder5Page: new ManageOrder5Page(this.page),
      customOrderManageOrder5Page: new CustomOrdersManageOrder5Page(this.page),
      manageOrder10Page: new ManageOrder10Page(this.page),
      manageOrder12Page: new ManageOrder12Page(this.page),
      powerOfArrestManageOrder12Page: new PowerOfArrestManageOrders12Page(
        this.page,
      ),
      manageOrder19Page: new ManageOrder19Page(this.page),
      manageOrder20Page: new ManageOrder20Page(this.page),
      customOrderManageOrder20Page: new CustomOrderManageOrder20Page(this.page),
      manageOrderUrgentPage: new ManageOrderUrgentPage(this.page),
      manageOrder30Page: new ManageOrder30Page(this.page),

      manageOrderSubmitPage: new ManageOrderSubmitPage(this.page),
    };
  }

  get draftedOrders() {
    return {
      draftOrdersPage: new DraftOrdersPage(this.page),
    };
  }

  get editAndApproveAnOrders() {
    return {
      editAndApproveAnOrder2Page: new EditAndApproveAnOrder2Page(this.page),
      editAndApproveAnOrder21Page: new EditAndApproveAnOrder21Page(this.page),
      editAndApproveAnOrderSubmitPage: new EditAndApproveAnOrderSubmitPage(
        this.page,
      ),
      editAndApproveAnOrderConfirmPage: new EditAndApproveAnOrderConfirmPage(
        this.page,
      ),
    };
  }

  get listOnNotice() {
    return {
      listOnNotice1Page: new ListOnNotice1Page(this.page),
      listOnNotice2Page: new ListOnNotice2Page(this.page),
      listOnNotice3Page: new ListOnNotice3Page(this.page),
      fl401ListOnNotice2Page: new Fl401ListOnNotice2Page(this.page),
      fl401OnNoticeSubmitPage: new Fl401OnNoticeSubmitPage(this.page),
      fl401ListOnNoticeConfirmPage: new Fl401ListOnNoticeConfirmPage(this.page),
    };
  }

  get listWithoutNotice() {
    return {
      listWithoutNotice1Page: new ListWithoutNotice1Page(this.page),
      listWithoutNoticeSubmitPage: new ListWithoutNoticeSubmitPage(this.page),
      listWithoutNoticeConfirmPage: new ListWithoutNoticeConfirmPage(this.page),
    };
  }
}
