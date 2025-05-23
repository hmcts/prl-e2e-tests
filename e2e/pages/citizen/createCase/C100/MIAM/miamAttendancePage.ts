import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamAttendanceContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamAttendanceContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { AxeUtils } from "@hmcts/playwright-common";

interface AttendancePageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  miamAlreadyAttended: boolean;
}

enum uniqueSelectors {
  miamAttendedYes = "#miam_attendance",
  miamAttendedNo = "#miam_attendance-2",
}

export class MiamAttendancePage {
  public static async attendancePage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    miamAlreadyAttended: miamAlreadyAttended,
  }: AttendancePageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      miamAlreadyAttended: miamAlreadyAttended,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<AttendancePageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${MiamAttendanceContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${MiamAttendanceContent.bodyM}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        MiamAttendanceContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<AttendancePageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Missing the page object.");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${MiamAttendanceContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${MiamAttendanceContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    miamAlreadyAttended: miamAlreadyAttended,
  }: Partial<AttendancePageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page object not initialised.");
    }
    if (miamAlreadyAttended) {
      await page.click(`${uniqueSelectors.miamAttendedYes}`);
    } else {
      await page.click(`${uniqueSelectors.miamAttendedNo}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
