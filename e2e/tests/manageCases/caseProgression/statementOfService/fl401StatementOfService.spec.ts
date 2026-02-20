import { test } from "../../../fixtures";
import config from "../../../../utils/config.utils";
import { Helpers } from "../../../../common/helpers";
import { StatementOfService } from "../../../../journeys/manageCases/caseProgression/statementOfService/statementOfService";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Statement of Service event for DA Solicitor case tests.", () => {
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

  test("Complete Task - statement of Service - Power of arrest (FL406) without accessibility test. @nightly @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await StatementOfService.FL401statementOfService({
      page: page,
      accessibilityTest: false,
      ccdRef: ccdRef,
      browser: browser,
      manageOrderData: jsonDatas.manageOrderDataPowerOfArrest,
      createOrderFL401Options: "power of arrest",
      applicationSubmittedBy: "Solicitor",
    });
  });

  test("Complete Task - statement of Service - Amended, discharged or varied order (FL404B)  with accessibility test. @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await StatementOfService.FL401statementOfService({
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
