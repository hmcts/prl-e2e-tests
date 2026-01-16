import { Page } from "@playwright/test";
import { WithdrawApplicationEvent1Page } from "../pages/exui/withdrawApplication/withdrawApplicationEvent1.po.ts";
import { WithdrawApplicationEventSubmitPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventSubmit.po.ts";
import { WithdrawApplicationEventConfirmPage } from "../pages/exui/withdrawApplication/withdrawApplicationEventConfirm.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { UploadAdditionalApplications1Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications1.po.js";
import { UploadAdditionalApplications2Page } from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications2.po.js";
import {
  UploadAdditionalApplications3Page
} from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications3.po.js";
import {
  UploadAdditionalApplications4Page
} from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplications4.po.js";
import {
  UploadAdditionalApplicationsSubmitPage
} from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplicationsSubmit.po.js";
import {
  UploadAdditionalApplicationsConfirmPage
} from "../pages/exui/uploadAdditionalApplications/uploadAdditionalApplicationsConfirm.po.js";


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
      submitPage: new UploadAdditionalApplicationsSubmitPage(
        this.page,
      ),
      confirmPage: new UploadAdditionalApplicationsConfirmPage(
        this.page,
      ),
    };
  }
}
