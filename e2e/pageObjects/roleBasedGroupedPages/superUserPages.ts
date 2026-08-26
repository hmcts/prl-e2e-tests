import { Page } from "playwright-core";
import { ExitAwaitingInformationSubmitPage } from "../pages/exui/exitAwaitingInformation/exitAwaitingInformationSubmit.po.ts";
import { ExitAwaitingInformation1Page } from "../pages/exui/exitAwaitingInformation/exitAwaitingInformation1.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";

export class SuperUserPagesGroup {
  constructor(public readonly page: Page) {}

  get exitAwaitingInformation() {
    return {
      page1: new ExitAwaitingInformation1Page(this.page),
      submitPage: new ExitAwaitingInformationSubmitPage(this.page),
    };
  }

  get summaryPage() {
    return new SummaryPage(this.page);
  }
}
