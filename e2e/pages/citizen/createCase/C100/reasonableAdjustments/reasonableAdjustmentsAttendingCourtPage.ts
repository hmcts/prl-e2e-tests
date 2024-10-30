import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ReasonableAdjustmentsAttendingCourtContent } from "../../../../../fixtures/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsAttendingCourtContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface ReasonableAdjustmentsAttendingCourtPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum uniqueSelectors {
  yesVideoHearingsCheckbox = "#ra_typeOfHearing",
  yesPhoneHearingsCheckbox = "#ra_typeOfHearing-2",
  noToAll = "#ra_typeOfHearing-4",
  noToAllField = "#ra_noVideoAndPhoneHearing_subfield",
}

export class ReasonableAdjustmentsAttendingCourtPage {
  public static async reasonableAdjustmentsAttendingCourtPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: ReasonableAdjustmentsAttendingCourtPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      yesNoReasonableAdjustments: yesNoReasonableAdjustments,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<ReasonableAdjustmentsAttendingCourtPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ReasonableAdjustmentsAttendingCourtContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ReasonableAdjustmentsAttendingCourtContent,
        `govukBodyM`,
        Selectors.GovukBodyM,
      ),
      Helpers.checkGroup(
        page,
        3,
        ReasonableAdjustmentsAttendingCourtContent,
        `li`,
        Selectors.li,
      ),
      Helpers.checkGroup(
        page,
        2,
        ReasonableAdjustmentsAttendingCourtContent,
        `govukHint`,
        Selectors.GovukHint,
      ),
      Helpers.checkGroup(
        page,
        3,
        ReasonableAdjustmentsAttendingCourtContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<ReasonableAdjustmentsAttendingCourtPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page object.");
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsAttendingCourtContent.errorMessageBlank}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsAttendingCourtContent.errorMessageBlank}")`,
        1,
      ),
    ]);
    await page.click(uniqueSelectors.noToAll);
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsAttendingCourtContent.errorMessageNo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsAttendingCourtContent.errorMessageNo}")`,
        1,
      ),
    ]);
    await page.click(uniqueSelectors.noToAll);
  }

  private static async fillInFields({
    page: page,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: Partial<ReasonableAdjustmentsAttendingCourtPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoReasonableAdjustments) {
      const yesFields: uniqueSelectors[] = Object.values(uniqueSelectors).slice(
        0,
        2,
      );
      for (const selector of yesFields) {
        await page.click(selector);
      }
    } else {
      await page.click(uniqueSelectors.noToAll);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ReasonableAdjustmentsAttendingCourtContent.govukLabelNo}")`,
        1,
      );
      await page.fill(
        uniqueSelectors.noToAllField,
        ReasonableAdjustmentsAttendingCourtContent.noFieldValue,
      );
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
