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
import { C100ApplicationCompletedForYou } from "./C100ApplicationCompletedForYou";
import { StartPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/startPage";
import { ChildAddressPage } from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/childAddressPage";
import {
  ConsentAgreementPage
} from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/consentAgreementPage";
import {
  AlternativeResolutionPage
} from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/alternativeResolutionPage";
import {
  AlternativeRoutesPage
} from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/alternativeRoutesPage";
import {
  LegalRepresentationPage
} from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/legalRepresentationPage";
import {
  LegalRepresentationApplicationPage
} from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/legalRepresentationApplicationPage";
import {
  ContactRepresentativePage
} from "../../../../pages/citizen/createCase/C100/c100ScreeningSections/contactRepresentativePage";
import { CaseDashboardPage } from "../../../../pages/citizen/createCase/initialJourney/caseDashboardPage";

interface C100ThirdMiroJourneyMIAMOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
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

interface C100FourthRowMiroJourneyOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
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
  yesNoOtherProceedings: boolean;
  yesNoChildArrangementOrderDetails: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
}

interface C100ApplicationCompletedForYouOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface YouNeedDocumentSignedByMediatorOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface GetMediatorJourneyOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
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
  public static async c100ApplicationCompletedForYou({
   page,
   accessibilityTest,
   errorMessaging,
  }: C100ApplicationCompletedForYouOptions): Promise<void> {
    await C100ApplicationCompletedForYou.c100ApplicationCompletedForYou({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging
    })
  }

  public static async getMediatorJourney({
   page,
   accessibilityTest,
   errorMessaging,
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
  }: GetMediatorJourneyOptions): Promise<void> {
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
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: true,
    });
    await MIAM.MIAM({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      miamChildrenInvolvedOtherProceedings: false,
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

  public static async youNeedASignedDocument({
    page,
    accessibilityTest,
    errorMessaging
  }: YouNeedDocumentSignedByMediatorOptions): Promise<void> {
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
      c100LegalRepresentation: true,
      c100CourtPermissionNeeded: true,
    });
    await MIAM.MIAM({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      miamChildrenInvolvedOtherProceedings: false,
      miamAlreadyAttended: true, // Has to be true
      documentSignedByMediator: false, // Has to be false
      miamValidReasonNoAttendance: false, // All the below are redundant
      miamGeneralExemptions: false,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  }

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
    c100CourtPermissionNeeded,
    yesNoChildArrangementOrderDetails,
    yesNoOtherProceedings,
    urgencyAndWithoutNoticeAllOptionsYes
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
      miamChildProtectionConcernsType: 'None of the above',
      miamUrgencyType: 'None of these',
      miamAttendanceType: 'None of these',
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: 'None of the above',
      miamReasonForNoAccessToMediator: 'None of these',
    });
    await C100OtherProceedings.c100OtherProceedings1({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoOtherProceedings: yesNoOtherProceedings,
      yesNoChildArrangementOrderDetails: yesNoChildArrangementOrderDetails
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
      urgencyAndWithoutNoticeAllOptionsYes: urgencyAndWithoutNoticeAllOptionsYes
    })
  }
  
  public static async c100ThirdMiroJourney({
    page,
    accessibilityTest,
    errorMessaging,
    c100LegalRepresentation,
    c100CourtPermissionNeeded,
    urgencyAndWithoutNoticeAllOptionsYes,
    miamAlreadyAttended,
                                             miamValidReasonNoAttendance,
    documentSignedByMediator,
    miamGeneralExemptions,
    miamDomesticAbuse,
    miamDomesticAbuseProvidingEvidence,
    miamChildProtectionConcernsType,
    miamUrgencyType,
    miamAttendanceType,
    miamPreviousAttendanceMediatorSignedDocument,
    miamOtherReasonForNotAttending,
    miamReasonForNoAccessToMediator,
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
      miamChildrenInvolvedOtherProceedings: false, // Has to be false
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

  public static async c100FourthRowMiroJourney({
   page,
   accessibilityTest,
   errorMessaging,
   c100LegalRepresentation,
   c100CourtPermissionNeeded,
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
                                                 urgencyAndWithoutNoticeAllOptionsYes,
                                               }: C100FourthRowMiroJourneyOptions): Promise<void> {
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
      miamChildrenInvolvedOtherProceedings: false, // Has to be false
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
    await C100UrgencyAndWithoutNotice.c100UrgencyAndWithoutNotice({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      urgencyAndWithoutNoticeAllOptionsYes: urgencyAndWithoutNoticeAllOptionsYes
    });
    await C100TypeOfOrder.c100TypeOfOrder({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
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
    console.log(page.url())
  }
}
