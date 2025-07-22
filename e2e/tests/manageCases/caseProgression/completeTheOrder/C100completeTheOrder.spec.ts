import { Page, test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { SolicitorCACaseCreator } from "../../../../common/caseHelpers/solicitorCACaseCreator.js";
import { SendToGateKeeperJourney } from "../../../../journeys/manageCases/caseProgression/sendToGateKeeper/sendToGateKeeperJourney.js";
import { C100CompleteTheOrder } from "../../../../journeys/manageCases/caseProgression/completeTheOrder/C100completeTheOrder.js";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for C100 case tests.", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ page, browser }) => {
    const solicitorPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "solicitor",
    );
    await solicitorPage.goto(Config.manageCasesBaseURLCase);
    ccdRef = await SolicitorCACaseCreator.createCaseSubmitAndPay(solicitorPage);
    await SolicitorCACaseCreator.c100IssueAndSendToLocalCourt(browser, ccdRef);
    await SendToGateKeeperJourney.sendToGateKeeper({
      page: page,
      ccdRef,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true, //set to true to allocate specific judge to case so they can restrict case
      checkApplicationEvent: false,
    });
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
  @nightly @accessibility`, async ({ page }): Promise<void> => {
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

  test(`Complete Creating and serving C100 order as a Caseworker with the following options:
  Case: C100,
  Not accessibility testing. 
  @regression`, async ({ page }): Promise<void> => {
    await C100CompleteTheOrder.C100completeTheOrder({
      page: page,
      accessibilityTest: false,
      solicitorCaseCreateType: "C100",
      isUploadOrder: false,
      checkOption: "noCheck", //options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
      serveOrderNow: true, //select to serve order instantly
      personallyServed: true,
    });
  });
});
