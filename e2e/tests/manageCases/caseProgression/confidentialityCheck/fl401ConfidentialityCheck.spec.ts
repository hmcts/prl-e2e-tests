import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { ConfidentialityCheck } from "../../../../journeys/manageCases/caseProgression/confidentilityCheck/confidentialityCheck.ts";

test.use({ storageState: config.sessionStoragePath + "caseManager.json" });

test.describe("Confidentiality check task for DA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await manageCasesEventUtils.createOrder({
      caseRef: caseRef,
      orderType: "Power of arrest (FL406)",
      isDraft: false,
      doServe: false,
    });
    await manageCasesEventUtils.serviceOfApplication(
      caseRef,
      "FL401",
      "Power of arrest (FL406)",
    );
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test("Complete Task - Confidentiality check with accessibility test. @nightly @regression @visual", async ({
    page,
    browserName,
  }) => {
    await ConfidentialityCheck.FL401confidentialityCheck({
      page: page,
      accessibilityTest: true,
      isApplicationServedAfterConfidentialityCheck: true,
      browserName: browserName,
    });
  });
});
