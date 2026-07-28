import { Config } from "../../../../utils/config.utils.ts";
import { RestrictedCaseAccess } from "../../../../journeys/manageCases/caseProgression/restrictedCaseAccess/restrictedCaseAccessJourney.ts";
import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.js";

test.use({ storageState: Config.sessionStoragePath + "judge.json" });

test.describe("Complete the Restricted Case Access events for CA case.", () => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - roles and access doesn't work",
  );

  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100", {
      isSpecificGatekeeper: true,
      isJudge: true,
    });
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
    );
  });

  test("Mark CA case as restricted as a gatekeeper judge. @nightly @regression @accessibility", async ({
    page,
  }): Promise<void> => {
    await RestrictedCaseAccess.restrictedCaseAccess({
      page: page,
      accessibilityTest: true,
    });
  });
});
