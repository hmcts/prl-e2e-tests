import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";
import { CompleteTheOrder } from "../../../../journeys/manageCases/caseProgression/completeTheOrder/completeTheOrder.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for DA Citizen case tests.", () => {
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

  test("Complete Task - Complete the Order - Power of arrest (FL406) without accessibility test. @nightly @regression", async ({
    page,
    browser,
  }) => {
    await CompleteTheOrder.completeTheOrder({
      page: page,
      accessibilityTest: false,
      ccdRef: ccdRef,
      createOrderFL401Options: "power of arrest",
      browser: browser,
      personallyServed: true,
      manageOrderData: jsonDatas.manageOrderDataPowerOfArrest,
      applicationSubmittedBy: "Solicitor",
    });
  });

  test("Complete Task - Complete the Order - Amended, discharged or varied order (FL404B) with accessibility test. @regression @accessibility", async ({
    page,
    browser,
  }) => {
    await CompleteTheOrder.completeTheOrder({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      createOrderFL401Options: "amend discharge varied order",
      browser: browser,
      personallyServed: true,
      manageOrderData: jsonDatas.manageOrderDataAmendDischargedVaried,
      applicationSubmittedBy: "Solicitor",
    });
  });
});
