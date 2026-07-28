import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { ServiceOfApplication } from "../../../../journeys/manageCases/caseProgression/serviceOfApplication/serviceOfApplication.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Service of Application task for DA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
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
      applicationSubmittedBy: "Solicitor",
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
      applicationSubmittedBy: "Solicitor",
    });
  });
});
