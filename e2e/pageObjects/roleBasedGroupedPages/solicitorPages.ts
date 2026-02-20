import { Page } from "@playwright/test";
import { WithdrawApplicationEvent1Page } from "../pages/exui/withdrawApplication/withdrawApplicationEvent1.po";
import { WithdrawApplicationEventSubmitPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventSubmit.po";
import { WithdrawApplicationEventConfirmPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventConfirm.po";
import { SummaryPage } from "../pages/exui/caseView/summary.po";
import { UploadAdditionalApplications1Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications1.po.js";
import { UploadAdditionalApplications2Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications2.po.js";
import { UploadAdditionalApplications3Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications3.po.js";
import { UploadAdditionalApplications4Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications4.po.js";
import { UploadAdditionalApplicationsSubmitPage } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplicationsSubmit.po.js";
import { UploadAdditionalApplicationsConfirmPage } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplicationsConfirm.po.js";
import { RequestSupport1Page } from "../pages/exui/caseFlags/requestSupport/requestSupport1.po";
import { RequestSupport2Page } from "../pages/exui/caseFlags/requestSupport/requestSupport2.po";
import { RequestSupport3Page } from "../pages/exui/caseFlags/requestSupport/requestSupport3.po";
import { RequestSupport4Page } from "../pages/exui/caseFlags/requestSupport/requestSupport4.po";
import { RequestSupport5Page } from "../pages/exui/caseFlags/requestSupport/requestSupport5.po";
import { RequestSupportSubmitPage } from "../pages/exui/caseFlags/requestSupport/requestSupportSubmit.po";
import { SupportPage } from "../pages/exui/caseView/support.po.js";

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
}
