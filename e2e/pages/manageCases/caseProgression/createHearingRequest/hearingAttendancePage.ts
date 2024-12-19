import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors";
import { HearingAttendanceContent } from "../../../../fixtures/manageCases/caseProgression/createHearingRequest/hearingAttendanceContent";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";

enum UniqueSelectors {
  paperHearingYes = "#paperHearingYes",
  paperHearingNo = "#paperHearingNo",
  attendanceInPerson = "#INTER",
  applicantAttend = "#partyChannel0",
  respondentAttend = "#partyChannel1",
  attendanceNumber = "#attendance-number",
}

export class HearingAttendancePage {
  public static async hearingAttendancePage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukHeadingL}`, {
        hasText: `${HearingAttendanceContent.govUkHeadingL}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${HearingAttendanceContent.GovukInsetText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetHeading}:text-is("${HearingAttendanceContent.GovukFieldsetHeading1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetHeading}:text-is("${HearingAttendanceContent.GovukFieldsetHeading2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${HearingAttendanceContent.GovukLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${HearingAttendanceContent.GovukLabel2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${HearingAttendanceContent.GovukHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.check(`${UniqueSelectors.paperHearingNo}`);
    await page.check(`${UniqueSelectors.attendanceInPerson}`);
    await page.selectOption(`${UniqueSelectors.applicantAttend}`, HearingAttendanceContent.attendOption);
    await page.selectOption(`${UniqueSelectors.respondentAttend}`, HearingAttendanceContent.attendOption);
    await page.fill(`${UniqueSelectors.attendanceNumber}`, HearingAttendanceContent.numberOfPeople);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
