import { Browser, Page } from "@playwright/test";
import {
  createOrderFL401Options,
  judgeTitles,
  manageOrdersOptions,
  solicitorCaseCreateType,
  uploadOrderFL401Options,
  WACaseWorkerActions,
} from "../../../../common/types.ts";
import {
  createOrderManageOrders19Options,
  ManageOrders19Page,
} from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/manageOrders19Page.ts";
import { howLongWillOrderBeInForce } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/manageOrders12Page.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { ManageOrders1Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/manageOrders1Page.ts";
import { ManageOrders2Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/manageOrders2Page.ts";
import { CreateOrderManageOrders5Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/createOrderManageOrders5Page.ts";
import { PowerOfArrestManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/powerOfArrestManageOrders12Page.ts";
import { ManageOrders20Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/manageOrders20Page.ts";
import { ManageOrders30Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/manageOrders30Page.ts";
import { judgeCreateODAManageOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/judge/judgeCreateOrder/judgeCreateOrderDASubmitPage.ts";
import { OccupationOrderManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/occupationOrderManageOrders12Page.ts";
import { AmendDischargeVariedManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/amendDischargeVariedManageOrders12Page.ts";
import { BlankOrderManageOrders12Page } from "../../../../pages/manageCases/caseProgression/judge/individualManageOrders12/blankOrderManageOrders12Page.ts";
import { ManageOrders3Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/manageOrders3Page.ts";
import { UploadOrderManageOrders5Page } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderDA/uploadOrderManageOrders5Page.ts";
import { judgeCreateUOManageOrderSubmitPage } from "../../../../pages/manageCases/caseProgression/judge/judgeUploadOrder/judgeUploadOrderDASubmitPage.ts";
import { completeCheckApplicationAndSendToGatekeeper } from "../../../../common/caseHelpers/caseEventsHelper.ts";

interface JudgeDACaseProgressionJourneyParams {
  page: Page;
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
  solicitorCaseCreateType: solicitorCaseCreateType;
}

interface JudgeUOCaseProgressionJourneyParams {
  page: Page;
  browser: Browser;
  ccdRef: string;
  accessibilityTest: boolean;
  c100CaseWorkerActions: WACaseWorkerActions;
  yesNoManageOrders: boolean;
  uploadOrderFL401Options: uploadOrderFL401Options;
  manageOrdersOptions: manageOrdersOptions;
  solicitorCaseCreateType: solicitorCaseCreateType;
}

export class JudgeManageOrderJourney {
  public static async JudgeCreateOrderCaseProgressionJourney({
    page,
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
    await completeCheckApplicationAndSendToGatekeeper(page, ccdRef);
    page = await Helpers.openNewBrowserWindow(browser, "judge");
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
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
    console.log("wait");
  }

  public static async JudgeUploadOrderCaseProgressionJourney({
    page,
    browser,
    ccdRef,
    accessibilityTest,
    c100CaseWorkerActions,
    yesNoManageOrders,
    uploadOrderFL401Options,
    manageOrdersOptions,
    solicitorCaseCreateType,
  }: JudgeUOCaseProgressionJourneyParams): Promise<void> {
    await completeCheckApplicationAndSendToGatekeeper(page, ccdRef);
    page = await Helpers.openNewBrowserWindow(browser, "judge");
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
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
      solicitorCaseCreateType,
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
