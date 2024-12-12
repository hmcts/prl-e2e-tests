import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors.ts";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper.ts";
import { ApplicantDashboardContent } from "../../fixtures/ApplicantDashboardContent.ts";
import { Helpers } from "../../common/helpers.ts";

export class ApplicantDashboardPage {
  public static async applicantDashboardPage(
    page: Page,
    caseRef: string,
    isApplicant: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseRef, isApplicant, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    caseRef: string,
    isApplicant: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.NotificationBannerTitle, {
        hasText: ApplicantDashboardContent.notificationBannerTitle,
      })
      .waitFor();
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.p}:text-is("Case number ${caseRef}")`,
      1,
    );
    if (isApplicant) {
      await this.checkApplicantDashboard(page);
    } else {
      await this.checkRespondentDashboard(page);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkApplicantDashboard(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${ApplicantDashboardContent.applicantGovukHeadingXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerHeading}:text-is("${ApplicantDashboardContent.applicantNotificationBannerHeading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotoficationBannerLink}:text-is("${ApplicantDashboardContent.applicantNotoficationBannerLink}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ApplicantDashboardContent,
        "applicantP",
        Selectors.p,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ApplicantDashboardContent.applicantP4}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ApplicantDashboardContent.applicantStrong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ApplicantDashboardContent,
        "applicantH2",
        Selectors.h2,
      ),
    ]);
  }

  private static async checkRespondentDashboard(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingXL}:text-is("${ApplicantDashboardContent.respondentGovukHeadingXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerHeading}:text-is("${ApplicantDashboardContent.respondentNotificationBannerHeading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotoficationBannerLink}:text-is("${ApplicantDashboardContent.respondentNotoficationBannerLink}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ApplicantDashboardContent,
        "respondentP",
        Selectors.p,
      ),
      Helpers.checkGroup(
        page,
        5,
        ApplicantDashboardContent,
        "respondentH2",
        Selectors.h2,
      ),
    ]);
  }
}
