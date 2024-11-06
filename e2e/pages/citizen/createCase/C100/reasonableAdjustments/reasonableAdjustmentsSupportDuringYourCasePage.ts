import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AxeTest from "../../../../../common/accessibilityTestHelper";
import { ReasonableAdjustmentsSupportDuringYourCaseContent } from "../../../../../fixtures/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsSupportDuringYourCaseContent";
import { Helpers } from "../../../../../common/helpers";

interface ReasonableAdjustmentsSupportDuringYourCasePageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum UniqueSelectors {
  altFormat = "#ra_disabilityRequirements",
  helpCommunicationAndUnderstanding = "#ra_disabilityRequirements-2",
  bringSupport = "#ra_disabilityRequirements-3",
  needSomethingToFeelComfortable = "#ra_disabilityRequirements-4",
  helpTravelling = "#ra_disabilityRequirements-5",
}

const noToAll: string = "#ra_disabilityRequirements-7";

export class ReasonableAdjustmentsSupportDuringYourCasePage {
  public static async reasonableAdjustmentsSupportDuringYourCasePage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: ReasonableAdjustmentsSupportDuringYourCasePageOptions): Promise<void> {
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
  }: Partial<ReasonableAdjustmentsSupportDuringYourCasePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ReasonableAdjustmentsSupportDuringYourCaseContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ReasonableAdjustmentsSupportDuringYourCaseContent.GovukCaptionXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${ReasonableAdjustmentsSupportDuringYourCaseContent.govukInsetText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        ReasonableAdjustmentsSupportDuringYourCaseContent,
        "govukHint",
        Selectors.GovukHint,
      ),
      Helpers.checkGroup(
        page,
        5,
        ReasonableAdjustmentsSupportDuringYourCaseContent,
        "govukLabel",
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      await AxeTest.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<ReasonableAdjustmentsSupportDuringYourCasePageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsSupportDuringYourCaseContent.errorMessageBlank}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsSupportDuringYourCaseContent.errorMessageBlank}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: Partial<ReasonableAdjustmentsSupportDuringYourCasePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoReasonableAdjustments) {
      for (const selector of Object.values(UniqueSelectors)) {
        await page.click(selector);
      }
    } else {
      await page.click(noToAll);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
