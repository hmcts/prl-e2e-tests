import { Page } from "@playwright/test";
import { CurrentPreviousProceedingsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings1/current-previous-proceedingsPage";
import { ProceedingDetailsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings1/proceeding-detailsPage";
import { OrderDetailsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings1/childArrangementOrder/order-detailsPage";
import { DocumentUploadPage } from "../../../../pages/citizen/createCase/C100/otherProceedings1/childArrangementOrder/documentUploadPage";

interface C100OtherProceedings1Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoCurrentProceedings1: boolean;
  yesNoOrderDetails: boolean;
  subJourney: boolean;
}

export class C100OtherProceedings1 {
  public static async c100OtherProceedings1({
    page,
    accessibilityTest,
    errorMessaging,
    yesNoCurrentProceedings1,
    yesNoOrderDetails,
  }: C100OtherProceedings1Options): Promise<void> {
    await CurrentPreviousProceedingsPage.currentPreviousProceedingsPage({
      //yesNo needs to be true to move to next page
      page,
      accessibilityTest,
      errorMessaging,
      yesNoCurrentProceedings1,
    });
    if (yesNoCurrentProceedings1) {
      await ProceedingDetailsPage.proceedingDetailsPage({
        page,
        accessibilityTest,
        errorMessaging,
      });
      await OrderDetailsPage.orderDetailsPage({
        //yesNo needs to be true to move to next page
        page,
        accessibilityTest,
        errorMessaging,
        yesNoOrderDetails,
      });
      if (yesNoOrderDetails) {
        await DocumentUploadPage.documentUploadPage({
          page,
          accessibilityTest,
          errorMessaging,
        });
      }
    }
  }
}
