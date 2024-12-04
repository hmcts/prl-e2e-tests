import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import config from "../../../../../config";
import {
  FL401SendToGateKeeper1Page
} from "../../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeper1Page";
import {
  FL401SendToGateKeeperSubmitPage
} from "../../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeperSubmitPage";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
}

export class SendToGateKeeper {
  public static async sendToGateKeeper({
                                                           page,
                                                           accessibilityTest,
                                                           yesNoSendToGateKeeper,
                                                           ccdRef,
                                                         }: CheckApplicationParams): Promise<void> {
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Send to Gatekeeper",
      "Send to Gatekeeper",
    );
    await FL401SendToGateKeeper1Page.fl401SendToGateKeeper1Page({
      page,
      accessibilityTest,
      yesNoSendToGateKeeper,
    });
    await FL401SendToGateKeeperSubmitPage.fl401SendToGateKeeperSubmitPage({
      page,
      accessibilityTest,
      yesNoSendToGateKeeper,
    });
  }
}
