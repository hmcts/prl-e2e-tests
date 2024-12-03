import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { ApplicationJourneysCheckGatekeeperJudgeUOOrder } from "../../../../journeys/manageCases/caseProgression/application-journeys-check-gatekeeper-judge-DA-order/application-journeys-check-gatekeeper-judgeUO-order";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";

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
        yesNoSendToGateKeeper: true,
        ccdRef: ccdRef,
        c100CaseWorkerActions: "Manage orders",
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
        yesNoSendToGateKeeper: true,
        ccdRef: ccdRef,
        c100CaseWorkerActions: "Manage orders",
        browser: browser,
      },
    );
  });
});
