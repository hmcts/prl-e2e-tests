import { Page } from "@playwright/test";
import { C100ScreeningSections } from "./subJourneys/c100ScreeningSections";
import { CitizenCreateInitial } from "../../citizenCreateInitial";
import { C100TypeOfOrder } from "./subJourneys/C100TypeOfOrder";
import { C100ConsentOrderUpload } from "./subJourneys/C100ConsentOrderUpload";
import { C100UrgencyAndWithoutNotice } from "./subJourneys/C100UrgencyAndWithoutNotice";
import { MIAM } from "./subJourneys/MIAM";
import { MiamChildProtectionConcernsType } from "../../../../pages/citizen/createCase/C100/MIAM/miamChildProtectionPage";
import { MiamUrgencyType } from "../../../../pages/citizen/createCase/C100/MIAM/miamUrgencyPage";
import { MiamAttendanceType } from "../../../../pages/citizen/createCase/C100/MIAM/miamPreviousAttendancePage";
import { MiamOtherReasonForNotAttending } from "../../../../pages/citizen/createCase/C100/MIAM/miamMiamOtherPage";
import { MiamReasonForNoAccessToMediator } from "../../../../pages/citizen/createCase/C100/MIAM/miamNoAccessToMediatorPage";
import { C100Confidentiality } from "./subJourneys/c100Confidentiality";
import { yesNoDontKnow } from "../../../../common/types";
import { C100OtherProceedings } from "./subJourneys/C100OtherProceedings";

interface C100ThirdMiroJourneyMIAMOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
}

interface C100Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean; // If true -> Type Of Order Journey
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
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

interface C100TopMiroJourneyOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
  // c100OthersKnowApplicantsContact: yesNoDontKnow;
  // c100PrivateDetails: boolean;
  // c100ChildrenSafetyConcerns: boolean;
}

interface C100SecondMiroJourneyOptions {
  page: Page,
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
}

export class C100 {
  public static async c100TopMiroJourney({
    page,
    accessibilityTest,
    errorMessaging,
    urgencyAndWithoutNoticeAllOptionsYes,
  }: C100TopMiroJourneyOptions): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: "C100",
    });
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: true, // This has to be true for the top row journey
      c100LegalRepresentation: false, // Below here are redundant because pages aren't reached
      c100CourtPermissionNeeded: false,
    });
    await C100TypeOfOrder.c100TypeOfOrder({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging
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
    // People
    // Applicant Details
    // Confidentiality
  }

  public static async c100SecondMiroJourney({
    page,
    accessibilityTest,
    errorMessaging,
    c100LegalRepresentation,
    c100CourtPermissionNeeded
  }: C100SecondMiroJourneyOptions): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: "C100",
    });
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: false, // Has to be false for this journey
      c100LegalRepresentation: c100LegalRepresentation,
      c100CourtPermissionNeeded: c100CourtPermissionNeeded,
    });
    await MIAM.MIAM({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      miamChildrenInvolvedOtherProceedings: true, // This has to be false for this journey
      miamAlreadyAttended: false, // Any of the below args are redundant
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: false,
      miamGeneralExemptions: false,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: 'Child protection plan',
      miamUrgencyType: 'None of these',
      miamAttendanceType: 'None of these',
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: 'None of the above',
      miamReasonForNoAccessToMediator: 'None of these',
    });
    // Other Proceedings
  }
  
  public static async c100ThirdMiroJourney({
    page,
    accessibilityTest,
    errorMessaging,
    c100LegalRepresentation,
    c100CourtPermissionNeeded,
    urgencyAndWithoutNoticeAllOptionsYes
  }: C100ThirdMiroJourneyMIAMOptions): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: "C100",
    });
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: false, // Has to be false for the MIAM journey
      c100LegalRepresentation: c100LegalRepresentation,
      c100CourtPermissionNeeded: c100CourtPermissionNeeded,
    });
    await MIAM.MIAM({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      miamChildrenInvolvedOtherProceedings: false,
      miamAlreadyAttended: true, // Has to be true to reach type of order
      documentSignedByMediator: true, // Has to be true to reach type of order
      miamValidReasonNoAttendance: false, // All the below are redundant
      miamGeneralExemptions: false,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: 'Child protection plan',
      miamUrgencyType: 'None of these',
      miamAttendanceType: 'None of these',
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: 'None of the above',
      miamReasonForNoAccessToMediator: 'None of these',
    });
    await C100TypeOfOrder.c100TypeOfOrder({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging
    });
    await C100UrgencyAndWithoutNotice.c100UrgencyAndWithoutNotice({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      urgencyAndWithoutNoticeAllOptionsYes:
        urgencyAndWithoutNoticeAllOptionsYes,
    });
    // People
  }

  public static async c100({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
    c100LegalRepresentation,
    c100CourtPermissionNeeded,
    urgencyAndWithoutNoticeAllOptionsYes,
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
        errorMessaging: errorMessaging
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
      // People
      // Applicant Details
      // await C100Confidentiality.c100Confidentiality({
      //   page: page,
      //   accessibilityTest: accessibilityTest,
      //   errorMessaging: errorMessaging,
      //   c100OthersKnowApplicantsContact: c100OthersKnowApplicantsContact,
      //   c100PrivateDetails: c100PrivateDetails,
      // });
      // Case Parties
      // Other Proceedings
      // C1A - Safety Concerns
      // International Element
      // Reasonable Adjustments
      // Help with Fees
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
      // MIAM journey
      // if children involved in emergency protection
        // Other Proceedings
        // Type Of Order
        // Urgency & Without Notice
        // People
        // Confidentiality C7
        // Case Parties
        // C1A - Safety Concerns
        // International Element
        // Reasonable Adjustments
        // Help with Fees
      // else
        // ?
    }
  }
}
