import { Page } from "@playwright/test";
import { ReasonableAdjustmentsAttendingCourtPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsAttendingCourtPage";
import { ReasonableAdjustmentsLanguageRequirementsPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsLanguageRequirementsPage";
import { ReasonableAdjustmentsSpecialArrangementsPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsSpecialArrangementsPage";
import { ReasonableAdjustmentsSupportDuringYourCasePage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsSupportDuringYourCasePage";
import { ReasonableAdjustmentsDocumentSupportPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsDocumentsSupportPage";
import { ReasonableAdjustmentsNeedsInCourtPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsNeedsInCourtPage";
import { ReasonableAdjustmentsCommunicationHelpPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsCommunicationHelpPage";
import { ReasonableAdjustmentsSupportForCourtHearingPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/ReasonableAdjustmentsSupportForCourtHearingPage";
import { ReasonableAdjustmentsNeedsDuringCourtHearingPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/ReasonableAdjustmentsNeedsDuringCourtHearingPage";

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
      await ReasonableAdjustmentsSupportDuringYourCasePage.reasonableAdjustmentsSupportDuringYourCasePage(
        {
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          yesNoReasonableAdjustments: yesNoReasonableAdjustments,
        },
      );
      await ReasonableAdjustmentsDocumentSupportPage.reasonableAdjustmentsDocumentSupportPageOptions(
        {
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          yesNoReasonableAdjustments: yesNoReasonableAdjustments,
        },
      );
      await ReasonableAdjustmentsCommunicationHelpPage.reasonableAdjustmentsCommunicationHelpPage(
        {
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          yesNoReasonableAdjustments: yesNoReasonableAdjustments,
        },
      );
      await ReasonableAdjustmentsSupportForCourtHearingPage.reasonableAdjustmentsSupportForCourtHearingPage(
        {
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          yesNoReasonableAdjustments: yesNoReasonableAdjustments,
        },
      );
      await ReasonableAdjustmentsNeedsDuringCourtHearingPage.reasonableAdjustmentsNeedsDuringCourtHearingPage(
        {
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          yesNoReasonableAdjustments: yesNoReasonableAdjustments,
        },
      );
      await ReasonableAdjustmentsNeedsInCourtPage.reasonableAdjustmentsNeedsInCourtPage(
        {
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          yesNoReasonableAdjustments: yesNoReasonableAdjustments,
        },
      );
    } else {
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
      await ReasonableAdjustmentsSupportDuringYourCasePage.reasonableAdjustmentsSupportDuringYourCasePage(
        {
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          yesNoReasonableAdjustments: yesNoReasonableAdjustments,
        },
      );
    }
  }
}
