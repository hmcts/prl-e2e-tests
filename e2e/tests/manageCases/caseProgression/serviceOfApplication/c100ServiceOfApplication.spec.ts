import { test } from "../../../fixtures.js";
import config from "../../../../utils/config.utils.js";
import { Helpers } from "../../../../common/helpers.js";
import { ServiceOfApplication } from "../../../../journeys/manageCases/caseProgression/serviceOfApplication/serviceOfApplication.js";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });
// TEST COMMENT
test.describe("Service of Application task for CA Solicitor case tests.", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseSendToGatekeeper(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "Summary",
    );
  });

  test(`Complete Task - service of application (non-personally served) - Child arrangements, specific issue or prohibited steps order (C43) with accessibility test. @nightly @regression @accessibility`, async ({
    page,
  }): Promise<void> => {
    await ServiceOfApplication.C100FullServiceOfApplicationJourney({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      personallyServed: true,
      solicitorCaseCreateType: "C100",
      isUploadOrder: false,
      checkOption: "noCheck", //options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
      serveOrderNow: true, //select to serve order instantly
      yesNoServiceOfApplication4: false,
      confidentialityCheck: false,
      responsibleForServing: "courtBailiff",
      applicationSubmittedBy: "Solicitor",
    });
  });
});
