import { Page } from "@playwright/test";
import { TasksPage } from "../pages/exui/caseView/tasks.po.ts";
import { CaseDocumentsPage } from "../pages/exui/caseView/caseDocuments.po.ts";
import { ManageDocumentsNew1Page } from "../pages/exui/manageDocuments/manageDocumentsNew1.po.ts";
import { ManageDocumentsNewSubmitPage } from "../pages/exui/manageDocuments/manageDocumentsNewSubmit.po.ts";
import { ManageDocumentsNewConfirmPage } from "../pages/exui/manageDocuments/manageDocumentsNewConfirm.po.ts";
import { ConfidentialDetailsPage } from "../pages/exui/caseView/confidentialDetails.po.ts";
import { DocumentsToBeReviewedPage } from "../pages/exui/caseView/documentsToBeReviewed.po.ts";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { HistoryPage } from "../pages/exui/caseView/history.po.ts";
import { AmendApplicantDetails1 } from "../pages/exui/amendApplicantDetails/amendApplicantDetails1.po.ts";
import { AmendApplicantDetailsSubmit } from "../pages/exui/amendApplicantDetails/amendApplicantDetailsSubmit.po.ts";
import { AddBarrister1Page } from "../pages/exui/addAndRemoveBarrister/addBarrister1.po.ts";
import { AddBarristerSubmitPage } from "../pages/exui/addAndRemoveBarrister/addBarristerSubmit.po.ts";
import { PartiesPage } from "../pages/exui/caseView/parties.po.ts";
import { RemoveBarrister1Page } from "../pages/exui/addAndRemoveBarrister/removeBarrister1.po.ts";
import { RemoveBarristerSubmitPage } from "../pages/exui/addAndRemoveBarrister/removeBarristerSubmit.po.ts";
import { Fl401AddCaseNumber1Page } from "../pages/exui/checkApplication/fl401AddCaseNumber1.po.ts";
import { Fl401AddCaseNumberSubmitPage } from "../pages/exui/checkApplication/fl401AddCaseNumberSubmit.po.ts";
import { AllocatedJudge1Page } from "../pages/exui/allocatedJudge/allocatedJudge1.po.ts";
import { AllocatedJudgeSubmitPage } from "../pages/exui/allocatedJudge/allocatedJudgeSubmit.po.ts";
import { RolesAndAccessPage } from "../pages/exui/caseView/rolesAndAccess.po.ts";
import { DraftOrdersPage } from "../pages/exui/caseView/draftOrders.po.ts";
import { RemoveDraftOrder1Page } from "../pages/exui/orders/removeDraftOrder/removeDraftOrder1.po.ts";
import { RemoveDraftOrder2Page } from "../pages/exui/orders/removeDraftOrder/removeDraftOrder2.po.ts";
import { RemoveDraftOrderSubmitPage } from "../pages/exui/orders/removeDraftOrder/removeDraftOrderSubmit.po.ts";
import { CreateCaseLink1Page } from "../pages/exui/caseLinking/createCaseLink1.po.ts";
import { CreateCaseLink2Page } from "../pages/exui/caseLinking/createCaseLink2.po.ts";
import { CreateCaseLinkSubmitPage } from "../pages/exui/caseLinking/createCaseLinkSubmit.po.ts";
import { CreateCaseLink3Page } from "../pages/exui/caseLinking/createCaseLink3.po.ts";
import { MaintainCaseLink1Page } from "../pages/exui/caseLinking/maintainCaseLink1.po.ts";
import { MaintainCaseLink2Page } from "../pages/exui/caseLinking/maintainCaseLink2.po.ts";
import { MaintainCaseLink3Page } from "../pages/exui/caseLinking/maintainCaseLink3.po.ts";
import { MaintainCaseLinkSubmitPage } from "../pages/exui/caseLinking/maintainCaseLinkSubmit.po.ts";
import { LinkedCasesPage } from "../pages/exui/caseView/linkedCases.po.ts";
import { SendToGateKeeper1Page } from "../pages/exui/sendToGateKeeper/sendToGateKeeper1.po.ts";
import { SendToGateKeeperSubmitPage } from "../pages/exui/sendToGateKeeper/sendToGateKeeperSubmit.po.ts";
import { AmendRespondentDetails1 } from "../pages/exui/amendRespondentDetails/amendRespondentDetails1.po.ts";
import { AmendRespondentDetailsSubmit } from "../pages/exui/amendRespondentDetails/amendRespondentDetailsSubmit.po.ts";
import { SendAndReplyToMessages1Page } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessages1.po.ts";
import { SendAndReplyToMessagesSubmitPage } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessagesSubmit.po.ts";
import { SendAndReplyToMessages2Page } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessages2.po.ts";
import { SendAndReplyToMessages3Page } from "../pages/exui/sendAndReplyToMessages/sendAndReplyToMessages3.po.ts";
import { ReviewRARequest1Page } from "../pages/exui/caseFlags/reviewRARequest/reviewRARequest1.po.ts";
import { ReviewRARequest2Page } from "../pages/exui/caseFlags/reviewRARequest/reviewRARequest2.po.ts";
import { ReviewRARequestSubmitPage } from "../pages/exui/caseFlags/reviewRARequest/reviewRARequestSubmit.po.ts";
import { CaseFlagsPage } from "../pages/exui/caseView/caseFlags.po.ts";
import { ManageOrder1Page } from "../pages/exui/orders/manageOrders/manageOrder1.po.ts";
import { ManageOrder2Page } from "../pages/exui/orders/manageOrders/manageOrder2.po.ts";
import { ManageOrder5Page } from "../pages/exui/orders/manageOrders/manageOrder5.po.ts";
import { ManageOrder10Page } from "../pages/exui/orders/manageOrders/manageOrder10.po.ts";
import { ManageOrder19Page } from "../pages/exui/orders/manageOrders/manageOrder19.po.ts";
import { ManageOrder20Page } from "../pages/exui/orders/manageOrders/manageOrder20.po.ts";
import { ManageOrder24Page } from "../pages/exui/orders/manageOrders/manageOrder24.po.ts";
import { ManageOrderSubmitPage } from "../pages/exui/orders/manageOrders/manageOrderSubmit.po.ts";
import { ManageOrder12Page } from "../pages/exui/orders/manageOrders/manageOrder12.po.ts";
import { OccupationOrderManageOrders12Page } from "../pages/exui/orders/manageOrders/occupationOrderManageOrder12.po.ts";
import { ManageOrder3Page } from "../pages/exui/orders/manageOrders/manageOrder3.po.ts";
import { ManageOrder26Page } from "../pages/exui/orders/manageOrders/manageOrder26.po.ts";
import { ManageOrder11Page } from "../pages/exui/orders/manageOrders/manageOrder11.po.ts";
import { ManageOrder27Page } from "../pages/exui/orders/manageOrders/manageOrder27.po.ts";
import { ManageOrder28Page } from "../pages/exui/orders/manageOrders/manageOrder28.po.ts";
import { OrdersPage } from "../pages/exui/caseView/Orders.po.ts";
import { AdminAddLocalAuthority1Page } from "../pages/exui/addLocalAuthority/adminAddLocalAuthority1.po.ts";
import { AdminAddLocalAuthoritySubmitPage } from "../pages/exui/addLocalAuthority/adminAddLocalAuthoritySubmit.po.ts";
import { AdminAddLocalAuthorityConfirmPage } from "../pages/exui/addLocalAuthority/adminAddLocalAuthorityConfirm.po.ts";
import { AdminEditAndApproveAnOrder1Page } from "../pages/exui/orders/adminEditAndApproveAnOrders/adminEditAndApproveAnOrder1.po.js";
import { AdminEditAndApproveAnOrder4Page } from "../pages/exui/orders/adminEditAndApproveAnOrders/adminEditAndApproveAnOrder4.po.js";
import { AdminEditAndApproveAnOrder21Page } from "../pages/exui/orders/adminEditAndApproveAnOrders/adminEditAndApproveAnOrder21.po.js";
import { AdminEditAndApproveAnOrder23Page } from "../pages/exui/orders/adminEditAndApproveAnOrders/adminEditAndApproveAnOrder23.po.js";
import { AdminEditAndApproveAnOrder22Page } from "../pages/exui/orders/adminEditAndApproveAnOrders/adminEditAndApproveAnOrder22.po.js";
import { AdminEditAndApproveAnOrderSubmitPage } from "../pages/exui/orders/adminEditAndApproveAnOrders/adminEditAndApproveAnOrderSubmit.po.js";
import { WelshLanguageRequirements1Page } from "../pages/exui/welshLanguageRequirements/welshLanguageRequirements1.po.ts";
import { WelshLanguageRequirementsSubmitPage } from "../pages/exui/welshLanguageRequirements/welshLanguageRequirementsSubmit.po.ts";

