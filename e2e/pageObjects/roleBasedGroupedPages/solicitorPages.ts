import { Page } from "@playwright/test";
import { WithdrawApplicationEvent1Page } from "../pages/exui/withdrawApplication/withdrawApplicationEvent1.po.ts";
import { WithdrawApplicationEventSubmitPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventSubmit.po.ts";
import { WithdrawApplicationEventConfirmPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventConfirm.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { UploadAdditionalApplications1Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications1.po.js";
import { UploadAdditionalApplications2Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications2.po.js";
import { UploadAdditionalApplications3Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications3.po.js";
import { UploadAdditionalApplications4Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications4.po.js";
import { UploadAdditionalApplicationsSubmitPage } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplicationsSubmit.po.js";
import { UploadAdditionalApplicationsConfirmPage } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplicationsConfirm.po.js";
import { RequestSupport1Page } from "../pages/exui/caseFlags/requestSupport/requestSupport1.po.ts";
import { RequestSupport2Page } from "../pages/exui/caseFlags/requestSupport/requestSupport2.po.ts";
import { RequestSupport3Page } from "../pages/exui/caseFlags/requestSupport/requestSupport3.po.ts";
import { RequestSupport4Page } from "../pages/exui/caseFlags/requestSupport/requestSupport4.po.ts";
import { RequestSupport5Page } from "../pages/exui/caseFlags/requestSupport/requestSupport5.po.ts";
import { RequestSupportSubmitPage } from "../pages/exui/caseFlags/requestSupport/requestSupportSubmit.po.ts";
import { SupportPage } from "../pages/exui/caseView/support.po.js";
import { DraftAnOrder1Page } from "../pages/exui/orders/draftOrders/draftAnOrder1.po.js";
import { DraftAnOrder2Page } from "../pages/exui/orders/draftOrders/draftAnOrder2.po.js";
import { DraftAnOrder9Page } from "../pages/exui/orders/draftOrders/draftAnOrder9.po.js";
import { DraftAnOrder6Page } from "../pages/exui/orders/draftOrders/draftAnOrder6.po.js";
import { DraftAnOrder17Page } from "../pages/exui/orders/draftOrders/draftAnOrder17.po.js";
import { DraftAnOrder20Page } from "../pages/exui/orders/draftOrders/draftAnOrder20.po.js";
import { DraftAnOrderSubmitPage } from "../pages/exui/orders/draftOrders/draftAnOrderSubmit.po.js";
import { DraftAnOrder5Page } from "../pages/exui/orders/draftOrders/draftAnOrder5.po.js";

export class SolicitorPagesGroup {
  constructor(public readonly page: Page) {}

  get summaryPage() {
    return new SummaryPage(this.page);
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
      draftAnOrder5Page: new DraftAnOrder5Page(this.page),
      draftAnOrder6Page: new DraftAnOrder6Page(this.page),
      draftAnOrder9Page: new DraftAnOrder9Page(this.page),
      draftAnOrder17Page: new DraftAnOrder17Page(this.page),
      draftAnOrder20Page: new DraftAnOrder20Page(this.page),
      draftAnOrderSubmitPage: new DraftAnOrderSubmitPage(this.page),
    };
  }
}
