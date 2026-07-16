import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { ConfidentialityCheck } from "../../../../journeys/manageCases/caseProgression/confidentilityCheck/confidentialityCheck.ts";

test.use({ storageState: config.sessionStoragePath + "caseManager.json" });

test.describe("Confidentiality check task for CA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await manageCasesEventUtils.createOrder({
      caseRef: caseRef,
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isDraft: false,
      doServe: false,
    });
    await manageCasesEventUtils.serviceOfApplication(
      caseRef,
      "C100",
      "Child arrangements, specific issue or prohibited steps order (C43)",
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
    await ConfidentialityCheck.C100confidentialityCheck({
      page: page,
      accessibilityTest: true,
      isApplicationServedAfterConfidentialityCheck: true,
      browserName: browserName,
    });
  });
});
