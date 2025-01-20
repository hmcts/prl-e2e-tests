import { Browser, Page } from "@playwright/test";
import {
  WACaseWorkerActions,
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
} from "../../../../common/types.ts";
import { createOrderManageOrders19Options } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page.ts";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page.ts";
import { JudgeManageOrderJourney } from "./judgeManageOrders/judgeManageOrdersJourney.ts";
import { CheckApplicationJourney } from "./checkApplication/checkApplicationJourney.ts";
import { SendToGateKeeperJourney } from "./sendToGateKeeper/sendToGateKeeperJourney.ts";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
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
    yesNoSendToGateKeeper,
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
    await CheckApplicationJourney.checkApplication({
      page,
      accessibilityTest,
      ccdRef,
    });
    await SendToGateKeeperJourney.sendToGateKeeper({
      page,
      accessibilityTest,
      yesNoSendToGateKeeper,
      ccdRef,
    });
    await JudgeManageOrderJourney.JudgeCreateOrderCaseProgressionJourney({
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
