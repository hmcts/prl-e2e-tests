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
        await MiamValidReasonPage.miamValidReasonPage({page: page, accessibilityTest: accessibilityTest, errorMessaging: errorMessaging, MIAMValidReasonNoAttendance: MIAMValidReasonNoAttendance});
        if (!MIAMValidReasonNoAttendance) {
          await MiamGetMediatorPage.miamGetMediatorPage({page: page, accessibilityTest: accessibilityTest})
        } else {
          await MiamGeneralReasonsPage.miamGeneralReasonsPage({page: page, accessibilityTest: accessibilityTest, errorMessaging: errorMessaging, MiamGeneralExemptions: MiamGeneralExemptions})
          if (!MiamGeneralExemptions) {
            await MiamGetMediatorPage.miamGetMediatorPage({page: page, accessibilityTest: accessibilityTest})
            return;
          }
          await MiamDomesticAbusePage.miamDomesticAbusePage({page: page, accessibilityTest: accessibilityTest, errorMessaging: errorMessaging, MiamDomesticAbuse: MiamDomesticAbuse});
          if (!MiamDomesticAbuse) {
            await MiamGetMediatorPage.miamGetMediatorPage({page: page, accessibilityTest: accessibilityTest})
            return;
          }
        }
      }
    }
  }
}
