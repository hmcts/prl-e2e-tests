import { Page } from "@playwright/test";
import { WithdrawApplicationEvent1Page } from "../pages/exui/withdrawApplication/withdrawApplicationEvent1.po.ts";
import { WithdrawApplicationEventSubmitPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventSubmit.po.ts";
import { WithdrawApplicationEventConfirmPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventConfirm.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { RequestSupport1Page } from "../pages/exui/caseFlags/requestSupport/requestSupport1.po.ts";
import { RequestSupport2Page } from "../pages/exui/caseFlags/requestSupport/requestSupport2.po.ts";
import { RequestSupport3Page } from "../pages/exui/caseFlags/requestSupport/requestSupport3.po.ts";
import { RequestSupport4Page } from "../pages/exui/caseFlags/requestSupport/requestSupport4.po.ts";
import { RequestSupport5Page } from "../pages/exui/caseFlags/requestSupport/requestSupport5.po.ts";
import { RequestSupportSubmitPage } from "../pages/exui/caseFlags/requestSupport/requestSupportSubmit.po.ts";
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
