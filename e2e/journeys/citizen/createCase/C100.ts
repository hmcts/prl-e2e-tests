import { Page } from "@playwright/test";
import { C100ScreeningSections } from "../../c100ScreeningSections";

interface C100Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ScreeningWrittenAgreementReview: boolean; // If true -> Type Of Order Journey
  c100LegalRepresentation: boolean;
}

export class C100 {
  public static async c100({
    page,
    accessibilityTest,
    errorMessaging,
    c100ScreeningWrittenAgreementReview,
    c100LegalRepresentation,
  }: C100Options): Promise<void> {
    // Start Pages
    await C100ScreeningSections.c100ScreeningSections({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ScreeningWrittenAgreementReview: c100ScreeningWrittenAgreementReview,
      c100LegalRepresentation: c100LegalRepresentation
    })
    if (c100ScreeningWrittenAgreementReview) {
      // Type Of Order Journey
    } else {

      // Remaining Journey PRL-6359
      // MIAM Journey
    }
  }
}
