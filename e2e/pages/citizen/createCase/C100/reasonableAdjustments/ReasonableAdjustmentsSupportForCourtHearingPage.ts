import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AxeTest from "../../../../../common/accessibilityTestHelper";
import { ReasonableAdjustmentsSupportForCourtHearingContent } from "../../../../../fixtures/citizen/createCase/C100/reasonableAdjustments/ReasonableAdjustmentsSupportForCourtHearingContent";
import { Helpers } from "../../../../../common/helpers";

export interface ReasonableAdjustmentsSupportForCourtHearingPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum ChecklistUniqueSelectors {
  supportWorkerCarer = "#ra_supportCourt",
  friendOrFamily = "#ra_supportCourt-2",
  assistanceGuidDog = "#ra_supportCourt-3",
  therapyAnimal = "#ra_supportCourt-4",
  other = "#ra_supportCourt-5",
}

enum TextBoxUniqueSelectors {
  supportWorkerInput = "#ra_supportWorkerCarer_subfield",
  friendFamilyMemberInput = "#ra_friendFamilyMember_subfield",
  therapyAnimalInput = "#ra_therapyAnimal_subfield",
  otherInput = "#ra_supportCourtOther_subfield",
}

const noToAll: string = "#ra_supportCourt-7";

export class ReasonableAdjustmentsSupportForCourtHearingPage {
  public static async reasonableAdjustmentsSupportForCourtHearingPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: ReasonableAdjustmentsSupportForCourtHearingPageOptions): Promise<void> {
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
  }: Partial<ReasonableAdjustmentsSupportForCourtHearingPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.GovukCaptionXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.govukInsetText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        ReasonableAdjustmentsSupportForCourtHearingContent,
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
  }: Partial<ReasonableAdjustmentsSupportForCourtHearingPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.errorMessageBlank}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.errorMessageBlank}")`,
        1,
      ),
    ]);
    await page.click(ChecklistUniqueSelectors.supportWorkerCarer);
    await page.click(ChecklistUniqueSelectors.friendOrFamily);
    await page.click(ChecklistUniqueSelectors.therapyAnimal);
    await page.click(ChecklistUniqueSelectors.other);
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.errorMessageEnterName1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.errorMessageEnterName1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.errorMessageEnterName2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.errorMessageEnterName2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.errorMessageTherapyAnimal}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.errorMessageTherapyAnimal}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.errorMessageSupport}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.errorMessageSupport}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: Partial<ReasonableAdjustmentsSupportForCourtHearingPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoReasonableAdjustments) {
      for (const selector of Object.values(ChecklistUniqueSelectors)) {
        await page.click(selector);
      }
      const textToFill: [string, string, string, string] = [
        "loremIpsumSupportWorker",
        "loremIpsumFriendOrFamily",
        "loremIpsumTherapyAnimal",
        "loremIpsumOther",
      ];
      for (let key of textToFill) {
        let inputKey = key as keyof typeof TextBoxUniqueSelectors;
        let contentKey =
          key as keyof typeof ReasonableAdjustmentsSupportForCourtHearingContent;
        await page.fill(
          TextBoxUniqueSelectors[inputKey],
          ReasonableAdjustmentsSupportForCourtHearingContent[contentKey],
        );
      }
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.hiddenGovukLabel1}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:text-is("${ReasonableAdjustmentsSupportForCourtHearingContent.hiddenGovukLabel2}")`,
          2,
        ),
      ]);
    } else {
      await page.click(noToAll);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
