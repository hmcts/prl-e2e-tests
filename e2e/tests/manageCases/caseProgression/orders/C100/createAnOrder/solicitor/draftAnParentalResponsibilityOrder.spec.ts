import Config from "../../../../../../../utils/config.utils.ts";
import { test } from "../../../../../../fixtures.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../../common/types.ts";
import { OrderInformation } from "../../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.ts";
import { DraftAnOrder5Params } from "../../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder5.po.ts";
import config from "../../../../../../../utils/config.utils.ts";
import { ParentalResponsibilityOrderScenarios } from "../../../../../../../testData/ui/draftOrders.ts";

export interface ParentalResponsibilityDraftOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  isDraftAnOrder: boolean;
  draftAnOrder5Params: DraftAnOrder5Params;
  responsibleParentFullName: string;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("Draft a parental responsibility order tests", (): void => {
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await navigationUtils.goToCase(
        solicitor.page,
        Config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  ParentalResponsibilityOrderScenarios.forEach((draftOrderParams) => {
    test(`Complete drafting Parental Responsibility order as solicitor with the following options: ${draftOrderParams.name} @accessibility @regression @nightly @visual`, async ({
      solicitor,
      caseWorker,
      navigationUtils,
    }): Promise<void> => {
      const { draftOrders, summaryPage } = solicitor;

      await summaryPage.chooseEventFromDropdown("Create/upload draft order");

      await draftOrders.draftAnOrder1Page.assertPageContents();
      await draftOrders.draftAnOrder1Page.verifyAccessibility();
      await draftOrders.draftAnOrder1Page.selectWhatYouWantToDo(
        draftOrderParams.isDraftAnOrder,
      );
      await draftOrders.draftAnOrder1Page.clickContinue();

      await draftOrders.draftAnOrder2Page.assertPageContents();
      await draftOrders.draftAnOrder2Page.verifyAccessibility();
      await draftOrders.draftAnOrder2Page.selectOrderType(
        draftOrderParams.orderType,
      );
      await draftOrders.draftAnOrder2Page.clickContinue();

      await draftOrders.draftAnOrder5Page.assertPageContents(
        draftOrderParams.isDraftAnOrder,
        draftOrderParams.caseType,
        draftOrderParams.orderType,
      );
      await draftOrders.draftAnOrder5Page.verifyAccessibility();
      await draftOrders.draftAnOrder5Page.fillInFields(
        draftOrderParams.isDraftAnOrder,
        draftOrderParams.caseType,
        draftOrderParams.draftAnOrder5Params,
      );
      await draftOrders.draftAnOrder5Page.clickContinue();

      await draftOrders.draftAnOrder9Page.assertPageContents(
        draftOrderParams.orderType,
      );
      await draftOrders.draftAnOrder9Page.verifyAccessibility();
      await draftOrders.draftAnOrder9Page.fillInFields(
        draftOrderParams.responsibleParentFullName,
      );
      await draftOrders.draftAnOrder9Page.clickContinue();

      await draftOrders.draftAnOrder20Page.assertPageContents(
        draftOrderParams.orderType,
        caseRef,
        draftOrderParams.snapshotName,
        draftOrderParams.snapshotsPath,
      );
      await draftOrders.draftAnOrder20Page.verifyAccessibility();
      await draftOrders.draftAnOrder20Page.clickContinue();

      await draftOrders.draftAnOrderSubmitPage.assertPageContents(
        draftOrderParams.snapshotsPath,
        draftOrderParams.snapshotName,
      );
      await draftOrders.draftAnOrderSubmitPage.verifyAccessibility();
      await draftOrders.draftAnOrderSubmitPage.clickSubmit();
      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
        "Create/upload draft order",
      );
      // check the draft orders tab as court admin
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );

      const { draftedOrders } = caseWorker;
      await draftedOrders.draftOrdersPage.goToPage();
      await draftedOrders.draftOrdersPage.assertDraftOrders(
        draftOrderParams.orderInformation,
      );
    });
  });
});
