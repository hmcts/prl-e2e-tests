import { Page } from "@playwright/test";
import { CurrentPreviousProceedingsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/current-previous-proceedingsPage.ts";
import { ProceedingDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/proceeding-detailsPage.ts";
import { ChildArrangementOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/childArrangementOrderDetailsPage.ts";
import { ChildArrangementDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/childArrangementDocumentUploadPage.ts";
import { EmergencyProtectionOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/emergencyProtectionOrderdetailsPage.ts";
import { EmergencyProtectionDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/emergencyProtectionDocumentUploadPage.ts";
import { SupervisionOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/supervisionOrderDetails.ts";
import { SupervisionDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/supervisionDocumentUpload.ts";
import { CareOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/careOrderOrderDetailsPage.ts";
import { CareOrderDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/careOrderDocumentUploadPage.ts";
import { ChildAbductionOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/childAbductionOrderDetailsPage.ts";
import { ChildAbductionDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/childAbductionDocumentUploadPage.ts";
import { ContactOrderForDivorceOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/contactOrderForDivorceOrderDetailsPage.ts";
import { ContactOrderForDivorceDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/contactOrderForDivorceDocumentUploadPage.ts";
import { ContactOrderForAdoptionOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/contactOrderForAdoptionOrderDetailsPage.ts";
import { ContactOrderForAdoptionDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/contactOrderForAdoptionDocumentUploadPage.ts";
import { ChildMaintenanceOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/childMaintenanceOrderDetailsPage.ts";
import { ChildMaintenanceOrderDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/childMaintenanceOrderDocumentUploadPage.ts";
import { FinancialOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/financialOrderDetailsPage.ts";
import { FinancialOrderDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/financialOrderDocumentUploadPage.ts";
import { NonMolestationOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/nonMolestationOrderOrderDetailsPage.ts";
import { OccupationOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/occupationOrderDetailsPage.ts";
import { OccupationOrderDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/occupationOrderDocumentUploadPage.ts";
import { ForcedMarriageProtectionDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/forcedMarriageProtectionOrderDocumentUploadPage.ts";
import { ForcedMarriageProtectionOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/forcedMarriageProtectionOrderDetailsPage.ts";
import { RestrainingOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/restrainingOrderDetailsPage.ts";
import { RestrainingOrderDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/restrainingOrderDocumentUploadPage.ts";
import { OtherInjunctionOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherInjunctionOrderDetailsPage.ts";
import { OtherInjunctionOrderDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherInjunctionOrderDocumentUploadPage.ts";
import { UndertakingOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/underTakingOrderDetailPage.ts";
import { UndertakingOrderDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/undertakingOrderDocumentUploadPage.ts";
import { OtherOrderDetailsPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherOrderDetailsPage.ts";
import { OtherOrderDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherOrderDocumentUploadPage.ts";
import { DocumentSummaryPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/DocumentSummaryPage.ts";
import { NonMolestationOrderDocumentUploadPage } from "../../../../../pages/citizen/createCase/C100/otherProceedings/nonMolestationOrderDocumanetUploadPage.ts";

interface C100OtherProceedings1Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoOtherProceedings: boolean;
}

export class C100OtherProceedings {
  public static async c100OtherProceedings1({
    page,
    accessibilityTest,
    errorMessaging,
    yesNoOtherProceedings,
  }: C100OtherProceedings1Options): Promise<void> {
    await CurrentPreviousProceedingsPage.currentPreviousProceedingsPage({
      //yesNo needs to be true to move to next page
      page,
      accessibilityTest,
      errorMessaging,
      yesNoOtherProceedings,
    });
    if (yesNoOtherProceedings) {
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
        yesNoOtherProceedings,
      });
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
          yesNoOtherProceedings,
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
        yesNoOtherProceedings,
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
        yesNoOtherProceedings,
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
        yesNoOtherProceedings,
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
          yesNoOtherProceedings,
        },
      );
      await ContactOrderForDivorceDocumentUploadPage.contactOrderForDivorceDocumentUploadPage(
        {
          page,
          accessibilityTest,
          errorMessaging,
        },
      );
      await ContactOrderForAdoptionOrderDetailsPage.contactOrderForAdoptionOrderDetailsPage(
        {
          page,
          accessibilityTest,
          errorMessaging,
          yesNoOtherProceedings,
        },
      );
      await ContactOrderForAdoptionDocumentUploadPage.contactOrderForAdoptionDocumentUploadPage(
        {
          page,
          accessibilityTest,
          errorMessaging,
        },
      );
      await ChildMaintenanceOrderDetailsPage.childMaintenanceOrderDetailsPage({
        page,
        accessibilityTest,
        errorMessaging,
        yesNoOtherProceedings,
      });
      await ChildMaintenanceOrderDocumentUploadPage.childMaintenanceOrderDocumentUploadPage(
        {
          page,
          accessibilityTest,
          errorMessaging,
        },
      );
      await FinancialOrderDetailsPage.financialOrderDetailsPage({
        page,
        accessibilityTest,
        errorMessaging,
        yesNoOtherProceedings,
      });
      await FinancialOrderDocumentUploadPage.financialOrderDocumentUploadPage({
        page,
        accessibilityTest,
        errorMessaging,
      });
      await NonMolestationOrderDetailsPage.nonMolestationOrderDetailsPage({
        page,
        accessibilityTest,
        errorMessaging,
        yesNoOtherProceedings,
      });
      await NonMolestationOrderDocumentUploadPage.nonMolestationOrderDocumentUploadPage(
        {
          page,
          accessibilityTest,
          errorMessaging,
        },
      );
      await OccupationOrderDetailsPage.occupationOrderDetailsPage({
        page,
        accessibilityTest,
        errorMessaging,
        yesNoOtherProceedings,
      });
      await OccupationOrderDocumentUploadPage.occupationOrderDocumentUploadPage(
        {
          page,
          accessibilityTest,
          errorMessaging,
        },
      );
      await ForcedMarriageProtectionOrderDetailsPage.forcedMarriageProtectionOrderDetailsPage(
        {
          page,
          accessibilityTest,
          errorMessaging,
          yesNoOtherProceedings,
        },
      );
      await ForcedMarriageProtectionDocumentUploadPage.forcedMarriageProtectionDocumentUploadPage(
        {
          page,
          accessibilityTest,
          errorMessaging,
        },
      );
      await RestrainingOrderDetailsPage.restrainingOrderDetailsPage({
        page,
        accessibilityTest,
        errorMessaging,
        yesNoOtherProceedings,
      });
      await RestrainingOrderDocumentUploadPage.restrainingOrderDocumentUploadPage(
        {
          page,
          accessibilityTest,
          errorMessaging,
        },
      );
      await OtherInjunctionOrderDetailsPage.otherInjunctionOrderDetailsPage({
        page,
        accessibilityTest,
        errorMessaging,
        yesNoOtherProceedings,
      });
      await OtherInjunctionOrderDocumentUploadPage.OtherInjunctionOrderDocumentUploadPage(
        {
          page,
          accessibilityTest,
          errorMessaging,
        },
      );
      await UndertakingOrderDetailsPage.undertakingOrderDetailsPage({
        page,
        accessibilityTest,
        errorMessaging,
        yesNoOtherProceedings,
      });
      await UndertakingOrderDocumentUploadPage.undertakingOrderDocumentUploadPage(
        {
          page,
          accessibilityTest,
          errorMessaging,
        },
      );
      await OtherOrderDetailsPage.OtherOrderDetailsPage({
        page,
        accessibilityTest,
        errorMessaging,
        yesNoOtherProceedings,
      });
      await OtherOrderDocumentUploadPage.otherOrderDocumentUploadPage({
        page,
        accessibilityTest,
        errorMessaging,
      });
      await DocumentSummaryPage.DocumentSummaryPage({
        page,
        accessibilityTest,
      });
    }
  }
}
