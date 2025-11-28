import { Browser, Page } from "@playwright/test";
import Config from "../../../../utils/config.utils.js";
import {
  DraftOrdersPage,
  OrderInformation,
} from "../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { NonMolestationDraftOrderParams } from "../../../../tests/manageCases/caseProgression/solicitor/draftAnOrder/draftAnOrderNonMolestation.spec.js";
import { SummaryPage } from "../../../../pageObjects/pages/exui/caseView/summary.po.js";
import { DraftAnOrder1Page } from "../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder1.po.js";
import { DraftAnOrder2Page } from "../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder2.po.js";
import { DraftAnOrder4Page } from "../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder4.po.js";
import { DraftAnOrder5Page } from "../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder5.po.js";
import { DraftAnOrder16Page } from "../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder16.po.js";
import { DraftAnOrder20Page } from "../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder20.po.js";
import { DraftAnOrderSubmitPage } from "../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrderSubmit.po.js";
import { NavigationUtils } from "../../../../utils/navigation.utils.js";
import { DraftAnOrder8Page } from "../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder8.po.js";
import { ParentalResponsibilityDraftOrderParams } from "../../../../tests/manageCases/caseProgression/solicitor/draftAnOrder/draftAnOrderParentalResponsibility.spec.js";

interface DraftAnOrderPages {
  summaryPage: SummaryPage;
  draftAnOrder1Page: DraftAnOrder1Page;
  draftAnOrder2Page: DraftAnOrder2Page;
  draftAnOrder4Page?: DraftAnOrder4Page;
  draftAnOrder5Page?: DraftAnOrder5Page;
  draftAnOrder8Page?: DraftAnOrder8Page;
  draftAnOrder16Page?: DraftAnOrder16Page;
  draftAnOrder20Page: DraftAnOrder20Page;
  draftAnOrderSubmitPage: DraftAnOrderSubmitPage;
  navigationUtils: NavigationUtils;
}

type OrderDetails =
  | NonMolestationDraftOrderParams
  | ParentalResponsibilityDraftOrderParams;

// class to handle draft order journeys - required because this journey is large and re-used quite a lot
export class DraftAnOrderJourney {
  async draftAnOrder(
    browser: Browser,
    caseNumber: string,
    draftOrderPages: DraftAnOrderPages,
    orderParams: OrderDetails,
  ): Promise<void> {
    switch (orderParams.orderType) {
      case "Non-molestation order (FL404A)":
        await this.draftNonMolestationOrder(
          browser,
          caseNumber,
          draftOrderPages,
          orderParams as NonMolestationDraftOrderParams,
        );
        break;
      case "Parental responsibility order (C45A)":
        await this.draftParentalResponsibilityOrder(
          browser,
          caseNumber,
          draftOrderPages,
          orderParams as ParentalResponsibilityDraftOrderParams,
        );
        break;
    }
  }

  private async draftNonMolestationOrder(
    browser: Browser,
    caseNumber: string,
    draftOrderPages: DraftAnOrderPages,
    orderDetails: NonMolestationDraftOrderParams,
  ): Promise<void> {
    await this.selectOrderAndFillInGenericOrderDetails(
      draftOrderPages.summaryPage,
      draftOrderPages.draftAnOrder1Page,
      draftOrderPages.draftAnOrder2Page,
      draftOrderPages.draftAnOrder4Page,
      orderDetails,
    );
    await draftOrderPages.draftAnOrder5Page.assertPageContents(
      orderDetails.orderType,
    );
    await draftOrderPages.draftAnOrder5Page.verifyAccessibility();
    await draftOrderPages.draftAnOrder5Page.fillInFields(
      orderDetails.draftAnOrder5Params,
    );
    await draftOrderPages.draftAnOrder5Page.clickContinue();
    await draftOrderPages.draftAnOrder16Page.assertPageContents(
      orderDetails.orderType,
    );
    await draftOrderPages.draftAnOrder16Page.verifyAccessibility();
    await draftOrderPages.draftAnOrder16Page.fillInFields(
      orderDetails.draftAnOrder16Params,
    );
    await draftOrderPages.draftAnOrder16Page.clickContinue();
    await draftOrderPages.draftAnOrder20Page.assertPageContents(
      orderDetails.orderType,
      caseNumber,
      orderDetails.snapshotName,
      orderDetails.snapshotsPath,
    );
    await draftOrderPages.draftAnOrder20Page.verifyAccessibility();
    await draftOrderPages.draftAnOrder20Page.clickContinue();
    await draftOrderPages.draftAnOrderSubmitPage.assertPageContents(
      orderDetails.snapshotsPath,
      orderDetails.snapshotName,
    );
    await draftOrderPages.draftAnOrderSubmitPage.verifyAccessibility();
    await draftOrderPages.draftAnOrderSubmitPage.clickSubmit();
    await draftOrderPages.summaryPage.alertBanner.assertEventAlert(
      caseNumber,
      "Draft an order",
    );
    await this.assertDraftOrderAsCourtAdmin(
      browser,
      caseNumber,
      draftOrderPages.navigationUtils,
      orderDetails.orderInformation,
    );
  }

