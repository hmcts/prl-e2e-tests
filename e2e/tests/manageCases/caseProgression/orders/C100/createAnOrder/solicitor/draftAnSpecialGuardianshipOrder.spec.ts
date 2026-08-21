import Config from "../../../../../../../utils/config.utils.ts";
import { test } from "../../../../../../fixtures.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../../common/types.ts";
import { OrderInformation } from "../../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.ts";
import { DraftAnOrder5Params } from "../../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder5.po.ts";
import config from "../../../../../../../utils/config.utils.ts";
import { SpecialGuardianshipDraftOrderScenarios } from "../../../../../../../testData/ui/draftOrders.ts";

export interface SpecialGuardianshipDraftOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  isDraftAnOrder: boolean;
  draftAnOrder5Params: DraftAnOrder5Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}
// TEST COMMENT

test.describe("Draft a special guardianship order tests", (): void => {
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

  SpecialGuardianshipDraftOrderScenarios.forEach((draftOrderParams) => {
    test(`Complete drafting Special Guardianship order as solicitor with the following options: ${draftOrderParams.name} @accessibility @regression @nightly @visual`, async ({
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

      await draftOrders.draftAnOrder7Page.assertPageContents(
        draftOrderParams.orderType,
      );
      await draftOrders.draftAnOrder7Page.verifyAccessibility();
      await draftOrders.draftAnOrder7Page.fillOrderDetails();
      await draftOrders.draftAnOrder7Page.clickContinue();

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
