import { Page } from "@playwright/test";
import { WithdrawApplicationEvent1Page } from "../../pageObjects/pages/exui/withdrawApplication/withdrawApplicationEvent1.po.ts";
import { WithdrawApplicationEventSubmitPage } from "../../pageObjects/pages/exui/withdrawApplication/withdrawApplicationEventSubmit.po.ts";
import { WithdrawApplicationEventConfirmPage } from "../../pageObjects/pages/exui/withdrawApplication/withdrawApplicationEventConfirm.po.ts";
import { SummaryPage } from "../../pageObjects/pages/exui/caseView/summary.po.ts";

export class SolicitorPagesGroup {
  readonly withdrawApplicationEvent1Page: WithdrawApplicationEvent1Page;
  readonly withdrawApplicationEventSubmitPage: WithdrawApplicationEventSubmitPage;
  readonly withdrawApplicationEventConfirmPage: WithdrawApplicationEventConfirmPage;
  readonly summaryPage: SummaryPage;

  constructor(public page: Page) {
    this.withdrawApplicationEvent1Page = new WithdrawApplicationEvent1Page(
      page,
    );
    this.withdrawApplicationEventSubmitPage =
      new WithdrawApplicationEventSubmitPage(page);
    this.withdrawApplicationEventConfirmPage =
      new WithdrawApplicationEventConfirmPage(page);
    this.summaryPage = new SummaryPage(page);
  }
}
