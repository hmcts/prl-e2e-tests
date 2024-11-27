import { Browser, expect, Page } from "@playwright/test";
import { Fl401AddCaseNumber1Page } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumber1Page";
import { Helpers } from "../../../../common/helpers";
import { Fl401AddCaseNumberSubmitPage } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumberSubmitPage";
import { FL401SendToGateKeeper1Page } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeper1Page";
import { FL401SendToGateKeeperSubmitPage } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeperSubmitPage";
import config from "../../../../config";
import { c100CaseWorkerActions } from "../../../../common/types";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
  c100CaseWorkerActions: c100CaseWorkerActions;
  browser: Browser;
}

interface JudgeDACaseProgressionJourneyParams {
  browser: Browser;
  ccdRef: string;
  accessibilityTest: boolean;
  c100CaseWorkerActions: c100CaseWorkerActions;
}

export class ApplicationJourneysCheckGatekeeperJudgeMOOrder {
  public static async checkApplication({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
    ccdRef,
    c100CaseWorkerActions,
    browser,
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
    await this.JudgeDACaseProgressionJourney({
      browser,
      ccdRef,
      accessibilityTest,
      c100CaseWorkerActions,
    });
    await page.waitForTimeout(5000);
  }

  private static async JudgeDACaseProgressionJourney({
    browser,
    ccdRef,
    accessibilityTest,
    c100CaseWorkerActions,
  }: JudgeDACaseProgressionJourneyParams): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(browser, "judge");
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await this.waitForManageOrderSelectOptionToBeVisible(page);
    await Helpers.chooseEventFromDropdown(page, c100CaseWorkerActions);
    // Pages
  }

  private static async waitForManageOrderSelectOptionToBeVisible(
    page: Page,
  ): Promise<void> {
    const selectOptionLocator: string = "#next-step";
    await expect
      .poll(
        async () => {
          const visible = await page.locator(selectOptionLocator).isVisible();
          const desiredText = "Manage orders";
          const isTextPresent = selectOptionLocator.includes(desiredText);
          if (!visible && !isTextPresent) {
            await page.reload();
          }
          return visible;
        },
        {
          // Allow 10s delay before retrying
          intervals: [10_000],
          // Allow up to a minute for it to become visible
          timeout: 100_000,
        },
      )
      .toBeTruthy();
  }
}
