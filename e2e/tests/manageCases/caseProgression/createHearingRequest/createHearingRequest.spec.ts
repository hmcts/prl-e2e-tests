import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { CreateHearingRequest } from "../../../../journeys/manageCases/caseProgression/createHearingRequest/createHearingRequest";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Order task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test("Complete Task - Create Hearing Request - Blank order (FL404B) without accessibility test. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CreateHearingRequest.createHearingRequest({
      page: page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true,
      ccdRef: ccdRef,
      c100CaseWorkerActions: "Manage orders",
      manageOrdersOptions: "create order",
      createOrderFL401Options: "blank order",
      yesNoManageOrders: false,
      judgeTitles: "District Judge",
      withOrWithoutNotice: true,
      createOrderManageOrders19Options: "dateToBeFixed", // "dateConfirmed" will not pass because page 19 does not give a hearing you are allowed to select
      howLongWillOrderBeInForce: "untilNextHearing", // Should not matter unless non-molestation order is selected.
      browser: browser,
    });
  });

  test("Complete Task - Create Hearing Request - Amended, discharged or varied order (FL404B) with accessibility test. @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await CreateHearingRequest.createHearingRequest({
      page: page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: true,
      ccdRef: ccdRef,
      c100CaseWorkerActions: "Manage orders",
      manageOrdersOptions: "create order",
      createOrderFL401Options: "amend discharge varied order",
      yesNoManageOrders: false,
      judgeTitles: "Deputy District Judge",
      withOrWithoutNotice: false,
      createOrderManageOrders19Options: "dateToBeFixed", // "dateConfirmed" will not pass because page 19 does not give a hearing you are allowed to select
      howLongWillOrderBeInForce: "untilNextHearing", // Should not matter unless non-molestation order is selected.
      browser: browser,
    });
  });
});
