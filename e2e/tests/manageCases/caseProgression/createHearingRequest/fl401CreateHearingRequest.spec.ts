import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CreateHearingRequest } from "../../../../journeys/manageCases/caseProgression/createHearingRequest/createHearingRequest.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Complete the Hearing Request Order task for DA Solicitor case tests.", () => {
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

  test("Complete Task - Create Hearing Request - Blank order (FL404B) without accessibility test. @nightly @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await CreateHearingRequest.FL401CreateHearingRequest({
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
    await CreateHearingRequest.FL401CreateHearingRequest({
      page: page,
      accessibilityTest: true,
      ccdRef: ccdRef,
      createOrderFL401Options: "amend discharge varied order",
      browser: browser,
      manageOrderData: jsonDatas.manageOrderDataAmendDischargedVaried,
    });
  });
});
