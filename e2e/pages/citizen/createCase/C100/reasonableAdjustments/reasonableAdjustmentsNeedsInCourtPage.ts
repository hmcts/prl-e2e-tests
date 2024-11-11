import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ReasonableAdjustmentsNeedsInCourtContent } from "../../../../../fixtures/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsNeedsInCourtContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface ReasonableAdjustmentsNeedsInCourtPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum CheckListUniqueSelectors {
  parkingSpace = "#ra_travellingCourt",
  stepFreeWheelchair = "#ra_travellingCourt-2",
  venueWheelchair = "#ra_travellingCourt-3",
  accessibleToilet = "#ra_travellingCourt-4",
  helpUsingALift = "#ra_travellingCourt-5",
  differentTypeOfChair = "#ra_travellingCourt-6",
  guidingInTheBuilding = "#ra_travellingCourt-7",
  other = "#ra_travellingCourt-8",
}

enum TextboxInputUniqueSelectors {
  parkingSpotInput = "#ra_parkingSpace_subfield",
  typeOfChairInput = "#ra_differentTypeChair_subfield",
  otherInput = "#ra_travellingCourtOther_subfield",
}

const noToAll: string = "#ra_travellingCourt-10";

export class ReasonableAdjustmentsNeedsInCourtPage {
  public static async reasonableAdjustmentsNeedsInCourtPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: ReasonableAdjustmentsNeedsInCourtPageOptions): Promise<void> {
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
  }: Partial<ReasonableAdjustmentsNeedsInCourtPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ReasonableAdjustmentsNeedsInCourtContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ReasonableAdjustmentsNeedsInCourtContent.GovukCaptionXL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ReasonableAdjustmentsNeedsInCourtContent.govukHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        9,
        ReasonableAdjustmentsNeedsInCourtContent,
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
  }: Partial<ReasonableAdjustmentsNeedsInCourtPageOptions>): Promise<void> {
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsNeedsInCourtContent.errorMessageBlank}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsNeedsInCourtContent.errorMessageBlank}")`,
        1,
      ),
    ]);
    await page.click(CheckListUniqueSelectors.parkingSpace);
    await page.click(CheckListUniqueSelectors.differentTypeOfChair);
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
        `${Selectors.a}:text-is("${ReasonableAdjustmentsNeedsInCourtContent.errorMessageParkingSpace}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsNeedsInCourtContent.errorMessageParkingSpace}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ReasonableAdjustmentsNeedsInCourtContent.errorMessageTypOfChair}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsNeedsInCourtContent.errorMessageTypOfChair}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ReasonableAdjustmentsNeedsInCourtContent.errorMessageOther}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ReasonableAdjustmentsNeedsInCourtContent.errorMessageOther}")`,
        1,
      ),
    ]);
    await page.click(CheckListUniqueSelectors.parkingSpace);
    await page.click(CheckListUniqueSelectors.differentTypeOfChair);
    await page.click(CheckListUniqueSelectors.other);
  }

  private static async fillInFields({
    page: page,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: Partial<ReasonableAdjustmentsNeedsInCourtPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoReasonableAdjustments) {
      for (const selector of Object.values(CheckListUniqueSelectors)) {
        await page.click(selector);
      }
      await Helpers.checkGroup(
        page,
        3,
        ReasonableAdjustmentsNeedsInCourtContent,
        "hiddenGovUkLabel",
        Selectors.GovukLabel,
      );
      const textToFill: [string, string, string] = [
        "parkingSpotInput",
        "typeOfChairInput",
        "otherInput",
      ];
      for (let key of textToFill) {
        let inputKey = key as keyof typeof TextboxInputUniqueSelectors;
        let contentKey =
          key as keyof typeof ReasonableAdjustmentsNeedsInCourtContent;
        await page.fill(
          TextboxInputUniqueSelectors[inputKey],
          ReasonableAdjustmentsNeedsInCourtContent[contentKey],
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
