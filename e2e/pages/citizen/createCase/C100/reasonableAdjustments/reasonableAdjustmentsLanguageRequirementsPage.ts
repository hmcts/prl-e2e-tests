import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ReasonableAdjustmentsLanguageRequirementsContent } from "../../../../../fixtures/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsLanguageRequirementsContent";

interface ReasonableAdjustmentsLanguageRequirementsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum UniqueSelectors {
  needToSpeakWelsh = "#ra_languageNeeds",
  needReadAndWriteWelsh = "#ra_languageNeeds-2",
  needInterpreter = "#ra_languageNeeds-3",
  needInterpreterInCertainLanguageInputField = "#ra_needInterpreterInCertainLanguage_subfield",
  noToAll = "#ra_languageNeeds-5",
}

export class ReasonableAdjustmentsLanguageRequirementsPage {
  public static async reasonableAdjustmentsAttendingCourtPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: ReasonableAdjustmentsLanguageRequirementsPageOptions): Promise<void> {
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
  }: Partial<ReasonableAdjustmentsLanguageRequirementsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ReasonableAdjustmentsLanguageRequirementsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ReasonableAdjustmentsLanguageRequirementsContent.GovukCaptionXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${ReasonableAdjustmentsLanguageRequirementsContent.govukInsetText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ReasonableAdjustmentsLanguageRequirementsContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ReasonableAdjustmentsLanguageRequirementsContent,
        "govukLabel",
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<ReasonableAdjustmentsLanguageRequirementsPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsLanguageRequirementsContent.errorMessageBlank}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsLanguageRequirementsContent.errorMessageBlank}")`,
        1,
      ),
    ]);
    await page.click(UniqueSelectors.needInterpreter);
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsLanguageRequirementsContent.errorMessageYesBlank}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsLanguageRequirementsContent.errorMessageYesBlank}")`,
        1,
      ),
    ]);
    await page.click(UniqueSelectors.needInterpreter);
  }

  private static async fillInFields({
    page: page,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: Partial<ReasonableAdjustmentsLanguageRequirementsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoReasonableAdjustments) {
      const yesFields: UniqueSelectors[] = Object.values(UniqueSelectors).slice(
        0,
        3,
      );
      for (const selector of yesFields) {
        await page.click(selector);
      }
      await page.fill(
        UniqueSelectors.needInterpreterInCertainLanguageInputField,
        ReasonableAdjustmentsLanguageRequirementsContent.interpreterLanguageDetails,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ReasonableAdjustmentsLanguageRequirementsContent.govukLabelYes}")`,
        1,
      );
    } else {
      await page.click(UniqueSelectors.noToAll);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
