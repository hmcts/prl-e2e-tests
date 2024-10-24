import { test } from "@playwright/test";

import Config from "../../../../config";
import { C100 } from "../../../../journeys/citizen/createCase/C100";

test.use({ storageState: Config.sessionStoragePath + "citizen.json" });

test.describe("C100 Citizen Application tests on the MIAM set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test(`MIAM testing  with an emergency protection provision / supervision proceeding in place,
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: false,
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
  });

  test(`MIAM testing  with a previously attended MIAM,
  Without a signed document
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: true,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: false,
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
  });

  test(`MIAM testing  with a previously attended MIAM,
  With a signed document
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: true,
      documentSignedByMediator: true,
      miamValidReasonNoAttendance: false,
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
  });

  test(`MIAM testing  with no previously attended MIAM,
  With no valid reason for attending
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: false,
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
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With no general exemptions
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
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
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a child protection plan
  With a risk to life urgency
  With a Miam attended in the previous 4 months
  With a mediator signed document
  And Applying for a without notice other reason
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "Child protection plan",
      miamUrgencyType: "Risk to life",
      miamAttendanceType: "Previous 4 months",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "Applying for without notice",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a risk to life urgency
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Risk to life",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Risk to family life urgency
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Risk to family life",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Risk to safety of home urgency
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Risk to safety of home",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay causing risk of harm urgency
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay causing risk of harm",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay causing risk of removal urgency
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay causing risk of removal",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay causing risk of unfair court decision urgency
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay causing risk of unfair court decision",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay causing risk of financial hardship urgency
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay causing risk of financial hardship",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay causing risk of irretrievable problems
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay causing risk of irretrievable problems",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a Delay dispute starting in another country problems
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "Delay dispute starting in another country",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  Having attended a Miam in the last 4 months
  With a mediator signed document
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "Previous 4 months",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  Having an Application made in existing proceedings
  Without a mediator signed document
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "Application made in existing proceedings",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  Applying for an application without notice
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Applying for without notice",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  Applying for an application with an under 18 respondent
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Under 18",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  Cannot access mediator
  Unable to conduct within 15 days
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Unable to conduct within 15 days",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  Cannot access mediator
  Disability
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Disability",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  Cannot access mediator
  No mediator within 15 miles
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "No mediator within 15 miles",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  Cannot access mediator
  Prison or institution
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Prison or institution",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  Cannot access mediator
  Subject to bail
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Subject to bail",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  Cannot access mediator
  Released from prison on license
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "Released from prison on license",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  But no valid reasons
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "None of the above",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  But no valid reasons
  But accessing a mediator with no valid reason
  Not error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with an emergency protection provision / supervision proceeding in place,
  Error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: false,
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
  });

  test(`MIAM testing  with a previously attended MIAM,
  Without a signed document
  Error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: true,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: false,
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
  });

  test(`MIAM testing  with a previously attended MIAM,
  With a signed document
  Error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: true,
      documentSignedByMediator: true,
      miamValidReasonNoAttendance: false,
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
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  But no valid reasons
  But accessing a mediator with no valid reason
  Error message testing,
  Not accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });
});

test.describe("C100 Citizen Application accessibility tests on the MIAM set. @accessibilityCitizenFrontend", (): void => {
  test(`MIAM testing  with an emergency protection provision / supervision proceeding in place,
  Not error message testing,
  Accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: false,
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
  });

  test(`MIAM testing  with a previously attended MIAM,
  With a signed document
  Not error message testing,
  Accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: true,
      documentSignedByMediator: true,
      miamValidReasonNoAttendance: false,
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
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  And subject to domestic abuse
  Providing evidence of domestic abuse
  With a child protection plan
  With a risk to life urgency
  With a Miam attended in the previous 4 months
  With a mediator signed document
  And Applying for a without notice other reason
  Not error message testing,
  Accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: true,
      miamDomesticAbuseProvidingEvidence: true,
      miamChildProtectionConcernsType: "Child protection plan",
      miamUrgencyType: "Risk to life",
      miamAttendanceType: "Previous 4 months",
      miamPreviousAttendanceMediatorSignedDocument: true,
      miamOtherReasonForNotAttending: "Applying for without notice",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });

  test(`MIAM testing  with no previously attended MIAM,
  With a valid reason for attending
  With all general exemptions
  But no valid reasons
  But accessing a mediator with no valid reason
  Not error message testing,
  Accessibility Testing`, async ({ page }): Promise<void> => {
    await C100.c100({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100ScreeningWrittenAgreementReview: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: true,
      c100OthersKnowApplicantsContact: "yes",
      c100PrivateDetails: false,
      c100ChildrenSafetyConcerns: false,
      miamChildrenInvolvedOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: true,
      miamAlreadyAttended: false,
      documentSignedByMediator: false,
      miamValidReasonNoAttendance: true,
      miamGeneralExemptions: true,
      miamDomesticAbuse: false,
      miamDomesticAbuseProvidingEvidence: false,
      miamChildProtectionConcernsType: "None of the above",
      miamUrgencyType: "None of these",
      miamAttendanceType: "None of these",
      miamPreviousAttendanceMediatorSignedDocument: false,
      miamOtherReasonForNotAttending: "Cannot access mediator",
      miamReasonForNoAccessToMediator: "None of these",
    });
  });
});
