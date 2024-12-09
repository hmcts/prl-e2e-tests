import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ReasonableAdjustmentsDocumentsSupportContent } from "../../../../../fixtures/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsDocumentsSupportContent";

interface ReasonableAdjustmentsDocumentSupportPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum CheckListUniqueSelectors {
  specifiedColour = "#ra_documentInformation",
  easyReadFormat = "#ra_documentInformation-2",
  brailleDocuments = "#ra_documentInformation-3",
  largePrints = "#ra_documentInformation-4",
  audioTranslation = "#ra_documentInformation-5",
  readOutToMe = "#ra_documentInformation-6",
  emailInformationToMe = "#ra_documentInformation-7",
  other = "#ra_documentInformation-8",
}

enum TextboxInputUniqueSelectors {
  describeSpecifiedColour = "#ra_specifiedColorDocuments_subfield",
  describeLargePrint = "#ra_largePrintDocuments_subfield",
  describeOtherNeeds = "#ra_documentHelpOther_subfield",
}

const noToAll: string = "#ra_documentInformation-10";

export class ReasonableAdjustmentsDocumentSupportPage {
  public static async reasonableAdjustmentsDocumentSupportPageOptions({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: ReasonableAdjustmentsDocumentSupportPageOptions): Promise<void> {
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
  }: Partial<ReasonableAdjustmentsDocumentSupportPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ReasonableAdjustmentsDocumentsSupportContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ReasonableAdjustmentsDocumentsSupportContent.GovukCaptionXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${ReasonableAdjustmentsDocumentsSupportContent.govukInsetText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ReasonableAdjustmentsDocumentsSupportContent,
        "govukLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkGroup(
        page,
        9,
        ReasonableAdjustmentsDocumentsSupportContent,
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
  }: Partial<ReasonableAdjustmentsDocumentSupportPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsDocumentsSupportContent.errorMessageBlank}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsDocumentsSupportContent.errorMessageBlank}")`,
        1,
      ),
    ]);
    await page.click(CheckListUniqueSelectors.specifiedColour);
    await page.click(CheckListUniqueSelectors.largePrints);
    await page.click(CheckListUniqueSelectors.other);
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsDocumentsSupportContent.errorMessageDocumentsInSpecifiedColour}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsDocumentsSupportContent.errorMessageDocumentsInSpecifiedColour}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ReasonableAdjustmentsDocumentsSupportContent.errorMessageDocumentsInLargePrints}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsDocumentsSupportContent.errorMessageDocumentsInLargePrints}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ReasonableAdjustmentsDocumentsSupportContent.errorMessageOther}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsDocumentsSupportContent.errorMessageOther}")`,
        1,
      ),
    ]);
    await page.click(CheckListUniqueSelectors.specifiedColour);
    await page.click(CheckListUniqueSelectors.largePrints);
    await page.click(CheckListUniqueSelectors.other);
  }

  private static async fillInFields({
    page: page,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: Partial<ReasonableAdjustmentsDocumentSupportPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoReasonableAdjustments) {
      for (const selector of Object.values(CheckListUniqueSelectors)) {
        await page.click(selector);
      }
      await page.fill(
        TextboxInputUniqueSelectors.describeSpecifiedColour,
        ReasonableAdjustmentsDocumentsSupportContent.textForSpecifiedColour,
      );
      await page.fill(
        TextboxInputUniqueSelectors.describeLargePrint,
        ReasonableAdjustmentsDocumentsSupportContent.textForLargePrints,
      );
      await page.fill(
        TextboxInputUniqueSelectors.describeOtherNeeds,
        ReasonableAdjustmentsDocumentsSupportContent.textForOther,
      );
    } else {
      await page.click(noToAll);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
