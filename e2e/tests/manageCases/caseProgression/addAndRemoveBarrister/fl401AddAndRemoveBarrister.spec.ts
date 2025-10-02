import Config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";
import { AddAndRemoveBarrister } from "../../../../journeys/manageCases/caseProgression/addAndRemoveBarrister/addAndRemoveBarrister.ts";

test.use({ storageState: Config.sessionStoragePath + "nocSolicitor.json" });

test.describe("Add/Remove Barrister for DA case", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACaseSendToGatekeeper(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
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
      ccdRef: ccdRef,
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
      ccdRef: ccdRef,
      isApplicant: false,
      accessibilityTest: true,
      isCaseworker: true,
    });
  });
});