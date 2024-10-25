import { Page } from "@playwright/test";
import AxeTest from "../../../../../common/accessibilityTestHelper";

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
  separateToilet = "#ra_specialArrangements-4",
  visitCourtBeforeHearing = "#ra_specialArrangements-5",
  videoLinks = "#ra_specialArrangements-6",
  other = "#ra_specialArrangements-7",
}

const noToAll: string = "#ra_specialArrangements-9";

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
    if (accessibilityTest) {
      await AxeTest.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<ReasonableAdjustmentsSpecialArrangementsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
  }

  private static async fillInFields({
    page: page,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: Partial<ReasonableAdjustmentsSpecialArrangementsPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
  }
}
