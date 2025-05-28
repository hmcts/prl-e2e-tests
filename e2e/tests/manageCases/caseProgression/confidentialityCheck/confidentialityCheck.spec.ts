import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import createDaCitizenCourtNavCase from "../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../common/helpers";
import { jsonDatas } from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";
import { ConfidentialityCheck } from "../../../../journeys/manageCases/caseProgression/confidentilityCheck/confidentialityCheck.ts";

test.use({ storageState: Config.sessionStoragePath + "caseManager.json" });

test.describe("Confidentiality check task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Complete Task - Confidentiality check - Power of arrest (FL406) without accessibility test. @nightly @regression @visual", async ({
    page,
    browser,
    browserName,
  }) => {
    await ConfidentialityCheck.confidentialityCheck({
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
      isApplicationServedAfterConfidentialityCheck: true,
      browserName: browserName,
    });
  });
});
