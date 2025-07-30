import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";
import { ServiceOfApplication } from "../../../../journeys/manageCases/caseProgression/serviceOfApplication/serviceOfApplication.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Service of Application task for DA Solicitor case tests.", () => {
  let ccdRef: string = "";
  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
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
      applicationSubmittedBy: "Solicitor",
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
      applicationSubmittedBy: "Solicitor",
    });
  });
});
