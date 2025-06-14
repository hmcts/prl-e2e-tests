import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { MiamPreviousAttendanceContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamPreviousAttendanceContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface MiamPreviousAttendancePageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  miamAttendanceType: MiamAttendanceType;
}

export type MiamAttendanceType =
  | "Previous 4 months"
  | "Application made in existing proceedings"
  | "None of these";

enum uniqueSelectors {
  last4Months = "#miam_previousAttendance",
  existingProceedings = "#miam_previousAttendance-2",
  noneOfThese = "#miam_previousAttendance-4",
}

export class MiamPreviousAttendancePage {
  public static async miamPreviousAttendancePage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    miamAttendanceType: miamAttendanceType,
  }: MiamPreviousAttendancePageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      miamAttendanceType: miamAttendanceType,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MiamPreviousAttendancePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamPreviousAttendanceContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${MiamPreviousAttendanceContent.govukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${MiamPreviousAttendanceContent.govukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        MiamPreviousAttendanceContent,
        `govukLabel`,
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        MiamPreviousAttendanceContent,
        `govukHint`,
        `${Selectors.GovukHint}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<MiamPreviousAttendancePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
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
        `${Selectors.a}:text-is("${MiamPreviousAttendanceContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${MiamPreviousAttendanceContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    miamAttendanceType: miamAttendanceType,
  }: Partial<MiamPreviousAttendancePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    switch (miamAttendanceType) {
      case "Previous 4 months":
        await page.click(uniqueSelectors.last4Months);
        break;
      case "Application made in existing proceedings":
        await page.click(uniqueSelectors.existingProceedings);
        break;
      default:
        await page.click(uniqueSelectors.noneOfThese);
        break;
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
