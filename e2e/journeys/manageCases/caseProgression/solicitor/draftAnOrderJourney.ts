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

type OrderDetails =
  | NonMolestationDraftOrderParams
  | ParentalResponsibilityDraftOrderParams;

// class to handle draft order journeys - required because this journey is large and re-used
export class DraftAnOrderJourney {
  async draftAnOrder(
    page: Page,
    browser: Browser,
    caseNumber: string,
    orderParams: OrderDetails,
  ): Promise<void> {
    switch (orderParams.orderType) {
      case "Non-molestation order (FL404A)":
        await this.draftNonMolestationOrder(
          page,
          browser,
          caseNumber,
          orderParams as NonMolestationDraftOrderParams,
        );
        break;
      case "Parental responsibility order (C45A)":
        await this.draftParentalResponsibilityOrder(
          page,
          browser,
          caseNumber,
          orderParams as ParentalResponsibilityDraftOrderParams,
        );
        break;
    }
  }

  private async draftNonMolestationOrder(
    page: Page,
    browser: Browser,
    caseNumber: string,
    orderDetails: NonMolestationDraftOrderParams,
  ): Promise<void> {
    const summaryPage: SummaryPage = new SummaryPage(page);
    await summaryPage.chooseEventFromDropdown("Create/upload draft order");
    await this.selectOrderAndFillInGenericOrderDetails(page, orderDetails);

    const draftAnOrder5Page: DraftAnOrder5Page = new DraftAnOrder5Page(page);
    await draftAnOrder5Page.assertPageContents(orderDetails.orderType);
    await draftAnOrder5Page.verifyAccessibility();
    await draftAnOrder5Page.fillInFields(orderDetails.draftAnOrder5Params);
    await draftAnOrder5Page.clickContinue();

    const draftAnOrder16Page: DraftAnOrder16Page = new DraftAnOrder16Page(page);
    await draftAnOrder16Page.assertPageContents(orderDetails.orderType);
    await draftAnOrder16Page.verifyAccessibility();
    await draftAnOrder16Page.fillInFields(orderDetails.draftAnOrder16Params);
    await draftAnOrder16Page.clickContinue();

    const draftAnOrder20Page: DraftAnOrder20Page = new DraftAnOrder20Page(page);
    await draftAnOrder20Page.assertPageContents(
      orderDetails.orderType,
      caseNumber,
      orderDetails.snapshotName,
      orderDetails.snapshotsPath,
    );
    await draftAnOrder20Page.verifyAccessibility();
    await draftAnOrder20Page.clickContinue();

    const draftAnOrderSubmitPage: DraftAnOrderSubmitPage =
      new DraftAnOrderSubmitPage(page);
    await draftAnOrderSubmitPage.assertPageContents(
      orderDetails.snapshotsPath,
      orderDetails.snapshotName,
    );
    await draftAnOrderSubmitPage.verifyAccessibility();
    await draftAnOrderSubmitPage.clickSubmit();
    await summaryPage.alertBanner.assertEventAlert(
      caseNumber,
      "Create/upload draft order",
    );
    await this.assertDraftOrderAsCourtAdmin(
      browser,
      caseNumber,
      orderDetails.orderInformation,
    );
  }

  private async draftParentalResponsibilityOrder(
    page: Page,
    browser: Browser,
    caseNumber: string,
    orderParams: ParentalResponsibilityDraftOrderParams,
  ): Promise<void> {
    const summaryPage: SummaryPage = new SummaryPage(page);
    await summaryPage.chooseEventFromDropdown("Create/upload draft order");
    await this.selectOrderAndFillInGenericOrderDetails(page, orderParams);

    const draftAnOrder8Page: DraftAnOrder8Page = new DraftAnOrder8Page(page);
    await draftAnOrder8Page.assertPageContents(orderParams.orderType);
    await draftAnOrder8Page.verifyAccessibility();
    await draftAnOrder8Page.fillInFields(orderParams.responsibleParentFullName);
    await draftAnOrder8Page.clickContinue();

    const draftAnOrder20Page: DraftAnOrder20Page = new DraftAnOrder20Page(page);
    await draftAnOrder20Page.assertPageContents(
      orderParams.orderType,
      caseNumber,
      orderParams.snapshotName,
      orderParams.snapshotsPath,
    );
    await draftAnOrder20Page.verifyAccessibility();
    await draftAnOrder20Page.clickContinue();

    const draftAnOrderSubmitPage: DraftAnOrderSubmitPage =
      new DraftAnOrderSubmitPage(page);
    await draftAnOrderSubmitPage.assertPageContents(
      orderParams.snapshotsPath,
      orderParams.snapshotName,
    );
    await draftAnOrderSubmitPage.verifyAccessibility();
    await draftAnOrderSubmitPage.clickSubmit();
    await summaryPage.alertBanner.assertEventAlert(
      caseNumber,
      "Create/upload draft order",
    );
    await this.assertDraftOrderAsCourtAdmin(
      browser,
      caseNumber,
      orderParams.orderInformation,
    );
  }

  private async selectOrderAndFillInGenericOrderDetails(
    page: Page,
    draftOrderParams: Partial<OrderDetails>,
  ): Promise<void> {
    const draftAnOrder1Page: DraftAnOrder1Page = new DraftAnOrder1Page(page);
    await draftAnOrder1Page.assertPageContents();
    await draftAnOrder1Page.verifyAccessibility();
    await draftAnOrder1Page.selectWhatYouWantToDo(
      draftOrderParams.isDraftAnOrder,
    );
    await draftAnOrder1Page.clickContinue();

    const draftAnOrder2Page: DraftAnOrder2Page = new DraftAnOrder2Page(page);
    await draftAnOrder2Page.assertPageContents();
    await draftAnOrder2Page.verifyAccessibility();
    await draftAnOrder2Page.selectOrderType(draftOrderParams.orderType);
    await draftAnOrder2Page.clickContinue();

    const draftAnOrder4Page: DraftAnOrder4Page = new DraftAnOrder4Page(page);
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
    orderInformation: OrderInformation[],
  ): Promise<void> {
    const navigationUtils: NavigationUtils = new NavigationUtils();
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
