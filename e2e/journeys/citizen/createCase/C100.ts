import { Page } from "@playwright/test";
import { C100ScreeningSections } from "./C100ScreeningSections/c100ScreeningSections";
import { CitizenCreateInitial } from "../citizenCreateInitial";
import { C100TypeOfOrder } from "./C100TypeOfOrder/C100TypeOfOrder";
import { C100ConsentOrderUpload } from "./C100ConsentOrderUpload/C100ConsentOrderUpload";
import { C100UrgencyAndWithoutNotice } from "./C100UrgencyAndWithoutNotice/C100UrgencyAndWithoutNotice";
import { C100Confidentiality } from "./C100Confidentiality/c100Confidentiality";
import { yesNoDontKnow } from "../../../common/types";

interface C100Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean; // If true -> Type Of Order Journey
  c100LegalRepresentation: boolean;
  c100CourtPermissionNeeded: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
  c100OthersKnowApplicantsContact: yesNoDontKnow;
  c100PrivateDetails: boolean;
  c100ChildrenSafetyConcerns: boolean;
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
    c100OthersKnowApplicantsContact,
    c100PrivateDetails
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
      // People
      await C100Confidentiality.c100Confidentiality({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100OthersKnowApplicantsContact: c100OthersKnowApplicantsContact,
        c100PrivateDetails: c100PrivateDetails
      })
    } else {
      // MIAM Journey
    }
  }
}
