import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamValidReasonContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamValidReasonContent";
import { Helpers } from "../../../../../common/helpers";
import AxeTest from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface MiamValidReasonPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  MIAMValidReasonNoAttendance: boolean;
}

enum uniqueSelectors {
  validReasonYes = "#miam_validReason",
  validReasonNo = "#miam_validReason-2",
}

export class MiamValidReasonPage {
  public static async miamValidReasonPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    MIAMValidReasonNoAttendance: MIAMValidReasonNoAttendance,
  }: MiamValidReasonPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      MIAMValidReasonNoAttendance: MIAMValidReasonNoAttendance,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MiamValidReasonPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamValidReasonContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyL}:has-text("${MiamValidReasonContent.govukBodyL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        MiamValidReasonContent,
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
  }: Partial<MiamValidReasonPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${MiamValidReasonContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${MiamValidReasonContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    MIAMValidReasonNoAttendance: MIAMValidReasonNoAttendance,
  }: Partial<MiamValidReasonPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (MIAMValidReasonNoAttendance) {
      await page.click(uniqueSelectors.validReasonYes);
    } else {
      await page.click(uniqueSelectors.validReasonNo);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`,
    );
  }
}
