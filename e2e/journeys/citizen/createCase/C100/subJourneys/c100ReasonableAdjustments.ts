import { Page } from "@playwright/test";
import { ReasonableAdjustmentsAttendingCourtPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsAttendingCourtPage.ts";
import { ReasonableAdjustmentsLanguageRequirementsPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsLanguageRequirementsPage.ts";
import { ReasonableAdjustmentsSpecialArrangementsPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsSpecialArrangementsPage.ts";
import { ReasonableAdjustmentsSupportDuringYourCasePage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsSupportDuringYourCasePage.ts";
import { ReasonableAdjustmentsDocumentSupportPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsDocumentsSupportPage.ts";
import { ReasonableAdjustmentsNeedsInCourtPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsNeedsInCourtPage.ts";
import { ReasonableAdjustmentsCommunicationHelpPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsCommunicationHelpPage.ts";
import { ReasonableAdjustmentsSupportForCourtHearingPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/ReasonableAdjustmentsSupportForCourtHearingPage.ts";
import { ReasonableAdjustmentsNeedsDuringCourtHearingPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/ReasonableAdjustmentsNeedsDuringCourtHearingPage.ts";

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
    if (yesNoReasonableAdjustments) {
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


      // ADD intermediary screen
      // ADD if attending the court.... screen
      //
    }
  }
}
