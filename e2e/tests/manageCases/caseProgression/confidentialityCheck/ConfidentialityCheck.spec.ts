import { test } from "@playwright/test";
import Config from "../../../../config";
import config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import { jsonDatas } from "../../../../common/solicitorCaseCreatorHelper.ts";
import { ConfidentilityCheck } from "../../../../journeys/manageCases/caseProgression/confidentilityCheck/confidentilityCheck.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Confidentiality check task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Task - Confidentiality check - Power of arrest (FL406) without accessibility test. @nightly @regression", async ({
    page,
    browser,
  }) => {
    await ConfidentilityCheck.confidentilityCheck({
      page: page,
      accessibilityTest: false,
      ccdRef: ccdRef,
      createOrderFL401Options: "power of arrest",
      browser: browser,
      personallyServed: true,
      manageOrderData: jsonDatas.manageOrderDataPowerOfArrest,
      applicationSubmittedBy: "Citizen",
      nameChange: true,
      dobChange: true,
      genderChange: true,
      gender: "male",
      liveInRefuge: true,
      changeApplicantAddress: true,
      keepDetailsConfidential: true,
      solicitorDetailsChange: true,
      yesNoServiceOfApplication4: true,
      confidentialityCheck: true,
      responsibleForServing: "courtBailiff",
    });
  });
});
