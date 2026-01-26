import { Page } from "@playwright/test";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
import { DraftAnOrder1Page } from "../pages/exui/orders/solicitor/draftAnOrder1.po.ts";
import { DraftAnOrder2Page } from "../pages/exui/orders/solicitor/draftAnOrder2.po.ts";
import { DraftAnOrder4Page } from "../pages/exui/orders/solicitor/draftAnOrder4.po.ts";
import { DraftAnOrder5Page } from "../pages/exui/orders/solicitor/draftAnOrder5.po.ts";
import { DraftAnOrder8Page } from "../pages/exui/orders/solicitor/draftAnOrder8.po.ts";
import { DraftAnOrder16Page } from "../pages/exui/orders/solicitor/draftAnOrder16.po.ts";
import { DraftAnOrder20Page } from "../pages/exui/orders/solicitor/draftAnOrder20.po.ts";
import { DraftAnOrderSubmitPage } from "../pages/exui/orders/solicitor/draftAnOrderSubmit.po.ts";
//import { ManageDocumentsNew1Page } from "../pages/exui/manageDocuments/manageDocumentsNew1.po.ts";
import { StopRepresenting1Page } from "../pages/exui/stopRepresentingClient/stopRepresentingClient1.po.ts";
import { StopRepresentingSubmitPage } from "../pages/exui/stopRepresentingClient/stopRepresentingClientSubmit.po.ts";

export class BarristerPagesGroup {
    constructor(public readonly page: Page) { }
    
  get summaryPage() {
    return new SummaryPage(this.page);
  }
  get draftAnOrderEvent() {
    return {
        page1: new DraftAnOrder1Page(this.page),
        page2: new DraftAnOrder2Page(this.page),
        page3: new DraftAnOrder4Page(this.page),
        page4: new DraftAnOrder5Page(this.page),
        page5: new DraftAnOrder8Page(this.page),
        page6: new DraftAnOrder16Page(this.page),
        page7: new DraftAnOrder20Page(this.page),
        submitPage: new DraftAnOrderSubmitPage(this.page),
    };
  }
    // to fix the below events when the barrister context is ready, or use Solicitor for the common ones!
    // get manageDocumentsEvent() {
    //     return {
    //         page1: new ManageDocumentsNew1Page(this.page),
    //         submitPage: new ManageDocumentsNewSubmitPage(this.page),
    //         confirmPage: new ManageDocumentsNewConfirmPage(this.page),
    //     };
    // }
    // //this event needs some pre-requisites to be met, need to be added in the spec file
    // get editAReturnedOrderEvent() {
    //     return {
    //         page1: new AAA(this.page),
    //         submitPage: new WithdAAA(this.page),
    //     };
    // }
    get stopRepresentingClientEvent() {
        return {
            page1: new StopRepresenting1Page(this.page),
            submitPage: new StopRepresentingSubmitPage(this.page),
        };
    }
}
