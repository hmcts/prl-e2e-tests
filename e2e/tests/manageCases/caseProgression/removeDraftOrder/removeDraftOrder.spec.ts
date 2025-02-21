import { test, Page } from "@playwright/test";
import Config from "../../../../config";
import { DraftAnOrder } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";
import {Helpers} from "../../../../common/helpers.ts";
import config from "../../../../config.ts";
import {RemoveDraftOrder} from "../../../../journeys/manageCases/caseProgression/removeDraftOrder/removeDraftOrder.ts";
import {SolicitorDACaseCreator} from "../../../../common/solicitorDACaseCreator.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Remove draft order as a court admin for solicitor created CA case.", (): void => {
  let caseRef: string;
  test.slow();
  test.beforeEach(async ({ page }) => {
    await page.goto(Config.manageCasesBaseURL);
    caseRef =
        await SolicitorDACaseCreator.createCaseStatementOfTruthAndSubmit(page);
    await Helpers.goToCase(page, config.manageCasesBaseURL, caseRef, "tasks");
  });

  test(`Draft an non-Molestation order as a solicitor and then remove draft as a court admin for a DA case created by solicitor. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: true,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      browser: browser,
      caseRef: caseRef,
    });
    const caseWorkerPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(caseWorkerPage, config.manageCasesBaseURL, caseRef, "tasks");
    await RemoveDraftOrder.removeDraftOrder({
      page: caseWorkerPage,
      accessibilityTest: true,
      caseRef: caseRef,
    });
  });
});
