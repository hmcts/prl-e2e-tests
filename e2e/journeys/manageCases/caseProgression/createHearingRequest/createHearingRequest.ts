import { Page } from "@playwright/test";
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
import { Selectors } from "../../../../common/selectors.ts";
import { HearingConfirmationPage } from "../../../../pages/manageCases/caseProgression/createHearingRequest/hearingConfirmationPage.ts";

interface FL401CreateHearingRequestParams {
  page: Page;
  accessibilityTest: boolean;
}

interface C100CreateHearingRequestParams {
  page: Page;
  accessibilityTest: boolean;
}

export class CreateHearingRequest {
  public static async FL401CreateHearingRequest({
    page,
    accessibilityTest,
  }: FL401CreateHearingRequestParams): Promise<void> {
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
  }: C100CreateHearingRequestParams): Promise<void> {
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
