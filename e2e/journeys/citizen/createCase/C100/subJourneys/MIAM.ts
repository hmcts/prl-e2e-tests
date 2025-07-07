import { Page } from "@playwright/test";
import { MiamOtherProceedingsPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamOtherProceedingsPage.ts";
import { MiamNoNeedPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamNoNeedPage.ts";
import { MiamInfoPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamInfoPage.ts";
import { MiamAttendancePage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamAttendancePage.ts";
import { MiamMediatorDocumentPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamMediatorDocumentPage.ts";
import { MiamGetDocPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamGetDocPage.ts";
import { CaseDashboardPage } from "../../../../../pages/citizen/createCase/initialJourney/caseDashboardPage.ts";
import { MiamUploadPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamUploadPage.ts";
import { MiamUploadConfirmationPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamUploadConfirmationPage.ts";
import { MiamValidReasonPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamValidReasonPage.ts";
import { MiamGetMediatorPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamGetMediatorPage.ts";
import { MiamGeneralReasonsPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamGeneralReasonsPage.ts";
import { MiamDomesticAbusePage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamDomesticAbusePage.ts";
import { MiamProvidingEvidenceDomesticAbusePage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamProvidingEvidenceDomesticAbusePage.ts";
import { MiamDomesticAbuseUploadEvidencePage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamDomesticAbuseUploadEvidencePage.ts";
import {
  MiamChildProtectionConcernsType,
  MiamChildProtectionPage,
} from "../../../../../pages/citizen/createCase/C100/MIAM/miamChildProtectionPage.ts";
import {
  MiamUrgencyPage,
  MiamUrgencyType,
} from "../../../../../pages/citizen/createCase/C100/MIAM/miamUrgencyPage.ts";
import {
  MiamAttendanceType,
  MiamPreviousAttendancePage,
} from "../../../../../pages/citizen/createCase/C100/MIAM/miamPreviousAttendancePage.ts";
import { MiamOtherAttendanceOrNCDRPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamOtherAttendanceOrNCDRPage.ts";
import { MiamUploadEvidenceOfAttendingMiamOrNCDRPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamUploadEvidenceOfAttendingMiamOrNCDRPage.ts";
import {
  MiamMiamOtherPage,
  MiamOtherReasonForNotAttending,
} from "../../../../../pages/citizen/createCase/C100/MIAM/miamMiamOtherPage.ts";
import {
  MiamNoAccessToMediatorPage,
  MiamReasonForNoAccessToMediator,
} from "../../../../../pages/citizen/createCase/C100/MIAM/miamNoAccessToMediatorPage.ts";
import { MiamMiamExemptionsSummaryPage } from "../../../../../pages/citizen/createCase/C100/MIAM/miamMiamExemptionsSummaryPage.ts";

interface MIAMOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  miamChildrenInvolvedOtherProceedings: boolean; // if true then diverts to the second row on the miro.
  miamAlreadyAttended: boolean; // Possible diversion to the type of work page.
  documentSignedByMediator: boolean; // Above conditional on this being true, if false, go to get signed doc page.
  miamValidReasonNoAttendance: boolean; // If false, go to the get mediator page.
  miamGeneralExemptions: boolean; // Sets the different MIAM exemptions.
  miamDomesticAbuse: boolean; // Decides whether there are all domestic abuse reasons listed.
  miamDomesticAbuseProvidingEvidence: boolean;
  miamChildProtectionConcernsType: MiamChildProtectionConcernsType; // Decides which child protection concern is listed.
  miamUrgencyType: MiamUrgencyType; // Decides which reason there is for urgency.
  miamAttendanceType: MiamAttendanceType; // Decides which reason there is for previous MIAM attendance.
  miamPreviousAttendanceMediatorSignedDocument: boolean; // Doesn't affect journey
  miamOtherReasonForNotAttending: MiamOtherReasonForNotAttending; // Decides which Other reason there is for not attending
  miamReasonForNoAccessToMediator: MiamReasonForNoAccessToMediator; // If other reason === "No access to mediator", this decides which reason for no access is used.
}

export class MIAM {
  public static async MIAM({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    miamChildrenInvolvedOtherProceedings: miamChildrenInvolvedOtherProceedings,
    miamAlreadyAttended: miamAlreadyAttended,
    documentSignedByMediator: documentSignedByMediator,
    miamValidReasonNoAttendance: miamValidReasonNoAttendance,
    miamGeneralExemptions: miamGeneralExemptions,
    miamDomesticAbuse: miamDomesticAbuse,
    miamDomesticAbuseProvidingEvidence: miamDomesticAbuseProvidingEvidence,
    miamChildProtectionConcernsType: miamChildProtectionConcernsType,
    miamUrgencyType: miamUrgencyType,
    miamAttendanceType: miamAttendanceType,
    miamPreviousAttendanceMediatorSignedDocument:
      miamPreviousAttendanceMediatorSignedDocument,
    miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
    miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
  }: MIAMOptions): Promise<void> {
    await MiamOtherProceedingsPage.otherProceedingsPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      miamChildrenInvolvedOtherProceedings:
        miamChildrenInvolvedOtherProceedings,
    });
    if (miamChildrenInvolvedOtherProceedings) {
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
          miamValidReasonNoAttendance: miamValidReasonNoAttendance,
        });
        if (!miamValidReasonNoAttendance) {
          await MiamGetMediatorPage.miamGetMediatorPage({
            page: page,
            accessibilityTest: accessibilityTest,
          });
        } else {
          await MiamGeneralReasonsPage.miamGeneralReasonsPage({
            page: page,
            accessibilityTest: accessibilityTest,
            errorMessaging: errorMessaging,
            miamGeneralExemptions: miamGeneralExemptions,
          });
          if (!miamGeneralExemptions) {
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
            miamDomesticAbuse: miamDomesticAbuse,
          });
          if (miamDomesticAbuse) {
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
            !miamDomesticAbuseProvidingEvidence &&
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
          if (miamOtherReasonForNotAttending === "Cannot access mediator") {
            await MiamNoAccessToMediatorPage.miamNoAccessToMediatorPage({
              page: page,
              accessibilityTest: accessibilityTest,
              errorMessaging: errorMessaging,
              reasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
            });
          }
          if (
            !miamDomesticAbuseProvidingEvidence &&
            miamChildProtectionConcernsType === "None of the above" &&
            miamUrgencyType === "None of these" &&
            miamAttendanceType === "None of these" &&
            miamOtherReasonForNotAttending == "Cannot access mediator" &&
            miamReasonForNoAccessToMediator == "None of these"
          ) {
            await MiamGetMediatorPage.miamGetMediatorPage({
              page: page,
              accessibilityTest: accessibilityTest,
            });
            return;
          }
          await MiamMiamExemptionsSummaryPage.miamMiamExemptionsSummaryPage({
            page: page,
            accessibilityTest: accessibilityTest,
            miamDomesticAbuse: miamDomesticAbuse,
            miamChildProtectionConcernsType: miamChildProtectionConcernsType,
            miamUrgencyType: miamUrgencyType,
            miamAttendanceType: miamAttendanceType,
            miamOtherReasonForNotAttending: miamOtherReasonForNotAttending,
            miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
          });
        }
      }
    }
  }
}
