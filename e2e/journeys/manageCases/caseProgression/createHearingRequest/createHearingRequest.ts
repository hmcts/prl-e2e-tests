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
import { createOrderFL401Options } from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { jsonDatas } from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";
import { completeCheckApplicationAndSendToGatekeeperAndCreateAnOrder } from "../../../../common/caseHelpers/caseEventsHelper.ts";
import { HearingConfirmationPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingConfirmationPage.ts";

interface CreateHearingRequestParams {
  page: Page;
  accessibilityTest: boolean;
  createOrderFL401Options: createOrderFL401Options;
  ccdRef: string;
  browser: Browser;
  manageOrderData: typeof jsonDatas;
}

export class CreateHearingRequest {
  public static async createHearingRequest({
    page,
    accessibilityTest,
    ccdRef,
    createOrderFL401Options,
    browser,
    manageOrderData,
  }: CreateHearingRequestParams): Promise<void> {
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
    switch (createOrderFL401Options) {
      case "non-molestation":
        await Helpers.assignTaskToMeAndTriggerNextSteps(
          page,
          "Create Hearing Request - Non-molestation order (FL404A)",
          "Create Hearing Request",
        );
        break;
      case "occupation order":
        await Helpers.assignTaskToMeAndTriggerNextSteps(
          page,
          "Create Hearing Request - Occupation order (FL404)",
          "Create Hearing Request",
        );
        break;
      case "power of arrest":
        await Helpers.assignTaskToMeAndTriggerNextSteps(
          page,
          "Create Hearing Request - Power of arrest (FL406)",
          "Create Hearing Request",
        );
        break;
      case "amend discharge varied order":
        await Helpers.assignTaskToMeAndTriggerNextSteps(
          page,
          "Create Hearing Request - Amended, discharged or varied order (FL404B)",
          "Create Hearing Request",
        );
        break;
      case "blank order":
        await Helpers.assignTaskToMeAndTriggerNextSteps(
          page,
          "Create Hearing Request - Blank order (FL404B)",
          "Create Hearing Request",
        );
        break;
      case "notice of proceedings":
        await Helpers.assignTaskToMeAndTriggerNextSteps(
          page,
          "Create Hearing Request - Notice of proceedings (FL402)",
          "Create Hearing Request",
        );
        break;
    }
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
