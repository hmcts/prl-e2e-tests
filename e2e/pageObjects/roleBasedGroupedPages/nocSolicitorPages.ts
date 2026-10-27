import { Page } from "@playwright/test";
import { TasksPage } from "../pages/exui/caseView/tasks.po.ts";
import { RespondentTasksPage } from "../pages/exui/caseView/solicitor/respondentTasks.po.ts";
import { ConsentToApplication1Page } from "../pages/exui/respondentResponse/consentToApplication/consentToApplication1.po.ts";
import { ConsentToApplicationSubmitPage } from "../pages/exui/respondentResponse/consentToApplication/consentToApplicationSubmit.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { NoticeOfChange1Page } from "../pages/exui/noticeOfChange/noticeOfChange1.po.ts";
import { NoticeOfChange2Page } from "../pages/exui/noticeOfChange/noticeOfChange2.po.ts";
import { NoticeOfChangeSubmitPage } from "../pages/exui/noticeOfChange/noticeOfChangeSubmit.po.ts";
import { NoticeOfChangeConfirmationPage } from "../pages/exui/noticeOfChange/noticeOfChangeConfirmation.po.ts";
import { AddBarrister1Page } from "../pages/exui/addAndRemoveBarrister/addBarrister1.po.ts";
import { AddBarristerSubmitPage } from "../pages/exui/addAndRemoveBarrister/addBarristerSubmit.po.ts";
import { RemoveBarrister1Page } from "../pages/exui/addAndRemoveBarrister/removeBarrister1.po.ts";
import { RemoveBarristerSubmitPage } from "../pages/exui/addAndRemoveBarrister/removeBarristerSubmit.po.ts";
import { PartiesPage } from "../pages/exui/caseView/parties.po.ts";
import { ApplicationPage } from "../pages/exui/caseView/application.po.ts";

export class NocSolicitorPagesGroup {
  constructor(public readonly page: Page) {}

  get tasksPage() {
    return new TasksPage(this.page);
  }
  get respondentTasksPage() {
    return new RespondentTasksPage(this.page);
  }
  get summaryPage() {
    return new SummaryPage(this.page);
  }
  get partiesPage() {
    return new PartiesPage(this.page);
  }
  get applicationPage() {
    return new ApplicationPage(this.page);
  }

  get noticeOfChangeC100() {
    return this.noticeOfChange;
  }

  get noticeOfChange() {
    return {
      page1: new NoticeOfChange1Page(this.page),
      page2: new NoticeOfChange2Page(this.page),
      submitPage: new NoticeOfChangeSubmitPage(this.page),
      confirmPage: new NoticeOfChangeConfirmationPage(this.page),
    };
  }

  get manageBarristerC100() {
    return this.manageBarrister;
  }

  get manageBarrister() {
    return {
      addBarrister1Page: new AddBarrister1Page(this.page),
      addBarristerSubmit: new AddBarristerSubmitPage(this.page),
      removeBarrister1Page: new RemoveBarrister1Page(this.page),
      removeBarristerSubmit: new RemoveBarristerSubmitPage(this.page),
    };
  }

  get respondentResponse() {
    return {
      consentToApplication1: new ConsentToApplication1Page(this.page),
      consentToApplicationSubmit: new ConsentToApplicationSubmitPage(this.page),
    };
  }
}
