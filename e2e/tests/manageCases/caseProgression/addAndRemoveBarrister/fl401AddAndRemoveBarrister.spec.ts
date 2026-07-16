import Config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";
import { AddAndRemoveBarrister } from "../../../../journeys/manageCases/caseProgression/addAndRemoveBarrister/addAndRemoveBarrister.ts";

test.use({ storageState: Config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Add/Remove Barrister for DA case", () => {
  let caseRef: string = "";

  test.beforeEach(async ({ page, manageCasesEventUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  test("Solicitor adds and removes Barrister for a DA case. @nightly @accessibility @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await AddAndRemoveBarrister.addAndRemoveBarrister({
      page: page,
      browser: browser,
      caseType: "FL401",
      ccdRef: caseRef,
      isApplicant: false,
      accessibilityTest: true,
      isCaseworker: false,
    });
  });

  test("Caseworker adds and removes Barrister for a DA case. @nightly @accessibility @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await AddAndRemoveBarrister.addAndRemoveBarrister({
      page: page,
      browser: browser,
      caseType: "FL401",
      ccdRef: caseRef,
      isApplicant: false,
      accessibilityTest: true,
      isCaseworker: true,
    });
  });
});
