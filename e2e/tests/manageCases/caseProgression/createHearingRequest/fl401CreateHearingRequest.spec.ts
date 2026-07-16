import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { CreateHearingRequest } from "../../../../journeys/manageCases/caseProgression/createHearingRequest/createHearingRequest.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Hearing Request Order task for DA Solicitor case tests.", () => {
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

  test("Complete Task - Create Hearing Request with accessibility test. @nightly @accessibility @regression", async ({
    page,
  }): Promise<void> => {
    await CreateHearingRequest.FL401CreateHearingRequest({
      page: page,
      accessibilityTest: true,
    });
  });
});
