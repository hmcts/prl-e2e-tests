import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { Helpers } from "../../../common/helpers.ts";
import { ApplicantDashboardContent } from "../../../fixtures/citizen/activateCase/applicantDashboardContent.ts";
import { applicationSubmittedBy } from "../../../common/types.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { DateHelperUtils } from "../../../utils/dateHelpers.utils.js";

export class ApplicantDashboardPage {
  public static async applicantDashboardPage(
    page: Page,
    caseRef: string,
    accessibilityTest: boolean,
    applicationSubmittedBy: applicationSubmittedBy,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      caseRef,
      accessibilityTest,
      applicationSubmittedBy,
    );
  }

  private static async checkPageLoads(
    page: Page,
    caseRef: string,
    accessibilityTest: boolean,
    applicationSubmittedBy: applicationSubmittedBy,
  ): Promise<void> {
    const heading =
      applicationSubmittedBy == "Solicitor"
        ? ApplicantDashboardContent.solicitorApplicationGovukHeadingXL
        : ApplicantDashboardContent.govukHeadingXL;
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: heading,
      })
      .waitFor();
    if (applicationSubmittedBy === "Citizen") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerHeading}:text-is("${ApplicantDashboardContent.applicationNotificationBannerHeading}")`,
        1,
      );
      await Helpers.checkGroup(
        page,
        2,
        ApplicantDashboardContent,
        "applicationP",
        Selectors.p,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerLink}:text-is("${ApplicantDashboardContent.applicationPackLink}")`,
        1,
      );

      //cafcass
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerHeading}:text-is("${ApplicantDashboardContent.cafcassNotificationBannerHeading}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ApplicantDashboardContent.cafcassP1}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerLink}:text-is("${ApplicantDashboardContent.cafcassLink}")`,
        1,
      );
    }

    const dateUtils: DateHelperUtils = new DateHelperUtils();
    const orderDateP: string = `Order made date - ${dateUtils.todayDate(false, false, true)}`;
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("Case number ${caseRef}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerTitle}:text-is("${ApplicantDashboardContent.notificationBannerTitle}")`,
        applicationSubmittedBy == "Solicitor" ? 1 : 2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerHeading}:text-is("${ApplicantDashboardContent.orderNotificationBannerHeading}")`,
        1,
      ),
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerLink}:text-is("${ApplicantDashboardContent.orderLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ApplicantDashboardContent.orderP1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${orderDateP}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ApplicantDashboardContent.commonP}")`,
        applicationSubmittedBy == "Solicitor" ? 1 : 2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ApplicantDashboardContent.strong}")`,
        applicationSubmittedBy == "Solicitor" ? 1 : 2,
      ),
      Helpers.checkGroup(
        page,
        6,
        ApplicantDashboardContent,
        "h2",
        Selectors.h2,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
