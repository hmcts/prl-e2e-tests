import { Browser, Page } from "@playwright/test";
import {
  c100CaseWorkerActions,
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
} from "../../../../common/types";
import { createOrderManageOrders19Options } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page";
import { ApplicationJourneysCheckGatekeeper } from "../checkApplicationSendToGateKeeper/application-journeys-check-gatekeeper";
import { JudgeManageOrderJourney } from "./judgeManageOrdersJourney";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
  c100CaseWorkerActions: c100CaseWorkerActions;
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
    await ApplicationJourneysCheckGatekeeper.applicationJourneysCheckGatekeeper(
      {
        page,
        accessibilityTest,
        yesNoSendToGateKeeper,
        ccdRef,
      },
    );
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
    await page.waitForTimeout(5000);
  }
}
