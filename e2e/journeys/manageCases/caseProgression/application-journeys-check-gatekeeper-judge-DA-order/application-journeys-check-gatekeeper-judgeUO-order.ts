import { Browser, expect, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import {
  c100CaseWorkerActions
} from "../../../../common/types";
import { ManageOrders1Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Page";
import { ApplicationJourneysCheckGatekeeper } from "./application-journeys-check-gatekeeper";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
  c100CaseWorkerActions: c100CaseWorkerActions;
  browser: Browser;
}

interface JudgeUOCaseProgressionJourneyParams {
  browser: Browser;
  ccdRef: string;
  accessibilityTest: boolean;
  c100CaseWorkerActions: c100CaseWorkerActions;
}

export class ApplicationJourneysCheckGatekeeperJudgeUOOrder {
  public static async applicationJourneysCheckGatekeeperJudgeUOOrder({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
    ccdRef,
    c100CaseWorkerActions,
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
    await this.JudgeUOCaseProgressionJourney({
      browser,
      ccdRef,
      accessibilityTest,
      c100CaseWorkerActions,
    });
    await page.waitForTimeout(5000);
  }

  private static async JudgeUOCaseProgressionJourney({
    browser,
    ccdRef,
    accessibilityTest,
    c100CaseWorkerActions,
  }: JudgeUOCaseProgressionJourneyParams): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(browser, "judge");
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await this.waitForManageOrderSelectOptionToBeVisible(page);
    await Helpers.chooseEventFromDropdown(page, c100CaseWorkerActions);
    await ManageOrders1Page.manageOrders1Page({
      page,
      accessibilityTest,
    });
  }

  private static async waitForManageOrderSelectOptionToBeVisible(
    page: Page,
  ): Promise<void> {
    const selectOptionLocator: string = "#next-step";
    const desiredText: string = "Manage orders";
    await expect
      .poll(
        async () => {
          const visible = await page.locator(selectOptionLocator).isVisible();
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
