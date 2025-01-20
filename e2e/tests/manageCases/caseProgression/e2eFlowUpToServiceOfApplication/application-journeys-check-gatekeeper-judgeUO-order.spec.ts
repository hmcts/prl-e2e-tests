import { test } from "@playwright/test";
import Config from "../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper.ts";
import { ApplicationJourneysCheckGatekeeperJudgeUOOrder } from "../../../../journeys/manageCases/caseProgression/e2eFlowUpToServiceOfApplication/application-journeys-check-gatekeeper-judgeUO-order.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Check Application task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test(`Complete Check Application without accessibility test,
        send to gatekeeper journey,
        judge upload an order journey with params:
        . @regression`, async ({ page, browser }): Promise<void> => {
    await ApplicationJourneysCheckGatekeeperJudgeUOOrder.applicationJourneysCheckGatekeeperJudgeUOOrder(
      {
        page: page,
        accessibilityTest: false,
        ccdRef: ccdRef,
        c100CaseWorkerActions: "Manage orders",
        manageOrdersOptions: "upload order",
        yesNoManageOrders: false,
        uploadOrderFL401Options: "power of arrest",
        browser: browser,
      },
    );
  });

  test(`Complete Check Application with accessibility test,
        send to gatekeeper journey,
        judge upload an order journey with params:
         @regression @accessibility @nightly`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ApplicationJourneysCheckGatekeeperJudgeUOOrder.applicationJourneysCheckGatekeeperJudgeUOOrder(
      {
        page: page,
        accessibilityTest: true,
        ccdRef: ccdRef,
        c100CaseWorkerActions: "Manage orders",
        manageOrdersOptions: "upload order",
        yesNoManageOrders: false,
        uploadOrderFL401Options: "bail notice",
        browser: browser,
      },
    );
  });
});
