import { Browser, expect, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import {
  c100CaseWorkerActions,
  manageOrdersOptions,
  uploadOrderFL401Options,
} from "../../../../common/types";
import { ManageOrders1Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Page";
import { ApplicationJourneysCheckGatekeeper } from "./application-journeys-check-gatekeeper";
import { ManageOrders3Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders3Page";
import {
  UploadOrderManageOrders5Page
} from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/uploadOrderManageOrders5Page";
import { ManageOrders30Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders30Page";

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

interface JudgeUOCaseProgressionJourneyParams {
  browser: Browser;
  ccdRef: string;
  accessibilityTest: boolean;
  c100CaseWorkerActions: c100CaseWorkerActions;
  yesNoManageOrders: boolean;
  uploadOrderFL401Options: uploadOrderFL401Options;
  manageOrdersOptions: manageOrdersOptions;
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
    await this.JudgeUOCaseProgressionJourney({
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

  private static async JudgeUOCaseProgressionJourney({
    browser,
    ccdRef,
    accessibilityTest,
    c100CaseWorkerActions,
    yesNoManageOrders,
    uploadOrderFL401Options,
    manageOrdersOptions,
  }: JudgeUOCaseProgressionJourneyParams): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(browser, "judge");
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await this.waitForManageOrderSelectOptionToBeVisible(page);
    await Helpers.chooseEventFromDropdown(page, c100CaseWorkerActions);
    await ManageOrders1Page.manageOrders1Page({
      page,
      accessibilityTest,
      manageOrdersOptions,
    });
    await ManageOrders3Page.manageOrders3Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
      uploadOrderFL401Options,
    });
    await UploadOrderManageOrders5Page.uploadOrderManageOrders5Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
    });
    await ManageOrders30Page.manageOrders30Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
    })
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
