import { Browser, Page } from "@playwright/test";
import {
  WACaseWorkerActions,
  manageOrdersOptions,
  uploadOrderFL401Options,
} from "../../../../common/types.ts";
import { JudgeManageOrderJourney } from "./judgeManageOrders/judgeManageOrdersJourney.ts";
import { CheckApplicationJourney } from "./checkApplication/checkApplicationJourney.ts";
import { SendToGateKeeperJourney } from "./sendToGateKeeper/sendToGateKeeperJourney.ts";
import { submitEvent } from "../../../../common/solicitorCaseCreatorHelper.ts";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
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
    ccdRef,
    c100CaseWorkerActions,
    yesNoManageOrders,
    uploadOrderFL401Options,
    manageOrdersOptions,
    browser,
  }: CheckApplicationParams): Promise<void> {
    await submitEvent(page, ccdRef, "fl401AddCaseNumber");
    await submitEvent(page, ccdRef, "fl401SendToGateKeeper");
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
