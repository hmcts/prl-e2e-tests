import { test } from "../../../fixtures";
import Config from "../../../../utils/config.utils";
import config from "../../../../utils/config.utils";
import { Helpers } from "../../../../common/helpers";
import { CreateABundleJourney } from "../../../../journeys/manageCases/caseProgression/createABundle/createABundle";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas";

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

  test("Complete Task - Create a Bundle - Child arrangements, specific issue or prohibited steps order (C43) with accessibility test. @nightly @regression @accessibility", async ({
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
