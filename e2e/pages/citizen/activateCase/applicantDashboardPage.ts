import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../common/helpers.ts";
import { ApplicantDashboardContent } from "../../../fixtures/citizen/activateCase/applicantDashboardContent.ts";

export class ApplicantDashboardPage {
  public static async applicantDashboardPage(
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
        hasText: ApplicantDashboardContent.govukHeadingXL,
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
        `${Selectors.NotificationBannerTitle}:text-is("${ApplicantDashboardContent.notificationBannerTitle}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        2,
        ApplicantDashboardContent,
        "notificationBannerHeading",
        Selectors.NotificationBannerHeading,
      ),
      Helpers.checkGroup(
        page,
        2,
        ApplicantDashboardContent,
        "notificationBannerLink",
        Selectors.NotoficationBannerLink,
      ),
      Helpers.checkGroup(page, 5, ApplicantDashboardContent, "p", Selectors.p),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ApplicantDashboardContent.p6}"):visible`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ApplicantDashboardContent.strong}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        5,
        ApplicantDashboardContent,
        "h2",
        Selectors.h2,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
