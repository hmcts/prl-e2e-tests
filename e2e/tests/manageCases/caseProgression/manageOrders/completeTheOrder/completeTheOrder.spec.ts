import { test } from "@playwright/test";
import Config from "../../../../../config.ts";
import config from "../../../../../config.ts";
import createDaCitizenCourtNavCase from "../../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { jsonDatas } from "../../../../../common/solicitorCaseCreatorHelper.ts";
import { CompleteTheOrder } from "../../../../../journeys/manageCases/caseProgression/manageOrders/completeTheOrder/completeTheOrder.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for DA Citizen case tests as a court admin.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
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
      applicationSubmittedBy: "Citizen",
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
      applicationSubmittedBy: "Citizen",
    });
  });
});
