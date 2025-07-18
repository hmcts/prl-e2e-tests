import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import createDaCitizenCourtNavCase from "../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CreateHearingRequest } from "../../../../journeys/manageCases/caseProgression/createHearingRequest/createHearingRequest.ts";
import { jsonDatas } from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });
//
test.describe("Complete the Order task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Complete Task - Create Hearing Request - Blank order (FL404B) without accessibility test. @nightly @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CreateHearingRequest.createHearingRequest({
      page: page,
      accessibilityTest: false,
      ccdRef: ccdRef,
      createOrderFL401Options: "amend discharge varied order",
      browser: browser,
      manageOrderData: jsonDatas.manageOrderDataAmendDischargedVaried,
    });
  });

  test("Complete Task - Create Hearing Request - Amended, discharged or varied order (FL404B) with accessibility test. @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await CreateHearingRequest.createHearingRequest({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      createOrderFL401Options: "amend discharge varied order",
      browser: browser,
      manageOrderData: jsonDatas.manageOrderDataAmendDischargedVaried,
    });
  });
});
