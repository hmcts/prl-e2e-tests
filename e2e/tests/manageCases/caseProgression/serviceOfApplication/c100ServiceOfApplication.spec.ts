import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { ServiceOfApplication } from "../../../../journeys/manageCases/caseProgression/serviceOfApplication/serviceOfApplication.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Service of Application task for CA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await manageCasesEventUtils.createOrder({
      caseRef,
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isDraft: false,
      doServe: false,
    });
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
    );
  });

  test(`Complete Task - service of application (non-personally served) - Child arrangements, specific issue or prohibited steps order (C43) with accessibility test. @nightly @regression @accessibility`, async ({
    page,
  }): Promise<void> => {
    await ServiceOfApplication.C100FullServiceOfApplicationJourney({
      page: page,
      accessibilityTest: true,
      yesNoServiceOfApplication4: false,
      confidentialityCheck: true,
      responsibleForServing: "courtBailiff",
      applicationSubmittedBy: "Solicitor",
    });
  });
});
