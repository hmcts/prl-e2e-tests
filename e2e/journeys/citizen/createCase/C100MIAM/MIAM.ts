import { Page } from "@playwright/test";
import { MiamOtherProceedingsPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamOtherProceedingsPage";
import { MiamNoNeedPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamNoNeedPage";
import { MiamInfoPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamInfoPage";
import { MiamAttendancePage } from "../../../../pages/citizen/createCase/C100/MIAM/miamAttendancePage";
import { MiamMediatorDocumentPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamMediatorDocumentPage";
import { MiamGetDocPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamGetDocPage";
import { CaseDashboardPage } from "../../../../pages/citizen/createCase/initialJourney/caseDashboardPage";
import { MiamUploadPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamUploadPage";
import { MiamUploadConfirmationPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamUploadConfirmationPage";
import { MiamValidReasonPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamValidReasonPage";
import { MiamGetMediatorPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamGetMediatorPage";
import { MiamGeneralReasonsPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamGeneralReasonsPage";
import { MiamDomesticAbusePage } from "../../../../pages/citizen/createCase/C100/MIAM/miamDomesticAbusePage";
import { MiamProvidingEvidenceDomesticAbusePage } from "../../../../pages/citizen/createCase/C100/MIAM/miamProvidingEvidenceDomesticAbusePage";
import { MiamDomesticAbuseUploadEvidencePage } from "../../../../pages/citizen/createCase/C100/MIAM/miamDomesticAbuseUploadEvidencePage";
import {
  MiamChildProtectionConcernsType,
  MiamChildProtectionPage,
} from "../../../../pages/citizen/createCase/C100/MIAM/miamChildProtectionPage";
import {
  MiamUrgencyPage,
  MiamUrgencyType,
} from "../../../../pages/citizen/createCase/C100/MIAM/miamUrgencyPage";
import {
  MiamAttendanceType,
  MiamPreviousAttendancePage,
} from "../../../../pages/citizen/createCase/C100/MIAM/miamPreviousAttendancePage";
import { MiamOtherAttendanceOrNCDRPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamOtherAttendanceOrNCDRPage";
import { MiamUploadEvidenceOfAttendingMiamOrNCDRPage } from "../../../../pages/citizen/createCase/C100/MIAM/miamUploadEvidenceOfAttendingMiamOrNCDRPage";
import {
  MiamMiamOtherPage,
  MiamOtherReasonForNotAttending,
} from "../../../../pages/citizen/createCase/C100/MIAM/miamMiamOtherPage";

interface MIAMOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  MIAMChildrenInvolvedOtherProceedings: boolean;
  miamAlreadyAttended: boolean;
  documentSignedByMediator: boolean;
  MIAMValidReasonNoAttendance: boolean;
  MiamGeneralExemptions: boolean;
  MiamDomesticAbuse: boolean;
  miamDomesticAbuseProvidingEvidence: boolean;
  miamChildProtectionConcernsType: MiamChildProtectionConcernsType;
  miamUrgencyType: MiamUrgencyType;
  miamAttendanceType: MiamAttendanceType;
  miamPreviousAttendanceMediatorSignedDocument: boolean;
  miamOtherReasonForNotAttending: MiamOtherReasonForNotAttending;
}

export class MIAM {
  public static async MIAM({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    MIAMChildrenInvolvedOtherProceedings: MIAMChildrenInvolvedOtherProceedings,
    miamAlreadyAttended: miamAlreadyAttended,
    documentSignedByMediator: documentSignedByMediator,
    MIAMValidReasonNoAttendance: MIAMValidReasonNoAttendance,
    MiamGeneralExemptions: MiamGeneralExemptions,
    MiamDomesticAbuse: MiamDomesticAbuse,
    miamDomesticAbuseProvidingEvidence: miamDomesticAbuseProvidingEvidence,
    miamChildProtectionConcernsType: miamChildProtectionConcernsType,
    miamUrgencyType: miamUrgencyType,
    miamAttendanceType: miamAttendanceType,
    miamPreviousAttendanceMediatorSignedDocument:
      miamPreviousAttendanceMediatorSignedDocument,
    miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
  }: MIAMOptions): Promise<void> {
    await MiamOtherProceedingsPage.otherProceedingsPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      MIAMChildrenInvolvedOtherProceedings:
        MIAMChildrenInvolvedOtherProceedings,
    });
    if (MIAMChildrenInvolvedOtherProceedings) {
      await MiamNoNeedPage.noNeedPage({
        page: page,
        accessibilityTest: accessibilityTest,
      });
    } else {
      await MiamInfoPage.miamInfoPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
      await MiamAttendancePage.attendancePage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        miamAlreadyAttended: miamAlreadyAttended,
      });
      if (miamAlreadyAttended) {
        await MiamMediatorDocumentPage.mediatorDocumentPage({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          documentSignedByMediator: documentSignedByMediator,
        });
        if (!documentSignedByMediator) {
          await MiamGetDocPage.miamGetDocPage({
            page: page,
            accessibilityTest: accessibilityTest,
          });
          await CaseDashboardPage.caseDashboardPage({
            page: page,
            accessibilityTest: false,
          });
        } else {
          await MiamUploadPage.miamUploadPage({
            page: page,
            accessibilityTest: accessibilityTest,
            errorMessaging: errorMessaging,
          });
          await MiamUploadConfirmationPage.miamUploadConfirmationPage({
            page: page,
            accessibilityTest: accessibilityTest,
          });
        }
      } else {
        await MiamValidReasonPage.miamValidReasonPage({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          MIAMValidReasonNoAttendance: MIAMValidReasonNoAttendance,
        });
        if (!MIAMValidReasonNoAttendance) {
          await MiamGetMediatorPage.miamGetMediatorPage({
            page: page,
            accessibilityTest: accessibilityTest,
          });
        } else {
          await MiamGeneralReasonsPage.miamGeneralReasonsPage({
            page: page,
            accessibilityTest: accessibilityTest,
            errorMessaging: errorMessaging,
            MiamGeneralExemptions: MiamGeneralExemptions,
          });
          if (!MiamGeneralExemptions) {
            await MiamGetMediatorPage.miamGetMediatorPage({
              page: page,
              accessibilityTest: accessibilityTest,
            });
            return;
          }
          await MiamDomesticAbusePage.miamDomesticAbusePage({
            page: page,
            accessibilityTest: accessibilityTest,
            errorMessaging: errorMessaging,
            MiamDomesticAbuse: MiamDomesticAbuse,
          });
          await MiamProvidingEvidenceDomesticAbusePage.miamProvidingEvidenceDomesticAbusePage(
            {
              page: page,
              accessibilityTest: accessibilityTest,
              errorMessaging: errorMessaging,
              miamDomesticAbuseProvidingEvidence:
                miamDomesticAbuseProvidingEvidence,
            },
          );
          if (miamDomesticAbuseProvidingEvidence) {
            await MiamDomesticAbuseUploadEvidencePage.miamDomesticAbuseUploadEvidencePage(
              { page: page, accessibilityTest: accessibilityTest },
            );
          }
          await MiamChildProtectionPage.miamChildProtectionPage({
            page: page,
            accessibilityTest: accessibilityTest,
            errorMessaging: errorMessaging,
            miamChildProtectionConcernsType: miamChildProtectionConcernsType,
          });
          await MiamUrgencyPage.miamUrgencyPage({
            page: page,
            accessibilityTest: accessibilityTest,
            errorMessaging: errorMessaging,
            miamUrgencyType: miamUrgencyType,
          });
          await MiamPreviousAttendancePage.miamPreviousAttendancePage({
            page: page,
            accessibilityTest: accessibilityTest,
            errorMessaging: errorMessaging,
            miamAttendanceType: miamAttendanceType,
          });
          if (
            miamAttendanceType === "Application made in existing proceedings"
          ) {
            await MiamOtherAttendanceOrNCDRPage.miamOtherAttendanceOrNCDRPage({
              page: page,
              accessibilityTest: accessibilityTest,
              errorMessaging: errorMessaging,
              miamPreviousAttendanceMediatorSignedDocument:
                miamPreviousAttendanceMediatorSignedDocument,
            });
          }
          if (
            miamAttendanceType !== "None of these" &&
            miamPreviousAttendanceMediatorSignedDocument === true
          ) {
            await MiamUploadEvidenceOfAttendingMiamOrNCDRPage.miamUploadEvidenceOfAttendingMiamOrNCDRPage(
              {
                page: page,
                accessibilityTest: accessibilityTest,
                errorMessaging: errorMessaging,
              },
            );
          }
          await MiamMiamOtherPage.miamMiamOtherPage({
            page: page,
            accessibilityTest: accessibilityTest,
            errorMessaging: errorMessaging,
            miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
          });
          if (
            miamDomesticAbuseProvidingEvidence &&
            miamChildProtectionConcernsType === "None of the above" &&
            miamUrgencyType === "None of these" &&
            miamAttendanceType === "None of these" &&
            miamOtherReasonForNotAttending == "None of the above"
          ) {
            await MiamGetMediatorPage.miamGetMediatorPage({
              page: page,
              accessibilityTest: accessibilityTest,
            });
            return;
          }
        }
      }
    }
  }
}
