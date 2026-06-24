import { Page } from "@playwright/test";
import { SummaryPage } from "../pages/exui/caseView/summary.po.ts";
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
