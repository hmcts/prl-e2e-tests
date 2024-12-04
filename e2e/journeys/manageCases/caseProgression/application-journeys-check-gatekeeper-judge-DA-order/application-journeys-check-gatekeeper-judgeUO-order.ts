import { Browser, Page } from "@playwright/test";
import {
  c100CaseWorkerActions,
  manageOrdersOptions,
  uploadOrderFL401Options,
} from "../../../../common/types";
import { ApplicationJourneysCheckGatekeeper } from "./application-journeys-check-gatekeeper";
import { JudgeManageOrderJourney } from "./individualJourneys/judgeManageOrdersJourney";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
  c100CaseWorkerActions: c100CaseWorkerActions;
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
    await ApplicationJourneysCheckGatekeeper.applicationJourneysCheckGatekeeper(
      {
        page,
        accessibilityTest,
        yesNoSendToGateKeeper,
        ccdRef,
      },
    );
    await JudgeManageOrderJourney.JudgeUploadOrderCaseProgressionJourney({
      browser,
      ccdRef,
      accessibilityTest,
      c100CaseWorkerActions,
      yesNoManageOrders,
      uploadOrderFL401Options,
      manageOrdersOptions,
    });
    await page.waitForTimeout(5000);
  }
}
