import { test } from "@playwright/test";
import Config from "../../../config";
import config from "../../../config";
import createDaCitizenCourtNavCase from "../../../common/createCaseHelper";
import { Helpers } from "../../../common/helpers";
import { JudgeManageOrderJourney } from "../../../journeys/manageCases/caseProgression/judgeManageOrders/judgeManageOrdersJourney.ts";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Judge create an order tests.", () => {
  let ccdRef: string;

  test.beforeEach(async ({ page }) => {
    ccdRef = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURLCase, ccdRef, "tasks");
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
    });
  });

  test("Create an amend discharge varied order. @regression", async ({
    page,
    browser,
  }): Promise<void> => {
    await JudgeManageOrderJourney.JudgeCreateOrderCaseProgressionJourney({
      page,
      browser,
      ccdRef: ccdRef,
      accessibilityTest: false,
      c100CaseWorkerActions: "Manage orders",
      createOrderFL401Options: "amend discharge varied order",
      yesNoManageOrders: false,
      judgeTitles: "Deputy Circuit Judge",
      withOrWithoutNotice: false,
      createOrderManageOrders19Options: "dateToBeFixed",
      howLongWillOrderBeInForce: "untilNextHearing",
      manageOrdersOptions: "create order",
    });
  });
});
