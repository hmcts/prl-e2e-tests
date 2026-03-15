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
import { StopRepresenting1Page } from "../pages/exui/stopRepresentingClient/stopRepresentingClient1.po.ts";
import { StopRepresentingSubmitPage } from "../pages/exui/stopRepresentingClient/stopRepresentingClientSubmit.po.ts";
import { EditReturnedOrder1Page } from "../pages/exui/editReturnedOrder/editReturnedOrder1.po.ts";
import { EditReturnedOrder2Page } from "../pages/exui/editReturnedOrder/editReturnedOrder2.po.ts";
import { EditReturnedOrder3Page } from "../pages/exui/editReturnedOrder/editReturnedOrder3.po.ts";
import { EditReturnedOrder12Page } from "../pages/exui/editReturnedOrder/editReturnedOrder12.po.ts";
import { EditReturnedOrder13Page } from "../pages/exui/editReturnedOrder/editReturnedOrder13.po.ts";
import { EditReturnedOrderSubmitPage } from "../pages/exui/editReturnedOrder/editReturnedOrderSubmit.po.ts";
import { EditReturnedOrderConfirmPage } from "../pages/exui/editReturnedOrder/editReturnedOrderConfirm.po.ts";

export class BarristerPagesGroup {
    constructor(public readonly page: Page) { }
    
  get summaryPage2() {
    return new SummaryPage(this.page);
  }
  get draftAnOrderEvent() {
    return {
        draftAnOrder1Page: new DraftAnOrder1Page(this.page),
        draftAnOrder2Page: new DraftAnOrder2Page(this.page),
        draftAnOrder4Page: new DraftAnOrder4Page(this.page),
        draftAnOrder5Page: new DraftAnOrder5Page(this.page),
        draftAnOrder8Page: new DraftAnOrder8Page(this.page),
        draftAnOrder16Page: new DraftAnOrder16Page(this.page),
        draftAnOrder20Page: new DraftAnOrder20Page(this.page),
        draftAnOrderSubmitPage: new DraftAnOrderSubmitPage(this.page),
    };
  }
    get editAReturnedOrderEvent() {
        return {
            editReturnedOrder1Page: new EditReturnedOrder1Page(this.page),
            editReturnedOrder2Page: new EditReturnedOrder2Page(this.page),
            editReturnedOrder3Page: new EditReturnedOrder3Page(this.page),
            editReturnedOrder12Page: new EditReturnedOrder12Page(this.page),
            editReturnedOrder13Page: new EditReturnedOrder13Page(this.page),
            editReturnedOrderSubmitPage: new EditReturnedOrderSubmitPage(this.page),
            editReturnedOrderConfirmPage: new EditReturnedOrderConfirmPage(this.page),
        };
    }
    get stopRepresentingClientEvent() {
        return {
            page1: new StopRepresenting1Page(this.page),
            submitPage: new StopRepresentingSubmitPage(this.page),
        };
    }
}
