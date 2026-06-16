import { Page } from "@playwright/test";
//import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ReasonableAdjustmentsDisabilityContent } from "../../../../../fixtures/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsDisabilityContent.ts";

interface ReasonableAjustmentsDisabilityPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum UniqueSelectors {
  yesOption = "#ra_assistanceRequirements",
  intermediaryYesSubfieldText = "#ra_assistanceRequirements_subfield",
  noOption = "#ra_assistanceRequirements-2",
}

export class ReasonableAjustmentsDisabilityPage {
  public static async reasonableAjustmentsDisabilityPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: ReasonableAjustmentsDisabilityPageOptions): Promise<void> {
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
  }: Partial<ReasonableAjustmentsDisabilityPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ReasonableAdjustmentsDisabilityContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ReasonableAdjustmentsDisabilityContent.GovukCaptionXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ReasonableAdjustmentsDisabilityContent.govUkLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ReasonableAdjustmentsDisabilityContent.govUkLabel2}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      //await new AxeUtils(page).audit(); //Accessibility test is failing for this page, backlog ticket raised FPVTL-3093
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<ReasonableAjustmentsDisabilityPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.click(
      `${Selectors.GovukRadios}:text-is("${CommonStaticText.yes}")`,
    );
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
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsDisabilityContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: Partial<ReasonableAjustmentsDisabilityPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoReasonableAdjustments) {
      await page.click(UniqueSelectors.yesOption);
      await page.fill(
        UniqueSelectors.intermediaryYesSubfieldText,
        ReasonableAdjustmentsDisabilityContent.intermediaryDetails,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ReasonableAdjustmentsDisabilityContent.textHintAfterYesSelected}")`,
        1,
      );
    } else {
      await page.click(UniqueSelectors.noOption);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
