import config from "../../../utils/config.utils";
import { Helpers } from "../../../common/helpers";
import { jsonDatas } from "../../../common/caseHelpers/jsonDatas";
import { ServiceOfApplication } from "../../../journeys/manageCases/caseProgression/serviceOfApplication/serviceOfApplication";
import { test } from "../../fixtures";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Service of Application task for DA Citizen case tests.", () => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - initial Courtnav case creation doesn't work",
  );

  let ccdRef: string = "";
  test.beforeEach(async ({ page, courtNavUtils }) => {
    ccdRef = await courtNavUtils.createCase(true, false);
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
    await ServiceOfApplication.FL401FullServiceOfApplicationJourney({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      createOrderFL401Options: "power of arrest",
      browser: browser,
      personallyServed: true,
      yesNoServiceOfApplication4: true,
      confidentialityCheck: false,
      responsibleForServing: "courtBailiff",
      manageOrderData: jsonDatas.citizenManageOrderDataPowerOfArrest,
      applicationSubmittedBy: "Citizen",
    });
  });

  test(`Complete Task - service of application (non-personally served) - Amended, discharged or varied order (FL404B)  with accessibility test. @regression @accessibility`, async ({
    page,
    browser,
  }): Promise<void> => {
    await ServiceOfApplication.FL401FullServiceOfApplicationJourney({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      createOrderFL401Options: "amend discharge varied order",
      browser: browser,
      personallyServed: false,
      yesNoServiceOfApplication4: true,
      confidentialityCheck: false,
      responsibleForServing: "courtBailiff",
      manageOrderData: jsonDatas.citizenManageOrderDataAmendDischargedVaried,
      applicationSubmittedBy: "Citizen",
    });
  });
});
