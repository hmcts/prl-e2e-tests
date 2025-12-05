import { Page } from "@playwright/test";
import { WithdrawApplicationEvent1Page } from "../pages/exui/withdrawApplication/withdrawApplicationEvent1.po.ts";
import { WithdrawApplicationEventSubmitPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventSubmit.po.ts";
import { WithdrawApplicationEventConfirmPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventConfirm.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";

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
}
