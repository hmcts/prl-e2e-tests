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
      .locator(Selectors.NotificationBannerTitle, {
        hasText: ApplicantDashboardContent.notificationBannerTitle,
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
        `${Selectors.GovukHeadingXL}:text-is("${ApplicantDashboardContent.govukHeadingXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerHeading}:text-is("${ApplicantDashboardContent.notificationBannerHeading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotoficationBannerLink}:text-is("${ApplicantDashboardContent.notoficationBannerLink}")`,
        1,
      ),
      Helpers.checkGroup(page, 3, ApplicantDashboardContent, "p", Selectors.p),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ApplicantDashboardContent.p4}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ApplicantDashboardContent.strong}")`,
        1,
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
