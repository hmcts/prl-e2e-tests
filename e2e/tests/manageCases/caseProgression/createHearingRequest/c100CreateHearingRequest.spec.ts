import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { CreateHearingRequest } from "../../../../journeys/manageCases/caseProgression/createHearingRequest/createHearingRequest.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Hearing Request Order task for CA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
    );
  });

  test("Complete Task - Create Hearing Request with accessibility test. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await CreateHearingRequest.C100CreateHearingRequest({
      page: page,
      accessibilityTest: true,
    });
  });
});
