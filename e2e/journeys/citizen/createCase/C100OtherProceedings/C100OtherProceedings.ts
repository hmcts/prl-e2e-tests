import { Page } from "@playwright/test";
import { CurrentPreviousProceedingsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/current-previous-proceedingsPage";
import { ProceedingDetailsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/proceeding-detailsPage";
import { ChildArrangementOrderDetailsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/childArrangementOrderDetailsPage";
import { ChildArrangementDocumentUploadPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/childArrangementDocumentUploadPage";
import { EmergencyProtectionOrderDetailsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/emergencyProtectionOrderdetailsPage";
import { EmergencyProtectionDocumentUploadPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/EmergencyProtectionDocumentUploadPage";
import { SupervisionOrderDetailsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/supervisionOrderDetails";
import { SupervisionDocumentUploadPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/supervisionDocumentUpload";
import { CareOrderDetailsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/careOrderOrderDetailsPage";
import { CareOrderDocumentUploadPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/CareOrderDocumentUploadPage";
import { ChildAbductionOrderDetailsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/childAbductionOrderDetailsPage";
import { ChildAbductionDocumentUploadPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/childAbductionDocumentUploadPage";
import { ContactOrderForDivorceOrderDetailsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/contactOrderForDivorceOrderDetailsPage";
import { ContactOrderForDivorceDocumentUploadPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/contactOrderForDivorceDocumentUploadPage";
import { ContactOrderForAdoptionOrderDetailsPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/contactOrderForChildAbductionOrderDetailsPage";
import { ContactOrderForAdoptionDocumentUploadPage } from "../../../../pages/citizen/createCase/C100/otherProceedings/contactOrderForChildAbductionDocumentUploadPage";

interface C100OtherProceedings1Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoCurrentProceedings1: boolean;
  yesNoOrderDetails: boolean;
  yesNoEmergencyProtectionOrderDetails: boolean;
  yesNoSupervisionOrderDetails: boolean;
  yesNoCareOrderOrderDetails: boolean;
  yesNoChildAbductionOrderDetails: boolean;
  yesNoContactOrderForAdoptionOrderDetails: boolean;
  yesNoContactOrderForDivorceOrderDetails: boolean;
}

export class C100OtherProceedings {
  public static async c100OtherProceedings1({
    page,
    accessibilityTest,
    errorMessaging,
    yesNoCurrentProceedings1,
    yesNoOrderDetails,
    yesNoEmergencyProtectionOrderDetails,
    yesNoSupervisionOrderDetails,
    yesNoCareOrderOrderDetails,
    yesNoChildAbductionOrderDetails,
    yesNoContactOrderForAdoptionOrderDetails,
    yesNoContactOrderForDivorceOrderDetails,
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
      await ChildArrangementOrderDetailsPage.orderDetailsPage({
        //yesNo needs to be true to move to next page
        page,
        accessibilityTest,
        errorMessaging,
        yesNoOrderDetails,
      });
      if (yesNoOrderDetails) {
        await ChildArrangementDocumentUploadPage.documentUploadPage({
          page,
          accessibilityTest,
          errorMessaging,
        });
        await EmergencyProtectionOrderDetailsPage.emergencyProtectionOrderDetailsPage(
          {
            page,
            accessibilityTest,
            errorMessaging,
            yesNoEmergencyProtectionOrderDetails,
          },
        );
        await EmergencyProtectionDocumentUploadPage.emergencyProtectionDocumentUploadPage(
          {
            page,
            accessibilityTest,
            errorMessaging,
          },
        );
        await SupervisionOrderDetailsPage.supervisionOrderDetailsPage({
          page,
          accessibilityTest,
          errorMessaging,
          yesNoSupervisionOrderDetails,
        });
        await SupervisionDocumentUploadPage.supervisionDocumentUploadPage({
          page,
          accessibilityTest,
          errorMessaging,
        });
        await CareOrderDetailsPage.careOrderDetailsPage({
          page,
          accessibilityTest,
          errorMessaging,
          yesNoCareOrderOrderDetails,
        });
        await CareOrderDocumentUploadPage.careOrderDocumentUploadPage({
          page,
          accessibilityTest,
          errorMessaging,
        });
        await ChildAbductionOrderDetailsPage.childAbductionOrderDetailsPage({
          page,
          accessibilityTest,
          errorMessaging,
          yesNoChildAbductionOrderDetails,
        });
        await ChildAbductionDocumentUploadPage.childAbductionDocumentUploadPageOptions(
          {
            page,
            accessibilityTest,
            errorMessaging,
          },
        );
        await ContactOrderForDivorceOrderDetailsPage.contactOrderForDivorceOrderDetailsPageOptions(
          {
            page,
            accessibilityTest,
            errorMessaging,
            yesNoContactOrderForDivorceOrderDetails,
          },
        );
        await ContactOrderForDivorceDocumentUploadPage.contactOrderForDivorceDocumentUploadPage(
          {
            page,
            accessibilityTest,
            errorMessaging,
          },
        );
        await ContactOrderForAdoptionOrderDetailsPage.contactOrderForAdoptionOrderDetailsPageOptions(
          {
            page,
            accessibilityTest,
            errorMessaging,
            yesNoContactOrderForAdoptionOrderDetails,
          },
        );
        await ContactOrderForAdoptionDocumentUploadPage.contactOrderForAdoptionDocumentUploadPage(
          {
            page,
            accessibilityTest,
            errorMessaging,
          },
        );
      }
    }
  }
}
