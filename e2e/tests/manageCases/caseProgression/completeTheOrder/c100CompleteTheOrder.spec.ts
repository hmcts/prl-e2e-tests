import Config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { test } from "../../../fixtures.ts";
import { CompleteTheOrder } from "../../../../journeys/manageCases/caseProgression/completeTheOrder/completeTheOrder.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for C100 case tests.", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseSendToGatekeeper(browser);
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
    await CompleteTheOrder.C100completeTheOrder({
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
