import { Config } from "../../../../utils/config.utils.ts";
import { RestrictedCaseAccess } from "../../../../journeys/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessJourney.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "judge.json" });

test.describe("Complete the Restricted Case Access events for CA case.", () => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - roles and access doesn't work",
  );

  let ccdRef: string = "";
  test.beforeEach(async ({ browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseSendToGatekeeper(browser);
  });

  test("Mark CA case as restricted as a gatekeeper judge. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await RestrictedCaseAccess.restrictedCaseAccess({
      page: page,
      accessibilityTest: true,
      ccdRef,
    });
  });
});