export class CaseWorkerPagesGroup {
  constructor(public readonly page: Page) {}

  get tasksPage() {
    return new TasksPage(this.page);
  }

  get caseDocumentsPage() {
    return new CaseDocumentsPage(this.page);
  }

  get manageDocuments() {
    return {
      manageDocumentsNew1Page: new ManageDocumentsNew1Page(this.page),
      manageDocumentsNewSubmitPage: new ManageDocumentsNewSubmitPage(this.page),
      manageDocumentsNewConfirmPage: new ManageDocumentsNewConfirmPage(
        this.page,
      ),
    };
  }

  get confidentialDetailsPage() {
    return new ConfidentialDetailsPage(this.page);
  }

  get documentsToBeReviewedPage() {
    return new DocumentsToBeReviewedPage(this.page);
  }

  get summaryPage() {
    return new SummaryPage(this.page);
  }

  get historyPage() {
    return new HistoryPage(this.page);
  }

  get partiesPage() {
    return new PartiesPage(this.page);
  }

  get rolesAndAccessPage() {
    return new RolesAndAccessPage(this.page);
  }

  get caseFlagsPage() {
    return new CaseFlagsPage(this.page);
  }

  get allocatedJudge() {
    return {
      page1: new AllocatedJudge1Page(this.page),
      submitPage: new AllocatedJudgeSubmitPage(this.page),
    };
  }

