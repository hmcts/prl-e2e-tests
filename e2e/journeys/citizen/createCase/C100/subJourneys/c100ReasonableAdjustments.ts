import { Page } from "@playwright/test";
import { ReasonableAdjustmentsAttendingCourtPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsAttendingCourtPage.ts";
import { ReasonableAdjustmentsLanguageRequirementsPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsLanguageRequirementsPage.ts";
import { ReasonableAdjustmentsSpecialArrangementsPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsSpecialArrangementsPage.ts";
import { ReasonableAjustmentsIntermediaryPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsIntermediaryPage.ts";
import { ReasonableAjustmentsDisabilityPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsDisabilityPage.ts";

interface C100ReasonableAdjustmentsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

export class C100ReasonableAdjustments {
  public static async c100ReasonableAdjustments({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: C100ReasonableAdjustmentsOptions): Promise<void> {
    await ReasonableAdjustmentsAttendingCourtPage.reasonableAdjustmentsAttendingCourtPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        yesNoReasonableAdjustments: yesNoReasonableAdjustments,
      },
    );
    await ReasonableAdjustmentsLanguageRequirementsPage.reasonableAdjustmentsAttendingCourtPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        yesNoReasonableAdjustments: yesNoReasonableAdjustments,
      },
    );
    await ReasonableAdjustmentsSpecialArrangementsPage.reasonableAdjustmentsSpecialArrangementsPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        yesNoReasonableAdjustments: yesNoReasonableAdjustments,
      },
    );
    await ReasonableAjustmentsIntermediaryPage.reasonableAjustmentsIntermediaryPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        yesNoReasonableAdjustments: yesNoReasonableAdjustments,
      },
    );
    await ReasonableAjustmentsDisabilityPage.reasonableAjustmentsDisabilityPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        yesNoReasonableAdjustments: yesNoReasonableAdjustments,
      },
    );
  }
}
