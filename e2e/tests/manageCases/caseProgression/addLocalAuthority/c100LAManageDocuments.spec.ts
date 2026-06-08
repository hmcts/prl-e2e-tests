import { test } from "../../../fixtures.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AdminAddLocalAuthority } from "../../../../journeys/manageCases/caseProgression/addLocalAuthority/adminAddLocalAuthority.ts";
import Config from "../../../../utils/config.utils.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Add local authority event for C100 case tests as a Local Authority User.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseSendToGatekeeper(browser);
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      ccdRef,
      "Summary",
    );
  });

  test("Complete Add Local Authority with accessibility test. @nightly @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await AdminAddLocalAuthority.adminAddLocalAuthority({
      page: page,
      browser: browser,
      accessibilityTest: true,
      organisationName: "Local Authority Private Law AAT Test Organisation",
    });
  });

});
