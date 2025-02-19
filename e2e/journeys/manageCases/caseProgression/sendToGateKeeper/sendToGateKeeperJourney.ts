import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";
import { FL401SendToGateKeeper1Page } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeper1Page.ts";
import { FL401SendToGateKeeperSubmitPage } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeperSubmitPage.ts";
import { submitEvent } from "../../../../common/solicitorCaseCreatorHelper.ts";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
}

export class SendToGateKeeperJourney {
  public static async sendToGateKeeper({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
    ccdRef,
  }: CheckApplicationParams): Promise<void> {
    await submitEvent(page, ccdRef, "fl401AddCaseNumber");
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
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
