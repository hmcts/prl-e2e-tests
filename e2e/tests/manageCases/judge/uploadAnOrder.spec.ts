import { test } from "../../fixtures.ts";
import config from "../../../utils/config.utils.ts";
import { Helpers } from "../../../common/helpers.ts";
import { JudgeManageOrderJourney } from "../../../journeys/manageCases/caseProgression/judgeManageOrders/judgeManageOrdersJourney.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Judge upload an order tests.", () => {
  let ccdRef: string;

  test.beforeEach(async ({ page, courtNavUtils }) => {
    ccdRef = await courtNavUtils.createCase(true, false);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Upload a power of arrest order. @nightly @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await JudgeManageOrderJourney.JudgeUploadOrderCaseProgressionJourney({
      page: page,
      browser: browser,
      ccdRef: ccdRef,
      accessibilityTest: false,
      c100CaseWorkerActions: "Manage orders",
      yesNoManageOrders: false,
      uploadOrderFL401Options: "power of arrest",
      manageOrdersOptions: "upload order",
      solicitorCaseCreateType: "FL401",
    });
  });

  test("Upload a bail notice order. @regression @accessibility", async ({
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
      solicitorCaseCreateType: "FL401",
    });
  });
});
