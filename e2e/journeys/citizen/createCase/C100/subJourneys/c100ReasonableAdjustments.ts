import { Page } from "@playwright/test";
import { ReasonableAdjustmentsAttendingCourtPage } from "../../../../../pages/citizen/createCase/C100/reasonableAdjustments/reasonableAdjustmentsAttendingCourtPage";

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
  }
}
