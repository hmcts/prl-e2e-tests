import { Page, expect, Browser } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { FL401SendToGateKeeper1Page } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeper1Page.ts";
import { FL401SendToGateKeeperSubmitPage } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeperSubmitPage.ts";
import { submitEvent } from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";
//import { Selectors } from "../../../../common/selectors.ts";

interface SendToGateKeeperParams {
  page: Page;
  accessibilityTest: boolean;
  checkApplicationEvent?: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
  browser?: Browser;
}

export class SendToGateKeeperJourney {
  public static async sendToGateKeeper({
    page,
    accessibilityTest,
    checkApplicationEvent = true,
    yesNoSendToGateKeeper,
    ccdRef,
  }: SendToGateKeeperParams): Promise<void> {
    if (checkApplicationEvent) {
      await submitEvent(page, ccdRef, "fl401AddCaseNumber");
    }
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
    //checking if the 'Send to gatekeeper' WA task has auto-closed as expected
    await this.checkSendToGatekeeperTaskAutoClosure(page, ccdRef);
  }

  public static async teamLeaderCheckSendToGateKeeper({
    ccdRef,
    browser,
  }: SendToGateKeeperParams): Promise<void> {
    const teamLeaderPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseManager",
    );
    await Helpers.goToCase(
      teamLeaderPage,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await Helpers.waitForTask(teamLeaderPage, "Send to Gatekeeper");
    // const taskLocator = teamLeaderPage.locator("exui-case-task", {
    //   hasText: "Send to Gatekeeper",
    // });
    //THIS BIT below will be 'on hold' due to the AAT leader user NOT having the correct user roles, so the MARK AS DONE doesn't show up as expected

    //await taskLocator.locator(Selectors.a, { hasText: "Assign to me" }).click();
    //checking if the 'Send to gatekeeper' WA task has the team-leader 'manage options'
    //await this.checkSendToGatekeeperTaskMarkAsDone(teamLeaderPage);
  }

  private static async checkSendToGatekeeperTaskAutoClosure(
    page: Page,
    ccdRef: string,
  ): Promise<void> {
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await expect(page.getByText("Send to Gatekeeper")).not.toBeVisible();
  }

  private static async checkSendToGatekeeperTaskMarkAsDone(
    page: Page,
  ): Promise<void> {
    await expect(page.getByText("Mark as done")).toBeVisible();
    await expect(page.getByText("Reassign task")).toBeVisible();
  }
}
