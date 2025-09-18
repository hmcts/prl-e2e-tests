import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CreateABundleJourney } from "../../../../journeys/manageCases/caseProgression/createABundle/createABundle.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for CA Solicitor case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createCACaseSendToGatekeeper(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Complete Task - Create a Bundle - Child arrangements, specific issue or prohibited steps order (C43) without accessibility test. @nightly @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CreateABundleJourney.C100CreateABundleJourney({
      page: page,
      accessibilityTest: false,
      browser: browser,
      ccdRef: ccdRef,
      manageOrderData: jsonDatas.manageOrderDataC43CreateOrder,
      applicationSubmittedBy: "Solicitor",
    });
  });

  test("Complete Task - Create a Bundle - Child arrangements, specific issue or prohibited steps order (C43) with accessibility test. @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await CreateABundleJourney.C100CreateABundleJourney({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      browser: browser,
      manageOrderData: jsonDatas.manageOrderDataC43CreateOrder,
      applicationSubmittedBy: "Solicitor",
    });
  });
});
