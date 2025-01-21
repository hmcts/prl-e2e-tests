import { test } from "@playwright/test";
import Config from "../../../config";
import config from "../../../config";
import createDaCitizenCourtNavCase from "../../../common/createCaseHelper";
import { Helpers } from "../../../common/helpers";
import { JudgeManageOrderJourney } from "../../../journeys/manageCases/caseProgression/judgeManageOrders/judgeManageOrdersJourney.ts";
import { submitEvent } from "../../../common/solicitorCaseCreatorHelper.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Judge upload an order tests.", () => {
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await submitEvent(page, ccdRef, "fl401AddCaseNumber");
    await submitEvent(page, ccdRef, "fl401SendToGateKeeper");
  });

  test("Upload a power of arrest order. @nightly @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await JudgeManageOrderJourney.JudgeUploadOrderCaseProgressionJourney({
      page: page,
      browser: browser,
      ccdRef: ccdRef,
      accessibilityTest: true,
      c100CaseWorkerActions: "Manage orders",
      yesNoManageOrders: false,
      uploadOrderFL401Options: "power of arrest",
      manageOrdersOptions: "upload order",
    });
  });

  test("Upload a bail notice order. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await JudgeManageOrderJourney.JudgeUploadOrderCaseProgressionJourney({
      page: page,
      browser: browser,
      ccdRef: ccdRef,
      accessibilityTest: true,
      c100CaseWorkerActions: "Manage orders",
      yesNoManageOrders: false,
      uploadOrderFL401Options: "bail notice",
      manageOrdersOptions: "upload order",
    });
  });
});
