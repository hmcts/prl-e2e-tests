import { Browser, Page } from "@playwright/test";
import {
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  WACaseWorkerActions,
} from "../../../../common/types.ts";
import { createOrderManageOrders19Options } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page.ts";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page.ts";
import { JudgeManageOrderJourney } from "./judgeManageOrders/judgeManageOrdersJourney.ts";
import { submitEvent } from "../../../../common/solicitorCaseCreatorHelper.ts";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  c100CaseWorkerActions: WACaseWorkerActions;
  createOrderFL401Options: createOrderFL401Options;
  yesNoManageOrders: boolean;
  judgeTitles: judgeTitles;
  withOrWithoutNotice: boolean;
  createOrderManageOrders19Options: createOrderManageOrders19Options;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
  manageOrdersOptions: manageOrdersOptions;
  browser: Browser;
}

export class ApplicationJourneysCheckGatekeeperJudgeCOOrder {
  public static async applicationJourneysCheckGatekeeperJudgeCOOrder({
    page,
    accessibilityTest,
    ccdRef,
    c100CaseWorkerActions,
    createOrderFL401Options,
    yesNoManageOrders,
    judgeTitles,
    withOrWithoutNotice,
    createOrderManageOrders19Options,
    howLongWillOrderBeInForce,
    manageOrdersOptions,
    browser,
  }: CheckApplicationParams): Promise<void> {
    await submitEvent(page, ccdRef, "fl401AddCaseNumber");
    await submitEvent(page, ccdRef, "fl401SendToGateKeeper");
    // TODO: new API call, will need to think about this a bit more - need to check if/how the variables differ between tests
    await JudgeManageOrderJourney.JudgeCreateOrderCaseProgressionJourney({
      page,
      browser,
      ccdRef,
      accessibilityTest,
      c100CaseWorkerActions,
      createOrderFL401Options,
      yesNoManageOrders,
      judgeTitles,
      withOrWithoutNotice,
      createOrderManageOrders19Options,
      howLongWillOrderBeInForce,
      manageOrdersOptions,
    });
  }
}
