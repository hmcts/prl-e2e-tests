import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { Helpers } from "../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper.ts";
import { RespondentDashboardContent } from "../../../fixtures/citizen/activateCase/respondentDashboardContent.ts";

export class RespondentDashboardPage {
  public static async respondentDashboardPage(
    page: Page,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseRef, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    caseRef: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: RespondentDashboardContent.govukHeadingXL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("Case number ${caseRef}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerTitle}:text-is("${RespondentDashboardContent.notificationBannerTitle}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerHeading}:text-is("${RespondentDashboardContent.notificationBannerHeading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotoficationBannerLink}:text-is("${RespondentDashboardContent.notificationBannerLink}")`,
        1,
      ),
      Helpers.checkGroup(page, 2, RespondentDashboardContent, "p", Selectors.p),
      Helpers.checkGroup(
        page,
        5,
        RespondentDashboardContent,
        "h2",
        Selectors.h2,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}