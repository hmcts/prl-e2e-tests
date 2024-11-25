import { Page } from "@playwright/test";
import { Fl401AddCaseNumber1Page } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumber1Page";
import { Helpers } from "../../../../common/helpers";
import { Fl401AddCaseNumberSubmitPage } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumberSubmitPage";
import { FL401SendToGateKeeper1Page } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeper1Page";
import { FL401SendToGateKeeperSubmitPage } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeperSubmitPage";
import config from "../../../../config";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
}



export class CheckApplication {
  public static async checkApplication({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
    ccdRef
  }: CheckApplicationParams): Promise<void> {
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Check Application",
      "Add Case Number",
    );
    await Fl401AddCaseNumber1Page.fl401AddCaseNumber1Page(
      page,
      accessibilityTest,
    );
    await Fl401AddCaseNumberSubmitPage.fl401AddCaseNumberSubmitPage(
      page,
      accessibilityTest,
    );
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