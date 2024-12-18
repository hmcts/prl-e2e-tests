import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors";
import { HearingTimingContent } from "../../../../fixtures/manageCases/caseProgression/createHearingRequest/hearingTimingContent";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";

enum UniqueSelectors {
  specificDateNo = "#noSpecificDate",
  specificDateYes = "#hearingSingleDate",
  specificDateRange = "#hearingDateRange",
  priorityStandard = "#Standard",
  priorityUrgent = "#Urgent",
  days = "#durationdays",
  hours = "#durationhours",
  mins = "#durationmins"
}

export class HearingTimingPage {
  public static async hearingTimingPage(
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
        hasText: `${HearingTimingContent.govUkHeadingL}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetHeading}:text-is("${HearingTimingContent.GovukFieldsetHeading1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetHeading}:text-is("${HearingTimingContent.GovukFieldsetHeading2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetHeading}:text-is("${HearingTimingContent.GovukFieldsetHeading3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${HearingTimingContent.GovukHint}")`,
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
    await page.fill(`${UniqueSelectors.days}`, HearingTimingContent.days);
    await page.fill(`${UniqueSelectors.hours}`, HearingTimingContent.hours);
    await page.fill(`${UniqueSelectors.mins}`, HearingTimingContent.mins);
    await page.check(`${UniqueSelectors.specificDateNo}`);
    await page.check(`${UniqueSelectors.priorityStandard}`);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
