import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { CompleteOrderServiceOfApplication } from "../../../../journeys/manageCases/caseProgression/completeOrderServiceOfApplication/completeOrderServiceOfApplication.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Task - Complete the Order & statement of service - Power of arrest (FL406) without accessibility test. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CompleteOrderServiceOfApplication.completeOrderServiceOfApplication({
      page: page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true,
      ccdRef: ccdRef,
      c100CaseWorkerActions: "Manage orders",
      manageOrdersOptions: "create order",
      createOrderFL401Options: "power of arrest",
      yesNoManageOrders: false,
      judgeTitles: "Her Honour Judge",
      withOrWithoutNotice: true,
      createOrderManageOrders19Options: "dateToBeFixed", // "dateConfirmed" will not pass because page 19 does not give a hearing you are allowed to select
      howLongWillOrderBeInForce: "untilNextHearing", // Should not matter unless non-molestation order is selected.
      browser: browser,
      personallyServed: true,
      yesNoServiceOfApplication4: true,
      responsibleForServing: "courtBailiff",
    });
  });

  test("Complete Task - Complete the Order & statement of service - Amended, discharged or varied order (FL404B)  with accessibility test. @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await CompleteOrderServiceOfApplication.completeOrderServiceOfApplication({
      page: page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true,
      ccdRef: ccdRef,
      c100CaseWorkerActions: "Manage orders",
      manageOrdersOptions: "create order",
      createOrderFL401Options: "amend discharge varied order",
      yesNoManageOrders: false,
      judgeTitles: "Deputy Circuit Judge",
      withOrWithoutNotice: false,
      createOrderManageOrders19Options: "dateToBeFixed", // "dateConfirmed" will not pass because page 19 does not give a hearing you are allowed to select
      howLongWillOrderBeInForce: "untilNextHearing", // Should not matter unless non-molestation order is selected.
      browser: browser,
      personallyServed: false,
      yesNoServiceOfApplication4: true,
      responsibleForServing: "courtBailiff",
    });
  });
});
