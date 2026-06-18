import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ReasonableAdjustmentsSpecialArrangementsContent } from "../../../../../fixtures/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsSpecialArrangementsContent.ts";

interface ReasonableAdjustmentsSpecialArrangementsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum safetyRequirementsUniqueSelectors {
  separateWaitingRooms = "#ra_specialArrangements",
  separateExitsAndEntrances = "#ra_specialArrangements-2",
  screensToNotSeeEachOther = "#ra_specialArrangements-3",
  videoLinks = "#ra_specialArrangements-4",
}

const noSafetyRequirements: string = "#ra_specialArrangements-6";

export class ReasonableAdjustmentsSpecialArrangementsPage {
  public static async reasonableAdjustmentsSpecialArrangementsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: ReasonableAdjustmentsSpecialArrangementsPageOptions): Promise<void> {
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
  }: Partial<ReasonableAdjustmentsSpecialArrangementsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ReasonableAdjustmentsSpecialArrangementsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ReasonableAdjustmentsSpecialArrangementsContent.GovukCaptionXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${ReasonableAdjustmentsSpecialArrangementsContent.govukInsetText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ReasonableAdjustmentsSpecialArrangementsContent.govukHint1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ReasonableAdjustmentsSpecialArrangementsContent,
        "govukLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCheckboxesDivider}:text-is("${ReasonableAdjustmentsSpecialArrangementsContent.or}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ReasonableAdjustmentsSpecialArrangementsContent.boldLabel}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<ReasonableAdjustmentsSpecialArrangementsPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsSpecialArrangementsContent.errorMessageChildNeedSpecialArrangement}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsSpecialArrangementsContent.errorMessageChildNeedSpecialArrangement}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: Partial<ReasonableAdjustmentsSpecialArrangementsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoReasonableAdjustments) {
      for (const selector of Object.values(safetyRequirementsUniqueSelectors)) {
        await page.click(selector);
      }
    } else {
      await page.click(noSafetyRequirements);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