  private async draftParentalResponsibilityOrder(
    browser: Browser,
    caseNumber: string,
    draftOrderPages: DraftAnOrderPages,
    orderParams: ParentalResponsibilityDraftOrderParams,
  ): Promise<void> {
    await this.selectOrderAndFillInGenericOrderDetails(
      draftOrderPages.summaryPage,
      draftOrderPages.draftAnOrder1Page,
      draftOrderPages.draftAnOrder2Page,
      draftOrderPages.draftAnOrder4Page,
      orderParams,
    );
    await draftOrderPages.draftAnOrder8Page.assertPageContents(
      orderParams.orderType,
    );
    await draftOrderPages.draftAnOrder8Page.verifyAccessibility();
    await draftOrderPages.draftAnOrder8Page.fillInFields(
      orderParams.responsibleParentFullName,
    );
    await draftOrderPages.draftAnOrder8Page.clickContinue();
    await draftOrderPages.draftAnOrder20Page.assertPageContents(
      orderParams.orderType,
      caseNumber,
      orderParams.snapshotName,
      orderParams.snapshotsPath,
    );
    await draftOrderPages.draftAnOrder20Page.verifyAccessibility();
    await draftOrderPages.draftAnOrder20Page.clickContinue();
    await draftOrderPages.draftAnOrderSubmitPage.assertPageContents(
      orderParams.snapshotsPath,
      orderParams.snapshotName,
    );
    await draftOrderPages.draftAnOrderSubmitPage.verifyAccessibility();
    await draftOrderPages.draftAnOrderSubmitPage.clickSubmit();
    await draftOrderPages.summaryPage.alertBanner.assertEventAlert(
      caseNumber,
      "Draft an order",
    );
    await this.assertDraftOrderAsCourtAdmin(
      browser,
      caseNumber,
      draftOrderPages.navigationUtils,
      orderParams.orderInformation,
    );
  }

  private async selectOrderAndFillInGenericOrderDetails(
    summaryPage: SummaryPage,
    draftAnOrder1Page: DraftAnOrder1Page,
    draftAnOrder2Page: DraftAnOrder2Page,
    draftAnOrder4Page: DraftAnOrder4Page,
    draftOrderParams: Partial<OrderDetails>,
  ): Promise<void> {
    await summaryPage.chooseEventFromDropdown("Draft an order");
    await draftAnOrder1Page.assertPageContents();
    await draftAnOrder1Page.verifyAccessibility();
    await draftAnOrder1Page.selectWhatYouWantToDo(
      draftOrderParams.isDraftAnOrder,
    );
    await draftAnOrder1Page.clickContinue();
    await draftAnOrder2Page.assertPageContents();
    await draftAnOrder2Page.verifyAccessibility();
    await draftAnOrder2Page.selectOrderType(draftOrderParams.orderType);
    await draftAnOrder2Page.clickContinue();
    await draftAnOrder4Page.assertPageContents(
      draftOrderParams.caseType,
      draftOrderParams.orderType,
    );
    await draftAnOrder4Page.verifyAccessibility();
    await draftAnOrder4Page.fillInFields(
      draftOrderParams.caseType,
      draftOrderParams.draftAnOrder4Params,
    );
    await draftAnOrder4Page.clickContinue();
  }

  private async assertDraftOrderAsCourtAdmin(
    browser: Browser,
    caseNumber: string,
    navigationUtils: NavigationUtils,
    orderInformation: OrderInformation[],
  ): Promise<void> {
    const adminPage: Page = await navigationUtils.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    // check the draft orders tab as court admin
    await navigationUtils.goToCase(
      adminPage,
      Config.manageCasesBaseURLCase,
      caseNumber,
    );
    const draftOrdersPage: DraftOrdersPage = new DraftOrdersPage(adminPage);
    await draftOrdersPage.goToPage();
    await draftOrdersPage.assertDraftOrders(orderInformation);
    await adminPage.close();
  }
}
