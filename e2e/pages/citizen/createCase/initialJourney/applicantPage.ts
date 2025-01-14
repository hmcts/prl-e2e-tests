import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors";
import { ApplicantContent } from "../../../../fixtures/citizen/initialJourney/applicantContent";
import { Helpers } from "../../../../common/helpers";

interface ApplicantPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ApplicantPage {
  public static async applicantPage({
    page,
    accessibilityTest,
  }: ApplicantPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.startApplication(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.NotificationBannerTitle}:text-is("${ApplicantContent.notificationBannerTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.NotificationBannerHeading}:text-is("${ApplicantContent.notificationBannerHeading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${ApplicantContent.body}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ApplicantContent.strong}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${ApplicantContent.headingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ApplicantContent.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        ApplicantContent,
        "link",
        `${Selectors.GovukLink}`,
      ),
    ]);
    // await page.click(
    //   `${Selectors.GovukSummaryText}:text-is("${ApplicantContent.detailsSummaryText}")`,
    // );
    // await Promise.all([
    //   // Helpers.checkGroup(
    //   //   page,
    //   //   5,
    //   //   ApplicantContent,
    //   //   "detailsBody",
    //   //   `${Selectors.GovukBody}`,
    //   // ),
    //   // Helpers.checkGroup(
    //   //   page,
    //   //   2,
    //   //   ApplicantContent,
    //   //   "detailsLink",
    //   //   `${Selectors.GovukLink}`,
    //   // ),
    // ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async startApplication(page: Page): Promise<void> {
    await page.click(
      `${Selectors.NotoficationBannerLink}:text-is("${ApplicantContent.startApplication}")`,
    );
  }
}
