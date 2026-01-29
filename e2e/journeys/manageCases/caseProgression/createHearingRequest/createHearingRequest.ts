import { Browser, BrowserContext, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { HearingRequirementsPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingRequirementsPage.ts";
import { HearingFacilitiesPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingFacilitiesPage.ts";
import { HearingStagePage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingStagePage.ts";
import { HearingAttendancePage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingAttendancePage.ts";
import { HearingVenuePage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingVenuePage.ts";
import { HearingWelshPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingWelshPage.ts";
import { HearingJudgePage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingJudgePage.ts";
import { HearingTimingPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingTimingPage.ts";
import { HearingLinkPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingLinkPage.ts";
import { HearingAdditionalInstructionsPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingAdditionalInstructionsPage.ts";
import { HearingCreateEditSummaryPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingCreateEditSummaryPage.ts";
import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import {
  createOrderC100Options,
  createOrderFL401Options,
} from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";
import { completeCheckApplicationAndSendToGatekeeperAndCreateAnOrder } from "../../../../common/caseHelpers/caseEventsHelper.ts";
import { HearingConfirmationPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingConfirmationPage.ts";
import { CompleteTheOrder } from "../completeTheOrder/completeTheOrder.js";

interface FL401CreateHearingRequestParams {
  page: Page;
  accessibilityTest: boolean;
  createOrderFL401Options: createOrderFL401Options;
  ccdRef: string;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
}

interface C100CreateHearingRequestParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  createOrderC100Options: createOrderC100Options;
}

export class CreateHearingRequest {
  public static async FL401CreateHearingRequest({
    page,
    accessibilityTest,
    ccdRef,
    browser,
    manageOrderData,
  }: FL401CreateHearingRequestParams): Promise<void> {
    await completeCheckApplicationAndSendToGatekeeperAndCreateAnOrder(
      page,
      browser,
      ccdRef,
      manageOrderData,
    );
    // open new browser and sign in as court admin user
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + "caseWorker.json",
    });
    page = await newContext.newPage();
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    // rather than waiting for the task just go directly to the hearings tab and request a hearing
    // for some reason clicking on the task as part of the test causes an error but not when done manually
    await page.getByRole("tab", { name: "Hearings" }).click();
    // wait for ref data to finish loading before clicking the hearing request button - if it clicks too fast the hearing requirements page fails to load
    await page.waitForResponse(
      (response) =>
        /.*\/api\/prd\/lov\/getLovRefData.*/.test(response.url()) &&
        response.status() === 200,
    );
    await this.requestAHearing(page, accessibilityTest);
  }

  public static async C100CreateHearingRequest({
    page,
    accessibilityTest,
    ccdRef,
  }: C100CreateHearingRequestParams): Promise<void> {
    //C43 order can be created using page eval but throwing 403, need to debug
    await CompleteTheOrder.C100completeTheOrder({
      page: page,
      accessibilityTest: false,
      personallyServed: true,
      solicitorCaseCreateType: "C100",
      isUploadOrder: false,
      checkOption: "noCheck", //options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
      serveOrderNow: true, //select to serve order instantly
      applicationSubmittedBy: "Solicitor",
    });

    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    // rather than waiting for the task just go directly to the hearings tab and request a hearing
    // for some reason clicking on the task as part of the test causes an error but not when done manually
    await page.getByRole("tab", { name: "Hearings" }).click();
    // wait for ref data to finish loading before clicking the hearing request button - if it clicks too fast the hearing requirements page fails to load
    await page.waitForResponse(
      (response) =>
        /.*\/api\/prd\/lov\/getLovRefData.*/.test(response.url()) &&
        response.status() === 200,
    );
    await this.requestAHearing(page, accessibilityTest);
  }

  public static async requestAHearing(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.click(
      `${Selectors.a}:text-is("${CommonStaticText.hearingRequest}")`,
    );
    await HearingRequirementsPage.hearingRequirementsPage(
      page,
      accessibilityTest,
    );
    await HearingFacilitiesPage.hearingFacilitiesPage(page, accessibilityTest);
    await HearingStagePage.hearingStagePage(page, accessibilityTest);
    await HearingAttendancePage.hearingAttendancePage(page, accessibilityTest);
    await HearingVenuePage.hearingVenuePage(page, accessibilityTest);
    await HearingWelshPage.hearingWelshPage(page, accessibilityTest);
    await HearingJudgePage.hearingJudgePage(page, accessibilityTest);
    await HearingTimingPage.hearingTimingPage(page, accessibilityTest);
    await HearingLinkPage.hearingLinkPage(page, accessibilityTest);
    await HearingAdditionalInstructionsPage.hearingAdditionalInstructionsPage(
      page,
      accessibilityTest,
    );
    await HearingCreateEditSummaryPage.hearingCreateEditSummaryPage(
      page,
      accessibilityTest,
    );
    await HearingConfirmationPage.hearingConfirmationPage(
      page,
      accessibilityTest,
    );
  }
}
