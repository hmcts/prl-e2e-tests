import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ReasonableAdjustmentsNeedsDuringCourtHearingContent } from "../../../../../fixtures/citizen/createCase/C100/reasonableAdjustments/ReasonableAdjustmentsNeedsDuringCourtHearingContent.ts";

export interface ReasonableAdjustmentsNeedsDuringCourtHearingPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum ChecklistUniqueSelectors {
  appropriateLighting = "#ra_feelComportable",
  regularBreaks = "#ra_feelComportable-2",
  SpaceToGetUpAndMove = "#ra_feelComportable-3",
  Other = "#ra_feelComportable-4",
}

enum TextBoxUniqueSelectors {
  appropriateLightingInput = "#ra_appropriateLighting_subfield",
  otherInput = "#ra_feelComportableOther_subfield",
}

const noToAll: string = "#ra_feelComportable-6";

export class ReasonableAdjustmentsNeedsDuringCourtHearingPage {
  public static async reasonableAdjustmentsNeedsDuringCourtHearingPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: ReasonableAdjustmentsNeedsDuringCourtHearingPageOptions): Promise<void> {
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
  }: Partial<ReasonableAdjustmentsNeedsDuringCourtHearingPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ReasonableAdjustmentsNeedsDuringCourtHearingContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ReasonableAdjustmentsNeedsDuringCourtHearingContent.GovukCaptionXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${ReasonableAdjustmentsNeedsDuringCourtHearingContent.govukInsetText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ReasonableAdjustmentsNeedsDuringCourtHearingContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ReasonableAdjustmentsNeedsDuringCourtHearingContent,
        "govukLabel",
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<ReasonableAdjustmentsNeedsDuringCourtHearingPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsNeedsDuringCourtHearingContent.errorMessageBlank}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsNeedsDuringCourtHearingContent.errorMessageBlank}")`,
        1,
      ),
    ]);
    await page.click(ChecklistUniqueSelectors.appropriateLighting);
    await page.click(ChecklistUniqueSelectors.Other);
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsNeedsDuringCourtHearingContent.errorMessageAppropriateLighting}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsNeedsDuringCourtHearingContent.errorMessageAppropriateLighting}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ReasonableAdjustmentsNeedsDuringCourtHearingContent.errorMessageOther}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsNeedsDuringCourtHearingContent.errorMessageOther}")`,
        1,
      ),
    ]);
    await page.click(ChecklistUniqueSelectors.appropriateLighting);
    await page.click(ChecklistUniqueSelectors.Other);
  }

  private static async fillInFields({
    page: page,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: Partial<ReasonableAdjustmentsNeedsDuringCourtHearingPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoReasonableAdjustments) {
      for (const selector of Object.values(ChecklistUniqueSelectors)) {
        await page.click(selector);
      }
      const textToFill: [string, string] = [
        "appropriateLightingInput",
        "otherInput",
      ];
      for (const key of textToFill) {
        const inputKey = key as keyof typeof TextBoxUniqueSelectors;
        const contentKey =
          key as keyof typeof ReasonableAdjustmentsNeedsDuringCourtHearingContent;
        await page.fill(
          TextBoxUniqueSelectors[inputKey],
          ReasonableAdjustmentsNeedsDuringCourtHearingContent[contentKey],
        );
      }
    } else {
      await page.click(noToAll);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
