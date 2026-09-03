import { Page } from "@playwright/test";
import { WithdrawApplicationEvent1Page } from "../pages/exui/withdrawApplication/withdrawApplicationEvent1.po.ts";
import { WithdrawApplicationEventSubmitPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventSubmit.po.ts";
import { WithdrawApplicationEventConfirmPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventConfirm.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { UploadAdditionalApplications1Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications1.po.ts";
import { UploadAdditionalApplications2Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications2.po.ts";
import { UploadAdditionalApplications3Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications3.po.ts";
import { UploadAdditionalApplications4Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications4.po.ts";
import { UploadAdditionalApplicationsSubmitPage } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplicationsSubmit.po.ts";
import { UploadAdditionalApplicationsConfirmPage } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplicationsConfirm.po.ts";
import { RequestSupport1Page } from "../pages/exui/caseFlags/requestSupport/requestSupport1.po.ts";
import { RequestSupport2Page } from "../pages/exui/caseFlags/requestSupport/requestSupport2.po.ts";
import { RequestSupport3Page } from "../pages/exui/caseFlags/requestSupport/requestSupport3.po.ts";
import { RequestSupport4Page } from "../pages/exui/caseFlags/requestSupport/requestSupport4.po.ts";
import { RequestSupport5Page } from "../pages/exui/caseFlags/requestSupport/requestSupport5.po.ts";
import { RequestSupportSubmitPage } from "../pages/exui/caseFlags/requestSupport/requestSupportSubmit.po.ts";
import { SupportPage } from "../pages/exui/caseView/support.po.ts";
import { DraftAnOrder1Page } from "../pages/exui/orders/draftOrders/draftAnOrder1.po.ts";
import { DraftAnOrder2Page } from "../pages/exui/orders/draftOrders/draftAnOrder2.po.ts";
import { DraftAnOrder9Page } from "../pages/exui/orders/draftOrders/draftAnOrder9.po.ts";
import { DraftAnOrder6Page } from "../pages/exui/orders/draftOrders/draftAnOrder6.po.ts";
import { DraftAnOrder17Page } from "../pages/exui/orders/draftOrders/draftAnOrder17.po.ts";
import { DraftAnOrder20Page } from "../pages/exui/orders/draftOrders/draftAnOrder20.po.ts";
import { DraftAnOrderSubmitPage } from "../pages/exui/orders/draftOrders/draftAnOrderSubmit.po.ts";
import { DraftAnOrder5Page } from "../pages/exui/orders/draftOrders/draftAnOrder5.po.ts";
import { DraftAnOrder3Page } from "../pages/exui/orders/draftOrders/draftAnOrder3.po.ts";
import { DraftAnOrder8Page } from "../pages/exui/orders/draftOrders/draftAnOrder8.po.ts";
import { DraftAnOrder4Page } from "../pages/exui/orders/draftOrders/draftAnOrder4.po.ts";
import { DraftAnOrder7Page } from "../pages/exui/orders/draftOrders/draftAnOrder7.po.ts";
import { DeleteApplication1Page } from "../pages/exui/deleteApplication/deleteApplication1.po.ts";
import { DeleteApplicationSubmitPage } from "../pages/exui/deleteApplication/deleteApplicationSubmit.po.ts";
import { SolicitorTasksPage } from "../pages/exui/caseView/solicitor/tasks.po.ts";
import { CaseListPage } from "../pages/exui/caseList.po.ts";
import { Fl401Resubmit1Page } from "../pages/exui/resubmitApplication/fl401Resubmit1.po.js";
import { Fl401Resubmit2Page } from "../pages/exui/resubmitApplication/fl401Resubmit2.po.js";
import { C100Submit1Page } from "../pages/exui/resubmitApplication/c100Submit1.po.js";
import { C100Submit2Page } from "../pages/exui/resubmitApplication/c100Submit2.po.js";

export class SolicitorPagesGroup {
  constructor(public readonly page: Page) {}

  get summaryPage() {
    return new SummaryPage(this.page);
  }

  get tasksPage() {
    return new SolicitorTasksPage(this.page);
  }

  get caseListPage() {
    return new CaseListPage(this.page);
  }

  get withdrawApplicationEvent() {
    return {
      page1: new WithdrawApplicationEvent1Page(this.page),
      submitPage: new WithdrawApplicationEventSubmitPage(this.page),
      confirmPage: new WithdrawApplicationEventConfirmPage(this.page),
    };
  }

  get uploadAdditionalApplications() {
    return {
      uploadAdditionalApplications1Page: new UploadAdditionalApplications1Page(
        this.page,
      ),
      uploadAdditionalApplications2Page: new UploadAdditionalApplications2Page(
        this.page,
      ),
      uploadAdditionalApplications3Page: new UploadAdditionalApplications3Page(
        this.page,
      ),
      uploadAdditionalApplications4Page: new UploadAdditionalApplications4Page(
        this.page,
      ),
      submitPage: new UploadAdditionalApplicationsSubmitPage(this.page),
      confirmPage: new UploadAdditionalApplicationsConfirmPage(this.page),
    };
  }

  get supportPage() {
    return new SupportPage(this.page);
  }

  get caseFlags() {
    return {
      requestSupport1Page: new RequestSupport1Page(this.page),
      requestSupport2Page: new RequestSupport2Page(this.page),
      requestSupport3Page: new RequestSupport3Page(this.page),
      requestSupport4Page: new RequestSupport4Page(this.page),
      requestSupport5Page: new RequestSupport5Page(this.page),
      requestSupportSubmitPage: new RequestSupportSubmitPage(this.page),
    };
  }

  get draftOrders() {
    return {
      draftAnOrder1Page: new DraftAnOrder1Page(this.page),
      draftAnOrder2Page: new DraftAnOrder2Page(this.page),
      draftAnOrder3Page: new DraftAnOrder3Page(this.page),
      draftAnOrder4Page: new DraftAnOrder4Page(this.page),
      draftAnOrder5Page: new DraftAnOrder5Page(this.page),
      draftAnOrder6Page: new DraftAnOrder6Page(this.page),
      draftAnOrder7Page: new DraftAnOrder7Page(this.page),
      draftAnOrder8Page: new DraftAnOrder8Page(this.page),
      draftAnOrder9Page: new DraftAnOrder9Page(this.page),
      draftAnOrder17Page: new DraftAnOrder17Page(this.page),
      draftAnOrder20Page: new DraftAnOrder20Page(this.page),
      draftAnOrderSubmitPage: new DraftAnOrderSubmitPage(this.page),
    };
  }

  get deleteApplication() {
    return {
      page1: new DeleteApplication1Page(this.page),
      submitPage: new DeleteApplicationSubmitPage(this.page),
    };
  }

  get resubmitApplication() {
    return {
      fl401Page1: new Fl401Resubmit1Page(this.page),
      fl401Page2: new Fl401Resubmit2Page(this.page),
      c100Page1: new C100Submit1Page(this.page),
      c100Page2: new C100Submit2Page(this.page),
    };
  }
}