  get fl401AddCaseNumber() {
    return {
      page1: new Fl401AddCaseNumber1Page(this.page),
      submitPage: new Fl401AddCaseNumberSubmitPage(this.page),
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

  get manageCaseLinks() {
    return {
      linkedCasesTab: new LinkedCasesPage(this.page),
      createCaseLink1Page: new CreateCaseLink1Page(this.page),
      createCaseLink2Page: new CreateCaseLink2Page(this.page),
      createCaseLink3Page: new CreateCaseLink3Page(this.page),
      createCaseLinkSubmitPage: new CreateCaseLinkSubmitPage(this.page),
      maintainCaseLink1Page: new MaintainCaseLink1Page(this.page),
      maintainCaseLink2Page: new MaintainCaseLink2Page(this.page),
      maintainCaseLink3Page: new MaintainCaseLink3Page(this.page),
      maintainCaseLinkSubmitPage: new MaintainCaseLinkSubmitPage(this.page),
    };
  }

  get draftedOrders() {
    return {
      draftOrdersPage: new DraftOrdersPage(this.page),
    };
  }

  get Orders() {
    return {
      OrdersPage: new OrdersPage(this.page),
    };
  }

  get removeDraftOrders() {
    return {
      page1: new RemoveDraftOrder1Page(this.page),
      page2: new RemoveDraftOrder2Page(this.page),
      submitPage: new RemoveDraftOrderSubmitPage(this.page),
    };
  }

  get amendDetails() {
    return {
      amendApplicantDetails1: new AmendApplicantDetails1(this.page),
      amendApplicantDetailsSubmit: new AmendApplicantDetailsSubmit(this.page),
      amendRespondentDetails1: new AmendRespondentDetails1(this.page),
      amendRespondentDetailsSubmit: new AmendRespondentDetailsSubmit(this.page),
    };
  }

  get sendToGateKeeper() {
    return {
      page1: new SendToGateKeeper1Page(this.page),
      submitPage: new SendToGateKeeperSubmitPage(this.page),
    };
  }

  get sendAndReplyToMessages() {
    return {
      sendAndReplyToMessages1Page: new SendAndReplyToMessages1Page(this.page),
      sendAndReplyToMessages2page: new SendAndReplyToMessages2Page(this.page),
      sendAndReplyToMessages3Page: new SendAndReplyToMessages3Page(this.page),
      sendAndReplyToMessagesSubmitPage: new SendAndReplyToMessagesSubmitPage(
        this.page,
      ),
    };
  }

  get caseFlags() {
    return {
      reviewRARequestPage1: new ReviewRARequest1Page(this.page),
      reviewRARequestPage2: new ReviewRARequest2Page(this.page),
      reviewRARequestPageSubmit: new ReviewRARequestSubmitPage(this.page),
    };
  }

  get manageOrders() {
    return {
      manageOrder1Page: new ManageOrder1Page(this.page),
      manageOrder2Page: new ManageOrder2Page(this.page),
      manageOrder3Page: new ManageOrder3Page(this.page),
      manageOrder5Page: new ManageOrder5Page(this.page),
      manageOrder10Page: new ManageOrder10Page(this.page),
      manageOrder11Page: new ManageOrder11Page(this.page),
      manageOrder12Page: new ManageOrder12Page(this.page),
      occupationOrderManageOrders12Page: new OccupationOrderManageOrders12Page(
        this.page,
      ),
      manageOrder19Page: new ManageOrder19Page(this.page),
      manageOrder20Page: new ManageOrder20Page(this.page),
      manageOrder24Page: new ManageOrder24Page(this.page),
      manageOrder26Page: new ManageOrder26Page(this.page),
      manageOrder27Page: new ManageOrder27Page(this.page),
      manageOrder28Page: new ManageOrder28Page(this.page),
      manageOrderSubmitPage: new ManageOrderSubmitPage(this.page),
    };
  }
  get adminEditAndApproveAnOrders() {
    return {
      adminEditAndApproveAnOrder1Page: new AdminEditAndApproveAnOrder1Page(
        this.page,
      ),
      adminEditAndApproveAnOrder4Page: new AdminEditAndApproveAnOrder4Page(
        this.page,
      ),
      adminEditAndApproveAnOrder21Page: new AdminEditAndApproveAnOrder21Page(
        this.page,
      ),
      adminEditAndApproveAnOrder22Page: new AdminEditAndApproveAnOrder22Page(
        this.page,
      ),
      adminEditAndApproveAnOrder23Page: new AdminEditAndApproveAnOrder23Page(
        this.page,
      ),
      adminEditAndApproveAnOrderSubmitPage:
        new AdminEditAndApproveAnOrderSubmitPage(this.page),
    };
  }

  get addLocalAuthority() {
    return {
      addLocalAuthority1Page: new AdminAddLocalAuthority1Page(this.page),
      addLocalAuthoritySubmitPage: new AdminAddLocalAuthoritySubmitPage(
        this.page,
      ),
      addLocalAuthorityConfirmPage: new AdminAddLocalAuthorityConfirmPage(
        this.page,
      ),
    };
  }

  get welshLanguageRequirements() {
    return {
      page1: new WelshLanguageRequirements1Page(this.page),
      submitPage: new WelshLanguageRequirementsSubmitPage(this.page),
    };
  }
}
