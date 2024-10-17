import { Page } from "@playwright/test";
import { EmergencyProtectionOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings2/emergencyProtectionOrder/emergencyProtectionOrderdetailsPage";
import { EmergencyProtectionDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings2/emergencyProtectionOrder/EmergencyProtectionDocumentUploadPage";
import { SupervisionOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings2/supervisionOrder/supervisionOrderDetails";
import { SupervisionDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings2/supervisionOrder/supervisionDocumentUpload";
import { CareOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings2/careOrder/careOrderOrderDetailsPage";
import { CareOrderDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings2/careOrder/CareOrderDocumentUploadPage";

interface C100OtherProceedings2Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoEmergencyProtectionOrderDetails: boolean;
  yesNoSupervisionOrderDetails: boolean;
  yesNoCareOrderOrderDetails: boolean;
}

export class C100OtherProceedings2 {
  public static async c100OtherProceedings2({
    page,
    accessibilityTest,
    errorMessaging,
    yesNoEmergencyProtectionOrderDetails,
    yesNoSupervisionOrderDetails,
    yesNoCareOrderOrderDetails,
  }: C100OtherProceedings2Options): Promise<void> {
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
  }
}
