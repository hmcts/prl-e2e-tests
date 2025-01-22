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

  test(`Complete Task - statement of service - Power of arrest (FL406) without accessibility test. @regression`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ServiceOfApplication.serviceOfApplicationJourney({
      page: page,
      accessibilityTest: false,
      ccdRef: ccdRef,
      createOrderFL401Options: "power of arrest",
      browser: browser,
      personallyServed: true,
      yesNoServiceOfApplication4: true,
      responsibleForServing: "courtBailiff",
      manageOrderData: jsonDatas.manageOrderDataPowerOfArrest,
    });
  });

  test(`Complete Task - statement of service - Amended, discharged or varied order (FL404B)  with accessibility test. @regression @accessibility`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ServiceOfApplication.serviceOfApplicationJourney({
      page: page,
      accessibilityTest: false,
      ccdRef: ccdRef,
      createOrderFL401Options: "amend discharge varied order",
      browser: browser,
      personallyServed: false,
      yesNoServiceOfApplication4: true,
      responsibleForServing: "courtBailiff",
      manageOrderData: jsonDatas.manageOrderDataAmendDischargedVaried,
    });
  });
});
