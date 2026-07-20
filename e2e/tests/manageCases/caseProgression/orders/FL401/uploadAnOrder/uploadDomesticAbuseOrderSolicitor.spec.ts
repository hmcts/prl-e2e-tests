import { test } from "../../../../../fixtures.ts";
import config from "../../../../../../utils/config.utils.ts";
import { FL404BFL404UploadOrderScenarios } from "../../../../../../testData/draftOrders.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../common/types.ts";
import { DraftAnOrder5Params } from "../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder5.po.ts";
import { OrderInformation } from "../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.ts";

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
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
        .caseRef;
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseRef,
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
          caseRef,
          "Create/upload draft order",
        );
        // check the draft orders tab as court admin
        await navigationUtils.goToCase(
          courtAdminStoke.page,
          config.manageCasesBaseURLCase,
          caseRef,
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
