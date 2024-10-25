import { Page } from "@playwright/test";
import { ReasonableAdjustmentsAttendingCourtPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsAttendingCourtPage";
import {
  ReasonableAdjustmentsLanguageRequirementsPage
} from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsLanguageRequirementsPage";
import {
  ReasonableAdjustmentsSpecialArrangementsPage
} from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsSpecialArrangementsPage";

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
    await ReasonableAdjustmentsLanguageRequirementsPage.reasonableAdjustmentsAttendingCourtPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoReasonableAdjustments: yesNoReasonableAdjustments,
    });
    await ReasonableAdjustmentsSpecialArrangementsPage.reasonableAdjustmentsSpecialArrangementsPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoReasonableAdjustments: yesNoReasonableAdjustments,
    });
  }
}
