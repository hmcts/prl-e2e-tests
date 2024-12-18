import { Browser, Page } from "@playwright/test";
import {
  WACaseWorkerActions,
  manageOrdersOptions,
  uploadOrderFL401Options,
} from "../../../../common/types.ts";
import { JudgeManageOrderJourney } from "./judgeManageOrders/judgeManageOrdersJourney.ts";
import { CheckApplicationJourney } from "./checkApplication/checkApplicationJourney.ts";
import { SendToGateKeeperJourney } from "./sendToGateKeeper/sendToGateKeeperJourney.ts";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
  c100CaseWorkerActions: WACaseWorkerActions;
  yesNoManageOrders: boolean;
  uploadOrderFL401Options: uploadOrderFL401Options;
  manageOrdersOptions: manageOrdersOptions;
  browser: Browser;
}

export class ApplicationJourneysCheckGatekeeperJudgeUOOrder {
  public static async applicationJourneysCheckGatekeeperJudgeUOOrder({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
    ccdRef,
    c100CaseWorkerActions,
    yesNoManageOrders,
    uploadOrderFL401Options,
    manageOrdersOptions,
    browser,
  }: CheckApplicationParams): Promise<void> {
    await CheckApplicationJourney.checkApplication({
      page,
      accessibilityTest,
      yesNoSendToGateKeeper,
      ccdRef,
    });
    await SendToGateKeeperJourney.sendToGateKeeper({
      page,
      accessibilityTest,
      yesNoSendToGateKeeper,
      ccdRef,
    });
    await JudgeManageOrderJourney.JudgeUploadOrderCaseProgressionJourney({
      browser,
      ccdRef,
      accessibilityTest,
      c100CaseWorkerActions,
      yesNoManageOrders,
      uploadOrderFL401Options,
      manageOrdersOptions,
    });
  }
}
