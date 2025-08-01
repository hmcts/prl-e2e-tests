import { test } from "../../fixtures.ts";
import config from "../../../utils/config.utils.ts";
import { Helpers } from "../../../common/helpers.ts";
import { JudgeManageOrderJourney } from "../../../journeys/manageCases/caseProgression/judgeManageOrders/judgeManageOrdersJourney.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Judge create an order tests.", () => {
  let ccdRef: string;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    ccdRef = await caseEventUtils.createDACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Create a power of arrest order. @nightly @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await JudgeManageOrderJourney.JudgeCreateOrderCaseProgressionJourney({
      page,
      browser,
      ccdRef: ccdRef,
      accessibilityTest: true,
      c100CaseWorkerActions: "Manage orders",
      createOrderFL401Options: "power of arrest",
      yesNoManageOrders: false,
      judgeTitles: "Her Honour Judge",
      withOrWithoutNotice: true,
      createOrderManageOrders19Options: "dateToBeFixed",
      howLongWillOrderBeInForce: "untilNextHearing",
      manageOrdersOptions: "create order",
      solicitorCaseCreateType: "FL401",
    });
  });

  test("Create an amend discharge varied order. @nightly @regression @accessibility", async ({
    page,
    browser,
  }): Promise<void> => {
    await JudgeManageOrderJourney.JudgeCreateOrderCaseProgressionJourney({
      page,
      browser,
      ccdRef: ccdRef,
      accessibilityTest: true,
      c100CaseWorkerActions: "Manage orders",
      createOrderFL401Options: "amend discharge varied order",
      yesNoManageOrders: false,
      judgeTitles: "Deputy Circuit Judge",
      withOrWithoutNotice: false,
      createOrderManageOrders19Options: "dateToBeFixed",
      howLongWillOrderBeInForce: "untilNextHearing",
      manageOrdersOptions: "create order",
      solicitorCaseCreateType: "FL401",
    });
  });
});
