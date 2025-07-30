import Config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { SendToGateKeeperJourney } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.js";
import { C100CompleteTheOrder } from "../../../../journeys/manageCases/caseProgression/completeTheOrder/C100completeTheOrder.js";
import { test } from "../../../fixtures.js";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for C100 case tests.", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
    await SolicitorCACaseCreator.c100sendToGatekeeper(browser, ccdRef);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      ccdRef,
      "Summary",
    );
  });

  test(`Complete Creating and serving C100 order as a Caseworker with the following options:
  Case: C100,
  Accessibility testing: yes. 
  @nightly @accessibility @regression`, async ({ page }): Promise<void> => {
    await C100CompleteTheOrder.C100completeTheOrder({
      page: page,
      accessibilityTest: true,
      solicitorCaseCreateType: "C100",
      isUploadOrder: false,
      checkOption: "noCheck", //options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
      serveOrderNow: true, //select to serve order instantly
      personallyServed: true,
    });
  });
});
