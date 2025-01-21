import { Browser, BrowserContext, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { HearingRequirementsPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingRequirementsPage";
import { HearingFacilitiesPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingFacilitiesPage";
import { HearingStagePage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingStagePage";
import { HearingAttendancePage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingAttendancePage";
import { HearingVenuePage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingVenuePage";
import { HearingWelshPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingWelshPage";
import { HearingJudgePage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingJudgePage";
import { HearingTimingPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingTimingPage";
import { HearingLinkPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingLinkPage";
import { HearingAdditionalInstructionsPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingAdditionalInstructionsPage";
import { HearingCreateEditSummaryPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingCreateEditSummaryPage";
import Config from "../../../../config";
import config from "../../../../config";
import { createOrderFL401Options } from "../../../../common/types";
import { Selectors } from "../../../../common/selectors.ts";
import { ApplicationJourneysCheckGatekeeperJudgeCOOrder } from "../createACaseUpToServiceOfApplicationState/application-journeys-check-gatekeeper-judgeCO-order.ts";
import { jsonDatas } from "../../../../common/solicitorCaseCreatorHelper.ts";

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
    await ApplicationJourneysCheckGatekeeperJudgeCOOrder.applicationJourneysCheckGatekeeperJudgeCOOrder(
      {
        page,
        ccdRef,
        browser,
        manageOrderData,
      },
    );
    // open new browser and sign in as court admin user
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + "caseWorker.json",
    });
    page = await newContext.newPage();
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
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
    await page.waitForTimeout(1000);
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
  }
}
