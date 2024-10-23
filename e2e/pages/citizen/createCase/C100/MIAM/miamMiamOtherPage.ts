import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamMiamOtherContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamMiamOtherContent";
import { Helpers } from "../../../../../common/helpers";
import AxeTest from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface MiamMiamOtherPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  miamOtherReasonForNotAttending: MiamOtherReasonForNotAttending;
}

export type MiamOtherReasonForNotAttending =
  | "Applying for without notice"
  | "Under 18"
  | "Cannot access mediator"
  | "None of the above";

enum uniqueSelectors {
  withoutNotice = "#miam_notAttendingReasons",
  under18 = "#miam_notAttendingReasons-2",
  noAccess = "#miam_notAttendingReasons-3",
  noneOfThese = "#miam_notAttendingReasons-5",
}

export class MiamMiamOtherPage {
  public static async miamMiamOtherPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
  }: MiamMiamOtherPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MiamMiamOtherPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamMiamOtherContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${MiamMiamOtherContent.govukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingM}:text-is("${MiamMiamOtherContent.govukHeadingM}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${MiamMiamOtherContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        MiamMiamOtherContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await AxeTest.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<MiamMiamOtherPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${MiamMiamOtherContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${MiamMiamOtherContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
  }: Partial<MiamMiamOtherPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    switch (miamOtherReasonForNotAttending) {
      case "Applying for without notice":
        await page.click(uniqueSelectors.withoutNotice);
        break;
      case "Under 18":
        await page.click(uniqueSelectors.under18);
        break;
      case "Cannot access mediator":
        await page.click(uniqueSelectors.noAccess);
        break;
      default:
        await page.click(uniqueSelectors.noneOfThese);
        break;
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
