import Config from "../../../../../../../utils/config.utils.ts";
import { test } from "../../../../../../fixtures.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../../../common/types.js";
import { OrderInformation } from "../../../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { DraftAnOrder5Params } from "../../../../../../../pageObjects/pages/exui/orders/draftOrders/draftAnOrder5.po.js";
import config from "../../../../../../../utils/config.utils.js";
import { ParentalResponsibilityOrderScenarios } from "../../../../../../../testData/draftOrders.js";

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
  let caseNumber: string;

  test.beforeEach(
    async ({ solicitor, browser, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        solicitor.page,
        Config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  ParentalResponsibilityOrderScenarios.forEach(
    (draftOrderParams) => {
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
          draftOrderParams.caseType,
          draftOrderParams.orderType,
        );
        await draftOrders.draftAnOrder5Page.verifyAccessibility();
        await draftOrders.draftAnOrder5Page.fillInFields(
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
          caseNumber,
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
          caseNumber,
          "Create/upload draft order",
        );
        // check the draft orders tab as court admin
        await navigationUtils.goToCase(
          caseWorker.page,
          config.manageCasesBaseURLCase,
          caseNumber,
        );

        const { removeDraftOrders } = caseWorker;
        await removeDraftOrders.draftOrdersPage.goToPage();
        await removeDraftOrders.draftOrdersPage.assertDraftOrders(
          draftOrderParams.orderInformation,
        );
      });
    },
  );
});
