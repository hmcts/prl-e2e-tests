import { Page } from "@playwright/test";
import { C100ScreeningSections } from "./C100ScreeningSections/C100ScreeningSections";
import { C100TypeOfOrder } from "./C100TypeOfOrder/C100TypeOfOrder";
import { CitizenCreateInitial } from "../citizenCreateInitial";

interface C100Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean; // If true -> Type Of Order
}

export class C100 {
  public static async c100({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
  }: C100Options): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: 'C100'
    })
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: c100ScreeningWrittenAgreementReview
    });
    if (c100ScreeningWrittenAgreementReview) {
      await C100TypeOfOrder.c100TypeOfOrder({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging
      });
      // Consent Order Upload
      // Urgency & Without Notice
      // People
      // Applicant Details
      // Confidentiality C7
      // Case Parties
      // Other Proceedings
      // C1A - Safety Concerns
      // International Element
      // Reasonable Adjustments
      // Help with Fees
    } else {
      // PRL-6358 Screening 2 (Done in screening journey)
      // PRL-6359 Screening 3 (done in screening journey)
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