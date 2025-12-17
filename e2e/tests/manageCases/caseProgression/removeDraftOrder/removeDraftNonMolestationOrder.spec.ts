import Config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";
import { NonMolestationDraftOrderParams } from "../solicitor/draftAnOrder/draftAnOrderNonMolestation.spec.js";
import { RemoveDraftNonMolestationOrderScenarios as scenarios } from "../../../../testData/draftOrders.js";
import { DraftAnOrderJourney } from "../../../../journeys/manageCases/caseProgression/solicitor/draftAnOrderJourney.js";

export interface RemoveDraftNonMolestationOrderParams {
  draftOrderParams: NonMolestationDraftOrderParams;
  removalReason: string;
  snapshotsPath: string[];
  snapshotName: string;
}
// TEST COMMENT
test.describe("Remove draft order as a court admin for solicitor created FL401 cases", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ solicitor, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACaseAddCaseNumber(browser);
      await navigationUtils.goToCase(
        solicitor.page,
        Config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  scenarios.forEach(
    ({
      draftOrderParams,
      removalReason,
      snapshotsPath,
      snapshotName,
    }: RemoveDraftNonMolestationOrderParams) => {
      test(`Remove draft solicitor ${draftOrderParams.caseType} case order as a court admin. @regression @nightly @accessibility`, async ({
        browser,
        navigationUtils,
        caseWorker,
        solicitor,
      }): Promise<void> => {
        const { page, removeDraftOrders, summaryPage } = caseWorker;

        const draftAnOrderJourney: DraftAnOrderJourney =
          new DraftAnOrderJourney();
        await draftAnOrderJourney.draftAnOrder(
          solicitor.page,
          browser,
          caseNumber,
          draftOrderParams,
        );

        await navigationUtils.goToCase(
          page,
          Config.manageCasesBaseURLCase,
          caseNumber,
        );

        await summaryPage.chooseEventFromDropdown("Remove draft order");

        await removeDraftOrders.page1.assertPageContents();
        await removeDraftOrders.page1.verifyAccessibility();
        await removeDraftOrders.page1.selectOrderToRemove(
          draftOrderParams.orderType,
        );
        await removeDraftOrders.page1.clickContinue();

        await removeDraftOrders.page2.assertPageContents();
        await removeDraftOrders.page2.verifyAccessibility();
        await removeDraftOrders.page2.inputOrderRemovalReason(removalReason);
        await removeDraftOrders.page2.clickContinue();

        await removeDraftOrders.submitPage.assertPageContents(
          snapshotsPath,
          snapshotName,
        );
        await removeDraftOrders.submitPage.clickSubmit();

        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Remove draft order",
        );

        // check draft orders tab has been removed
        await summaryPage.tabHeader.assertTabDoesNotExist("Draft orders");
      });
    },
  );
});
