import { test } from "@playwright/test";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";
import Config from "../../../../config.ts";
import { CompleteTheOrder } from "../../../../journeys/manageCases/caseProgression/e2eFlowUpToServiceOfApplication/completeTheOrder/completeTheOrder.ts";
import { jsonDatas } from "../../../../common/solicitorCaseCreatorHelper.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete an order for DA case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete the order - Power of arrest order - personally served", async ({
    page,
    browser,
  }): Promise<void> => {
    await CompleteTheOrder.completeTheOrder({
      page: page,
      browser: browser,
      accessibilityTest: true,
      ccdRef: ccdRef,
      createOrderFL401Options: "power of arrest",
      personallyServed: true,
      manageOrderData: jsonDatas.manageOrderDataPowerOfArrest,
    });
  });

  test("Complete the order - amend discharge varied order - not personally served", async ({
    page,
    browser,
  }): Promise<void> => {
    await CompleteTheOrder.completeTheOrder({
      page: page,
      browser: browser,
      accessibilityTest: true,
      ccdRef: ccdRef,
      createOrderFL401Options: "amend discharge varied order",
      personallyServed: false,
      manageOrderData: jsonDatas.manageOrderDataAmendDischargedVaried,
    });
  });
});
