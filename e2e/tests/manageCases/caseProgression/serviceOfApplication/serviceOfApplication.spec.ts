import { test } from "@playwright/test";
import Config from "../../../../config";
import config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import { jsonDatas } from "../../../../common/solicitorCaseCreatorHelper.ts";
import { ServiceOfApplication } from "../../../../journeys/manageCases/caseProgression/serviceOfApplication/serviceOfApplication.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Service of Application task for DA Citizen case tests.", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test(`Complete Task - service of application (personally served) - Power of arrest (FL406) without accessibility test. @nightly @regression @accessibility`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ServiceOfApplication.fullServiceOfApplicationJourney({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      createOrderFL401Options: "power of arrest",
      browser: browser,
      personallyServed: true,
      yesNoServiceOfApplication4: true,
      confidentialityCheck: false,
      responsibleForServing: "courtBailiff",
      manageOrderData: jsonDatas.manageOrderDataPowerOfArrest,
      applicationSubmittedBy: "Citizen",
    });
  });

  test(`Complete Task - service of application (non-personally served) - Amended, discharged or varied order (FL404B)  with accessibility test. @regression @accessibility`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ServiceOfApplication.fullServiceOfApplicationJourney({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      createOrderFL401Options: "amend discharge varied order",
      browser: browser,
      personallyServed: false,
      yesNoServiceOfApplication4: true,
      confidentialityCheck: false,
      responsibleForServing: "courtBailiff",
      manageOrderData: jsonDatas.manageOrderDataAmendDischargedVaried,
      applicationSubmittedBy: "Citizen",
    });
  });
});
