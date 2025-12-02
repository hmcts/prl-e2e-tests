import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import {
  SendToGateKeeperJourney,
  SendToGateKeeperJourneyParams,
} from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.js";
import { SendToGateKeeperCourtAdminScenarios as scenarios } from "../../../../testData/sendToGateKeeper.js";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Send to Gatekeeper task as Court Admin for C100 Solicitor case tests.", () => {
  let caseNumber: string = "";

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "tasks",
      );
    },
  );

  scenarios.forEach((params: SendToGateKeeperJourneyParams) => {
    test(`Complete Send to Gatekeeper with ${params.sendToGateKeeperParams.judgeOrLegalAdviser ? params.sendToGateKeeperParams.judgeOrLegalAdviser : "no specific gatekeeper"} as gatekeeper @nightly @regression @accessibility`, async ({
      page,
    }) => {
      const sendToGateKeeperJourney: SendToGateKeeperJourney =
        new SendToGateKeeperJourney();
      await sendToGateKeeperJourney.sendToGateKeeper(
        page,
        caseNumber,
        "caseWorker",
        params,
      );
    });
  });
});
