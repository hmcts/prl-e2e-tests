import Config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";
import { NonMolestationDraftOrderParams } from "../solicitor/draftAnOrder/draftAnOrderNonMolestation.spec.js";
import { RemoveDraftNonMolestationOrderScenarios as scenarios } from "../../../../testData/draftOrders.js";
import { DraftAnOrderJourney } from "../../../../journeys/manageCases/caseProgression/solicitor/draftAnOrderJourney.js";
import { Page } from "@playwright/test";
import { RemoveDraftOrder1Page } from "../../../../pageObjects/pages/exui/orders/removeDraftOrder/removeDraftOrder1.po.js";
import { AxeUtils } from "@hmcts/playwright-common";
import { RemoveDraftOrder2Page } from "../../../../pageObjects/pages/exui/orders/removeDraftOrder/removeDraftOrder2.po.js";
import { RemoveDraftOrderSubmitPage } from "../../../../pageObjects/pages/exui/orders/removeDraftOrder/removeDraftOrderSubmit.po.js";
import { SummaryPage } from "../../../../pageObjects/pages/exui/caseView/summary.po.js";

export interface RemoveDraftNonMolestationOrderParams {
  draftOrderParams: NonMolestationDraftOrderParams;
  removalReason: string;
  snapshotsPath: string[];
  snapshotName: string;
}

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Remove draft order as a court admin for solicitor created FL401 cases", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACaseAddCaseNumber(browser);
      await navigationUtils.goToCase(
        page,
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
        summaryPage,
        draftAnOrder1Page,
        draftAnOrder2Page,
        draftAnOrder4Page,
        draftAnOrder5Page,
        draftAnOrder16Page,
        draftAnOrder20Page,
        draftAnOrderSubmitPage,
        axeUtils,
        navigationUtils,
      }): Promise<void> => {
        const draftAnOrderJourney: DraftAnOrderJourney =
          new DraftAnOrderJourney();

        await draftAnOrderJourney.draftAnOrder(
          browser,
          caseNumber,
          {
            summaryPage,
            draftAnOrder1Page,
            draftAnOrder2Page,
            draftAnOrder4Page,
            draftAnOrder5Page,
            draftAnOrder16Page,
            draftAnOrder20Page,
            draftAnOrderSubmitPage,
            axeUtils,
            navigationUtils,
          },
          draftOrderParams,
        );

        // remove draft order as admin
        const adminPage: Page = await navigationUtils.openNewBrowserWindow(
          browser,
          "caseWorker",
        );
        await navigationUtils.goToCase(
          adminPage,
          Config.manageCasesBaseURLCase,
          caseNumber,
        );
        const adminAxeUtils: AxeUtils = new AxeUtils(adminPage);
        const adminSummaryPage: SummaryPage = new SummaryPage(adminPage);
        await adminSummaryPage.chooseEventFromDropdown("Remove draft order");
        const removeDraftOrder1Page: RemoveDraftOrder1Page =
          new RemoveDraftOrder1Page(adminPage);
        await removeDraftOrder1Page.assertPageContents();
        await adminAxeUtils.audit();
        await removeDraftOrder1Page.selectOrderToRemove(
          draftOrderParams.orderType,
        );
        await removeDraftOrder1Page.clickContinue();
        const removeDraftOrder2Page: RemoveDraftOrder2Page =
          new RemoveDraftOrder2Page(adminPage);
        await removeDraftOrder2Page.assertPageContents();
        await adminAxeUtils.audit();
        await removeDraftOrder2Page.inputOrderRemovalReason(removalReason);
        await removeDraftOrder2Page.clickContinue();
        const removeDraftOrderSubmitPage: RemoveDraftOrderSubmitPage =
          new RemoveDraftOrderSubmitPage(adminPage);
        await removeDraftOrderSubmitPage.assertPageContents(
          snapshotsPath,
          snapshotName,
        );
        await removeDraftOrderSubmitPage.clickSubmit();
        await adminSummaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Remove draft order",
        );
        // check draft orders tab has been removed
        await adminSummaryPage.tabHeader.assertTabDoesNotExist("Draft orders");
      });
    },
  );
});
