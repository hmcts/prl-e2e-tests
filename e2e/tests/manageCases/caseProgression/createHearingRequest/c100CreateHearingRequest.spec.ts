import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CreateHearingRequest } from "../../../../journeys/manageCases/caseProgression/createHearingRequest/createHearingRequest.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Hearing Request Order task for CA Solicitor case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseSendToGatekeeper(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "Summary",
    );
  });

  test("Complete Task - Create Hearing Request - Child arrangements, specific issue or prohibited steps order (C43) with accessibility test. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await CreateHearingRequest.C100CreateHearingRequest({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      createOrderC100Options: "C43 order",
    });
  });
});
