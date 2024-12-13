import { Browser, Page } from "@playwright/test";
import {
  WACaseWorkerActions,
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  uploadOrderFL401Options,
} from "../../../../common/types";
import {
  createOrderManageOrders19Options,
  ManageOrders19Page,
} from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Page";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12Page";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { ManageOrders1Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Page";
import { ManageOrders2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders2Page";
import { CreateOrderManageOrders5Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/createOrderManageOrders5Page";
import { PowerOfArrestManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/powerOfArrestManageOrders12Page";
import { ManageOrders20Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders20Page";
import { ManageOrders30Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders30Page";
import { judgeCreateODAManageOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/judge/judgeCreateOrder/judgeCreateOrderDASubmitPage";
import { OccupationOrderManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/occupationOrderManageOrders12Page";
import { AmendDischargeVariedManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/amendDischargeVariedManageOrders12Page";
import { BlankOrderManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/blankOrderManageOrders12Page";
import { ManageOrders3Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders3Page";
import { UploadOrderManageOrders5Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/OrderDA/uploadOrderManageOrders5Page";
import { judgeCreateUOManageOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/judge/judgeUploadOrder/judgeUploadOrderDASubmitPage";

interface JudgeDACaseProgressionJourneyParams {
  browser: Browser;
  ccdRef: string;
  accessibilityTest: boolean;
  c100CaseWorkerActions: WACaseWorkerActions;
  createOrderFL401Options: createOrderFL401Options;
  judgeTitles: judgeTitles;
  yesNoManageOrders: boolean;
  withOrWithoutNotice: boolean;
  createOrderManageOrders19Options: createOrderManageOrders19Options;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
  manageOrdersOptions: manageOrdersOptions;
}

interface JudgeUOCaseProgressionJourneyParams {
  browser: Browser;
  ccdRef: string;
  accessibilityTest: boolean;
  c100CaseWorkerActions: WACaseWorkerActions;
  yesNoManageOrders: boolean;
  uploadOrderFL401Options: uploadOrderFL401Options;
  manageOrdersOptions: manageOrdersOptions;
}

export class JudgeManageOrderJourney {
  public static async JudgeCreateOrderCaseProgressionJourney({
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
    manageOrdersOptions,
  }: JudgeDACaseProgressionJourneyParams): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(browser, "judge");
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await Helpers.waitForTask(page, "Directions on Issue");
    await Helpers.chooseEventFromDropdown(page, c100CaseWorkerActions);
    await ManageOrders1Page.manageOrders1Page({
      page,
      accessibilityTest,
      manageOrdersOptions,
    });
    await ManageOrders2Page.manageOrders2Page({
      page,
      accessibilityTest,
      createOrderFL401Options,
    });
    await CreateOrderManageOrders5Page.manageOrders5Page({
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
        await judgeCreateODAManageOrderSubmitPage.judgeDAManageOrderSubmitPage({
          page,
          accessibilityTest,
          createOrderFL401Options,
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
        await judgeCreateODAManageOrderSubmitPage.judgeDAManageOrderSubmitPage({
          page,
          accessibilityTest,
          createOrderFL401Options,
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
        await judgeCreateODAManageOrderSubmitPage.judgeDAManageOrderSubmitPage({
          page,
          accessibilityTest,
          createOrderFL401Options,
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
        await judgeCreateODAManageOrderSubmitPage.judgeDAManageOrderSubmitPage({
          page,
          accessibilityTest,
          createOrderFL401Options,
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
        await judgeCreateODAManageOrderSubmitPage.judgeDAManageOrderSubmitPage({
          page,
          accessibilityTest,
          createOrderFL401Options,
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
        await judgeCreateODAManageOrderSubmitPage.judgeDAManageOrderSubmitPage({
          page,
          accessibilityTest,
          createOrderFL401Options,
        });
        break;
    }
  }

  public static async JudgeUploadOrderCaseProgressionJourney({
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
    await Helpers.waitForTask(page, "Directions on Issue");
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
    });
    await judgeCreateUOManageOrderSubmitPage.judgeUOManageOrderSubmitPage({
      page,
      accessibilityTest,
      uploadOrderFL401Options,
    });
  }
}
