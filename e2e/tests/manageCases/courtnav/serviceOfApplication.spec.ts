import config from "../../../utils/config.utils.ts";
import { Helpers } from "../../../common/helpers.ts";
import { ServiceOfApplication } from "../../../journeys/manageCases/caseProgression/serviceOfApplication/serviceOfApplication.ts";
import { test } from "../../fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Service of Application task for DA Citizen case tests.", () => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - initial Courtnav case creation doesn't work",
  );

  let caseRef: string = "";

  test.beforeEach(async ({ page, courtNavUtils, manageCasesEventUtils }) => {
    caseRef = await courtNavUtils.createCase(true, false);
    await manageCasesEventUtils.addFamilyManNumber(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test(`Complete Task - service of application (personally served) - Power of arrest (FL406) without accessibility test. @nightly @regression @accessibility`, async ({
    page,
    manageCasesEventUtils,
  }): Promise<void> => {
    await manageCasesEventUtils.createOrder({
      caseRef,
      orderType: "Power of arrest (FL406)",
      isDraft: false,
      doServe: false,
    });

    await ServiceOfApplication.FL401FullServiceOfApplicationJourney({
      page: page,
      accessibilityTest: true,
      createOrderFL401Options: "power of arrest",
      yesNoServiceOfApplication4: true,
      confidentialityCheck: false,
      responsibleForServing: "courtBailiff",
      applicationSubmittedBy: "Citizen",
    });
  });

  test(`Complete Task - service of application (non-personally served) - Amended, discharged or varied order (FL404B)  with accessibility test. @regression @accessibility`, async ({
    page,
    manageCasesEventUtils,
  }): Promise<void> => {
    await manageCasesEventUtils.createOrder({
      caseRef,
      orderType: "Amended, discharged or varied order (FL404B)",
      isDraft: false,
      doServe: false,
    });

    await ServiceOfApplication.FL401FullServiceOfApplicationJourney({
      page: page,
      accessibilityTest: true,
      createOrderFL401Options: "amend discharge varied order",
      yesNoServiceOfApplication4: true,
      confidentialityCheck: false,
      responsibleForServing: "courtBailiff",
      applicationSubmittedBy: "Citizen",
    });
  });
});
