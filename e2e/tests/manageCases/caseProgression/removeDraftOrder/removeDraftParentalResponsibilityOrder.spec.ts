import Config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures/fixtures.ts";
import { RemoveDraftParentalResponsibilityOrderScenarios as scenarios } from "../../../../testData/draftOrders.js";
import { DraftAnOrderJourney } from "../../../../journeys/manageCases/caseProgression/solicitor/draftAnOrderJourney.js";
import { ParentalResponsibilityDraftOrderParams } from "../solicitor/draftAnOrder/draftAnOrderParentalResponsibility.spec.js";

export interface RemoveDraftParentalResponsibilityOrderParams {
  draftOrderParams: ParentalResponsibilityDraftOrderParams;
  removalReason: string;
  snapshotsPath: string[];
  snapshotName: string;
}

test.describe("Remove draft order as a court admin for solicitor created C100 cases", (): void => {
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

  scenarios.forEach(
    ({
      draftOrderParams,
      removalReason,
      snapshotsPath,
      snapshotName,
    }: RemoveDraftParentalResponsibilityOrderParams) => {
      test(`Remove draft solicitor ${draftOrderParams.caseType} case order as a court admin. @regression @nightly @accessibility`, async ({
        browser,
        navigationUtils,
        caseWorker,
        solicitor,
      }): Promise<void> => {
        const {
          page,
          draftOrdersPage,
          removeDraftOrder1Page,
          removeDraftOrder2Page,
          removeDraftOrderSubmitPage,
          summaryPage,
        } = caseWorker;

        const draftAnOrderJourney: DraftAnOrderJourney =
          new DraftAnOrderJourney();

        await draftAnOrderJourney.draftAnOrder(
          solicitor.page,
          browser,
          caseNumber,
          draftOrderParams,
        );

        // remove draft order as admin
        await navigationUtils.goToCase(
          page,
          Config.manageCasesBaseURLCase,
          caseNumber,
        );

        await draftOrdersPage.chooseEventFromDropdown("Remove draft order");
        await removeDraftOrder1Page.assertPageContents();
        await removeDraftOrder1Page.verifyAccessibility();
        await removeDraftOrder1Page.selectOrderToRemove(
          draftOrderParams.orderType,
        );
        await removeDraftOrder1Page.clickContinue();
        await removeDraftOrder2Page.assertPageContents();
        await removeDraftOrder2Page.verifyAccessibility();
        await removeDraftOrder2Page.inputOrderRemovalReason(removalReason);
        await removeDraftOrder2Page.clickContinue();
        await removeDraftOrderSubmitPage.assertPageContents(
          snapshotsPath,
          snapshotName,
        );
        await removeDraftOrderSubmitPage.clickSubmit();
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
