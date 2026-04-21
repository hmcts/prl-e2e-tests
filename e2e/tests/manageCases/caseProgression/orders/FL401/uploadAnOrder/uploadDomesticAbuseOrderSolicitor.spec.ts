import { test } from "../../../../../fixtures.js";
import config from "../../../../../../utils/config.utils.js";
import { FL404BFL404UploadOrderScenarios } from "../../../../../../testData/draftOrders.js";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../common/types.js";
import { DraftAnOrder5Params } from "../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder5.po.js";
import { OrderInformation } from "../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";

export interface DomesticAbuseUploadOrderParams {
  name: string;
  caseType: solicitorCaseCreateType;
  orderType: OrderTypes;
  isDraftAnOrder: boolean;
  isOrderByConsent: boolean;
  draftAnOrder5Params: DraftAnOrder5Params;
  snapshotName: string;
  snapshotsPath: string[];
  orderInformation: OrderInformation[];
}

test.describe("'Upload an order' by Solicitor via the 'Create/upload draft order' event tests", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ solicitor, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  //FL404B+FL404 upload order
  FL404BFL404UploadOrderScenarios.forEach(
    (uploadOrderParams: DomesticAbuseUploadOrderParams) => {
      test(`DA 'Upload an  order - ' : ${uploadOrderParams.orderType} as a Solicitor with the following options:${uploadOrderParams.name} @regression @nightly @visual`, async ({
        solicitor,
        courtAdminStoke,
        navigationUtils,
      }): Promise<void> => {
        const { draftOrders, summaryPage } = solicitor;
        await summaryPage.chooseEventFromDropdown("Create/upload draft order");
        await draftOrders.draftAnOrder1Page.assertPageContents();
        await draftOrders.draftAnOrder1Page.verifyAccessibility();
        await draftOrders.draftAnOrder1Page.selectWhatYouWantToDo(
          uploadOrderParams.isDraftAnOrder,
        );
        await draftOrders.draftAnOrder1Page.clickContinue();

        await draftOrders.draftAnOrder3Page.assertPageContents();
        await draftOrders.draftAnOrder3Page.verifyAccessibility();
        await draftOrders.draftAnOrder3Page.selectOrderTypeAndConsent(
          uploadOrderParams.orderType,
          uploadOrderParams.isOrderByConsent,
        );
        await draftOrders.draftAnOrder3Page.clickContinue();

        await draftOrders.draftAnOrder5Page.verifyAccessibility();
        await draftOrders.draftAnOrder5Page.fillInFields(
          uploadOrderParams.isDraftAnOrder,
          uploadOrderParams.caseType,
          uploadOrderParams.draftAnOrder5Params,
        );
        await draftOrders.draftAnOrder5Page.clickContinue();

        await draftOrders.draftAnOrderSubmitPage.assertPageContents(
          uploadOrderParams.snapshotsPath,
          uploadOrderParams.snapshotName,
        );
        await draftOrders.draftAnOrderSubmitPage.verifyAccessibility();
        await draftOrders.draftAnOrderSubmitPage.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Create/upload draft order",
        );
        // check the draft orders tab as court admin
        await navigationUtils.goToCase(
          courtAdminStoke.page,
          config.manageCasesBaseURLCase,
          caseNumber,
        );

        const { draftedOrders } = courtAdminStoke;
        await draftedOrders.draftOrdersPage.goToPage();
        await draftedOrders.draftOrdersPage.assertDraftOrders(
          uploadOrderParams.orderInformation,
        );
      });
    },
  );
});
