import { Page } from "@playwright/test";
import { C100ScreeningSections } from "./C100ScreeningSections/c100ScreeningSections";
import { CitizenCreateInitial } from "../citizenCreateInitial";
import { C100TypeOfOrder } from "./C100TypeOfOrder/C100TypeOfOrder";
import { C100ConsentOrderUpload } from "./C100ConsentOrderUpload/C100ConsentOrderUpload";
import { C100UrgencyAndWithoutNotice } from "./C100UrgencyAndWithoutNotice/C100UrgencyAndWithoutNotice";
import { MIAM } from "./C100MIAM/MIAM";
import { MiamChildProtectionConcernsType } from "../../../pages/citizen/createCase/C100/MIAM/miamChildProtectionPage";
import { MiamUrgencyType } from "../../../pages/citizen/createCase/C100/MIAM/miamUrgencyPage";
import { MiamAttendanceType } from "../../../pages/citizen/createCase/C100/MIAM/miamPreviousAttendancePage";
import { MiamOtherReasonForNotAttending } from "../../../pages/citizen/createCase/C100/MIAM/miamMiamOtherPage";
import { MiamReasonForNoAccessToMediator } from "../../../pages/citizen/createCase/C100/MIAM/miamNoAccessToMediatorPage";

interface C100Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean; // If true -> Type Of Order Journey
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
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
  miamReasonForNoAccessToMediator: MiamReasonForNoAccessToMediator;
}

export class C100 {
  public static async c100({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
    c100LegalRepresentation,
    c100CourtPermissionNeeded,
    urgencyAndWithoutNoticeAllOptionsYes,
    MIAMChildrenInvolvedOtherProceedings,
    miamAlreadyAttended,
    documentSignedByMediator,
    MIAMValidReasonNoAttendance,
    MiamGeneralExemptions,
    MiamDomesticAbuse,
    miamDomesticAbuseProvidingEvidence,
    miamChildProtectionConcernsType,
    miamUrgencyType,
    miamAttendanceType,
    miamPreviousAttendanceMediatorSignedDocument,
    miamOtherReasonForNotAttending,
    miamReasonForNoAccessToMediator,
  }: C100Options): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: "C100",
    });
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: c100ScreeningWrittenAgreementReview,
      c100LegalRepresentation: c100LegalRepresentation,
      c100CourtPermissionNeeded: c100CourtPermissionNeeded,
    });
    if (c100ScreeningWrittenAgreementReview) {
      await C100TypeOfOrder.c100TypeOfOrder({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
      await C100ConsentOrderUpload.c100ConsentOrderUpload({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
      await C100UrgencyAndWithoutNotice.c100UrgencyAndWithoutNotice({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        urgencyAndWithoutNoticeAllOptionsYes:
          urgencyAndWithoutNoticeAllOptionsYes,
      });
    } else {
      await MIAM.MIAM({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        MIAMChildrenInvolvedOtherProceedings:
          MIAMChildrenInvolvedOtherProceedings,
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
        miamReasonForNoAccessToMediator: miamReasonForNoAccessToMediator,
      });
    }
  }
}
