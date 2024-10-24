import { Page } from "@playwright/test";
import { C100ScreeningSections } from "./C100ScreeningSections/c100ScreeningSections";
import { CitizenCreateInitial } from "../citizenCreateInitial";
import { C100TypeOfOrder } from "./C100TypeOfOrder/C100TypeOfOrder";
import { C100ConsentOrderUpload } from "./C100ConsentOrderUpload/C100ConsentOrderUpload";
import { C100UrgencyAndWithoutNotice } from "./C100UrgencyAndWithoutNotice/C100UrgencyAndWithoutNotice";
import { C100People1 } from "./C100People/C100People1";
import { ApplicantGender, yesNoDontKnow } from "../../../common/types";
import { MIAM } from "./C100MIAM/MIAM";
import { MiamChildProtectionConcernsType } from "../../../pages/citizen/createCase/C100/MIAM/miamChildProtectionPage";
import { MiamUrgencyType } from "../../../pages/citizen/createCase/C100/MIAM/miamUrgencyPage";
import { MiamAttendanceType } from "../../../pages/citizen/createCase/C100/MIAM/miamPreviousAttendancePage";
import { MiamOtherReasonForNotAttending } from "../../../pages/citizen/createCase/C100/MIAM/miamMiamOtherPage";
import { MiamReasonForNoAccessToMediator } from "../../../pages/citizen/createCase/C100/MIAM/miamNoAccessToMediatorPage";
import { C100Confidentiality } from "./C100Confidentiality/c100Confidentiality";

interface C100Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean; // If true -> Type Of Order Journey
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
  c100PeopleGender: ApplicantGender;
  c100PeopleYesNoDontKnow: yesNoDontKnow;
  // c100OthersKnowApplicantsContact: yesNoDontKnow;
  // c100PrivateDetails: boolean;
  // c100ChildrenSafetyConcerns: boolean;
  c100OthersKnowApplicantsContact: yesNoDontKnow;
  c100PrivateDetails: boolean;
  c100ChildrenSafetyConcerns: boolean;
  miamChildrenInvolvedOtherProceedings: boolean;
  miamAlreadyAttended: boolean;
  documentSignedByMediator: boolean;
  miamValidReasonNoAttendance: boolean;
  miamGeneralExemptions: boolean;
  miamDomesticAbuse: boolean;
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
    c100PeopleGender,
    c100PeopleYesNoDontKnow,
    // c100OthersKnowApplicantsContact,
    // c100PrivateDetails,
    // c100ChildrenSafetyConcerns,
    c100OthersKnowApplicantsContact,
    c100PrivateDetails,
    miamChildrenInvolvedOtherProceedings,
    miamAlreadyAttended,
    documentSignedByMediator,
    miamValidReasonNoAttendance,
    miamGeneralExemptions,
    miamDomesticAbuse,
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
      await C100People1.c100People1({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        gender: c100PeopleGender,
        c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
        subJourney: true,
      });
      // People
      // await C100Confidentiality.c100Confidentiality({
      //   page: page,
      //   accessibilityTest: accessibilityTest,
      //   errorMessaging: errorMessaging,
      //   c100OthersKnowApplicantsContact: c100OthersKnowApplicantsContact,
      //   c100PrivateDetails: c100PrivateDetails,
      // });
    } else {
      await MIAM.MIAM({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        miamChildrenInvolvedOtherProceedings:
          miamChildrenInvolvedOtherProceedings,
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
      });
    }
  }
}
