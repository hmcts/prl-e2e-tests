import { Browser, expect, Page } from "@playwright/test";
import { Fl401AddCaseNumber1Page } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumber1Page";
import { Helpers } from "../../../../common/helpers";
import { Fl401AddCaseNumberSubmitPage } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumberSubmitPage";
import { FL401SendToGateKeeper1Page } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeper1Page";
import { FL401SendToGateKeeperSubmitPage } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeperSubmitPage";
import config from "../../../../config";
import {
  c100CaseWorkerActions,
  createOrderFL401Options,
  judgeTitles,
} from "../../../../common/types";
import { ManageOrders1Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Page";
import { ManageOrders2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders2Page";
import { ManageOrders5Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders5Page";
import { PowerOfArrestManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/powerOfArrestManageOrders12Page";
import { OccupationOrderManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/occupationOrderManageOrders12Page";
import { AmendDischargeVariedManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/amendDischargeVariedManageOrders12Page";
import { BlankOrderManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/blankOrderManageOrders12Page";
import {
  createOrderManageOrders19Options,
  ManageOrders19Page,
} from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page";
import { ManageOrders20Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders20Page";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page";
import { ManageOrders30Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders30Page";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
  c100CaseWorkerActions: c100CaseWorkerActions;
  createOrderFL401Options: createOrderFL401Options;
  yesNoManageOrders: boolean;
  judgeTitles: judgeTitles;
  withOrWithoutNotice: boolean;
  createOrderManageOrders19Options: createOrderManageOrders19Options;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
  browser: Browser;
}

interface JudgeDACaseProgressionJourneyParams {
  browser: Browser;
  ccdRef: string;
  accessibilityTest: boolean;
  c100CaseWorkerActions: c100CaseWorkerActions;
  createOrderFL401Options: createOrderFL401Options;
  judgeTitles: judgeTitles;
  yesNoManageOrders: boolean;
  withOrWithoutNotice: boolean;
  createOrderManageOrders19Options: createOrderManageOrders19Options;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
}

export class ApplicationJourneysCheckGatekeeperJudgeMOOrder {
  public static async checkApplication({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
    ccdRef,
    c100CaseWorkerActions,
    createOrderFL401Options,
    yesNoManageOrders,
    judgeTitles,
    withOrWithoutNotice,
    createOrderManageOrders19Options,
    howLongWillOrderBeInForce,
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
      createOrderFL401Options,
      yesNoManageOrders,
      judgeTitles,
      withOrWithoutNotice,
      createOrderManageOrders19Options,
      howLongWillOrderBeInForce,
    });
    await page.waitForTimeout(5000);
  }

  private static async JudgeDACaseProgressionJourney({
    browser,
    ccdRef,
    accessibilityTest,
    c100CaseWorkerActions,
    createOrderFL401Options,
    yesNoManageOrders,
    judgeTitles,
    withOrWithoutNotice,
    createOrderManageOrders19Options,
    howLongWillOrderBeInForce,
  }: JudgeDACaseProgressionJourneyParams): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(browser, "judge");
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await this.waitForManageOrderSelectOptionToBeVisible(page);
    await Helpers.chooseEventFromDropdown(page, c100CaseWorkerActions);
    await ManageOrders1Page.manageOrders1Page({
      page,
      accessibilityTest,
    });
    await ManageOrders2Page.manageOrders2Page({
      page,
      accessibilityTest,
      createOrderFL401Options,
    });
    await ManageOrders5Page.manageOrders5Page({
      page,
      accessibilityTest,
      yesNoManageOrders,
      createOrderFL401Options,
      judgeTitles: judgeTitles,
    });
    switch (createOrderFL401Options) {
      case "power of arrest":
        await PowerOfArrestManageOrders12Page.powerOfArrestManageOrders12Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
        });
        await ManageOrders20Page.manageOrders20Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
          createOrderFL401Options,
          howLongWillOrderBeInForce,
        });
        await ManageOrders30Page.manageOrders30Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
        });
        break;
      case "occupation order":
        await OccupationOrderManageOrders12Page.occupationOrderManageOrders12Page(
          {
            page,
            accessibilityTest,
            yesNoManageOrders,
            withOrWithoutNotice,
          },
        );
        await ManageOrders19Page.manageOrders19Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
          createOrderManageOrders19Options,
          createOrderFL401Options,
        });
        await ManageOrders20Page.manageOrders20Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
          createOrderFL401Options,
          howLongWillOrderBeInForce,
        });
        await ManageOrders30Page.manageOrders30Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
        });
        break;
      case "amend discharge varied order":
        await AmendDischargeVariedManageOrders12Page.amendDischargeVariedManageOrders12Page(
          {
            page,
            accessibilityTest,
          },
        );
        await ManageOrders19Page.manageOrders19Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
          createOrderManageOrders19Options,
          createOrderFL401Options,
        });
        await ManageOrders20Page.manageOrders20Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
          createOrderFL401Options,
          howLongWillOrderBeInForce,
        });
        await ManageOrders30Page.manageOrders30Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
        });
        break;
      case "blank order":
        await BlankOrderManageOrders12Page.BlankOrderManageOrders12Page({
          page,
          accessibilityTest,
        });
        await ManageOrders19Page.manageOrders19Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
          createOrderManageOrders19Options,
          createOrderFL401Options,
        });
        await ManageOrders20Page.manageOrders20Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
          createOrderFL401Options,
          howLongWillOrderBeInForce,
        });
        await ManageOrders30Page.manageOrders30Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
        });
        break;
      case "general form of undertaking":
        // manageOrders6Page
        await ManageOrders20Page.manageOrders20Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
          createOrderFL401Options,
          howLongWillOrderBeInForce,
        });
        await ManageOrders30Page.manageOrders30Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
        });
        break;
      case "notice of proceedings":
        await ManageOrders19Page.manageOrders19Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
          createOrderManageOrders19Options,
          createOrderFL401Options,
        });
        await ManageOrders20Page.manageOrders20Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
          createOrderFL401Options,
          howLongWillOrderBeInForce,
        });
        await ManageOrders30Page.manageOrders30Page({
          page,
          accessibilityTest,
          yesNoManageOrders,
        });
        break;
    }
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
