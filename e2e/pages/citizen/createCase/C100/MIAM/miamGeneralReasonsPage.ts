import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamGeneralReasonsContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamGeneralReasonsContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface MiamGeneralReasonsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  miamGeneralExemptions: boolean;
}

enum uniqueSelectors {
  domesticAbuseReason = "#miam_nonAttendanceReasons",
  childProtectionConcernReason = "#miam_nonAttendanceReasons-2",
  urgencyReason = "#miam_nonAttendanceReasons-3",
  previousAttendanceReason = "#miam_nonAttendanceReasons-4",
  otherReason = "#miam_nonAttendanceReasons-5",
  noneOfTheseReason = "#miam_nonAttendanceReasons-7",
}

export class MiamGeneralReasonsPage {
  public static async miamGeneralReasonsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    miamGeneralExemptions: miamGeneralExemptions,
  }: MiamGeneralReasonsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      miamGeneralExemptions: miamGeneralExemptions,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MiamGeneralReasonsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamGeneralReasonsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${MiamGeneralReasonsContent.govukBody}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${MiamGeneralReasonsContent.govukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${MiamGeneralReasonsContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        MiamGeneralReasonsContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCheckboxesDivider}:text-is("${MiamGeneralReasonsContent.govukCheckboxesDivider}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<MiamGeneralReasonsPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${MiamGeneralReasonsContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${MiamGeneralReasonsContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    miamGeneralExemptions: miamGeneralExemptions,
  }: Partial<MiamGeneralReasonsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    const selectorsArray: uniqueSelectors[] = Object.values(
      uniqueSelectors,
    ).slice(0, -1);
    for (const selector of selectorsArray) {
      await page.click(selector);
    }
    if (!miamGeneralExemptions) {
      await page.click(uniqueSelectors.noneOfTheseReason);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
