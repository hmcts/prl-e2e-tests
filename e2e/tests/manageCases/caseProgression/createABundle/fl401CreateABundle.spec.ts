import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CreateABundleJourney } from "../../../../journeys/manageCases/caseProgression/createABundle/createABundle.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for DA Solicitor case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Complete Task - Create a Bundle - Power of arrest (FL406) without accessibility test. @nightly @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CreateABundleJourney.FL401CreateABundleJourney({
      page: page,
      accessibilityTest: false,
      ccdRef: ccdRef,
      browser: browser,
      manageOrderData: jsonDatas.manageOrderDataPowerOfArrest,
      createOrderFL401Options: "power of arrest",
      applicationSubmittedBy: "Solicitor",
    });
  });

  test("Complete Task - Create a Bundle - Amended, discharged or varied order (FL404B)  with accessibility test. @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await CreateABundleJourney.FL401CreateABundleJourney({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      browser: browser,
      manageOrderData: jsonDatas.manageOrderDataAmendDischargedVaried,
      createOrderFL401Options: "amend discharge varied order",
      applicationSubmittedBy: "Solicitor",
    });
  });
});
