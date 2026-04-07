import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { ConfidentialityCheck } from "../../../../journeys/manageCases/caseProgression/confidentilityCheck/confidentialityCheck.ts";

test.use({ storageState: config.sessionStoragePath + "caseManager.json" });

test.describe("Confidentiality check task for CA Solicitor case tests.", () => {
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

  test("Complete Task - Confidentiality check - Child arrangements, specific issue or prohibited steps order (C43) without accessibility test. @nightly @regression @visual", async ({
    page,
    browser,
    browserName,
  }) => {
    await ConfidentialityCheck.C100confidentialityCheck({
      page: page,
      accessibilityTest: false,
      ccdRef: ccdRef,
      browser: browser,
      personallyServed: true,
      applicationSubmittedBy: "Solicitor",
      yesNoServiceOfApplication4: false,
      confidentialityCheck: false,
      responsibleForServing: "courtBailiff",
      isApplicationServedAfterConfidentialityCheck: true,
      browserName: browserName,
      solicitorCaseCreateType: "C100",
      isUploadOrder: false,
      checkOption: "noCheck", //options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
      serveOrderNow: true, //select to serve order instantly
    });
  });
});
